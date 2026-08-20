import PremiumCTA from "@/components/PremiumCTA";

interface ArticleMidProductCTAProps {
  articleSlug?: string;
  headline?: string;
  text?: string;
}

const ArticleMidProductCTA = ({
  articleSlug,
  headline,
  text,
}: ArticleMidProductCTAProps) => (
  <aside aria-label="Recommended FlexiKnee product" data-article-mid-cta>
    <PremiumCTA
      articleSlug={articleSlug}
      headline={headline}
      text={text}
      placement="mid_article"
    />
  </aside>
);

export default ArticleMidProductCTA;
