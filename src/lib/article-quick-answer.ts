import { Children, cloneElement, isValidElement, type ReactNode } from "react";

type ContentProps = { title?: ReactNode; children?: ReactNode };
const isLabel = (value: unknown) => typeof value === "string" && value.trim().toLowerCase() === "quick answer";

function labelText(node: ReactNode): string {
  if (typeof node === "string") return node;
  if (Array.isArray(node)) return node.map(labelText).join("");
  if (isValidElement<ContentProps>(node)) return labelText(node.props.children);
  return "";
}

/** Move dedicated legacy answer boxes, never their surrounding article sections. */
export function resolveArticleQuickAnswer(content: ReactNode, explicitAnswer: string | undefined, intro: string) {
  const answers: ReactNode[] = [];

  function visit(node: ReactNode): ReactNode {
    if (Array.isArray(node)) return Children.map(node, visit);
    if (!isValidElement<ContentProps>(node)) return node;

    const children = Children.toArray(node.props.children);
    if (isLabel(node.props.title) && children.length) {
      answers.push(node.props.children);
      return null;
    }

    // Legacy HTML callouts have a direct label followed by paragraphs/lists.
    // A section that also contains article headings must not be removed wholesale.
    if (typeof node.type === "string" && ["div", "aside", "section"].includes(node.type)) {
      const labelIndex = children.findIndex(child =>
        isValidElement(child) && typeof child.type === "string" &&
        ["p", "h2", "h3", "h4", "strong"].includes(child.type) && isLabel(labelText(child)),
      );
      const rest = children.filter((_, index) => index !== labelIndex);
      const hasOtherHeading = rest.some(child =>
        isValidElement(child) && typeof child.type === "string" && /^h[1-6]$/.test(child.type),
      );
      if (labelIndex >= 0 && rest.length && !hasOtherHeading) {
        answers.push(rest);
        return null;
      }
    }

    if (!children.length) return node;
    return cloneElement(node, undefined, Children.map(node.props.children, visit));
  }

  const body = visit(content);
  const explicit = explicitAnswer?.trim() ? explicitAnswer : undefined;
  return {
    content: body,
    answer: explicit ?? (answers.length ? answers : intro),
    showIntro: Boolean(explicit || answers.length),
  };
}
