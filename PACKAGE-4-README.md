# FlexiKnee Package 4

This is a patch-only package. Apply it after Package 2/3 by copying the included paths over the project root.

## Included

- Correct replacement illustrations for calf raises, standing hamstring curls, seated knee extensions, gentle knee flexion, and lower-impact movement examples.
- Neutral replacements for diagrams that previously used gibberish anatomy labels or presented one biological explanation as certain.
- Full-screen article image enlargement for desktop and mobile, including keyboard controls and zoom buttons.
- Removal of the retired `knee-stiffness-after-resting` article implementation while preserving its existing redirect.
- Removal list for obsolete images that have no remaining runtime reference.

## Article-end order

This patch preserves the approved order:

1. Article content
2. Sources
3. Product CTA
4. Quiz
5. Related guides

## Apply

1. Copy every folder/file in this ZIP over the project root, preserving paths.
2. Delete every path listed in `DELETE_FILES-PACKAGE-4.txt`.
3. Commit and deploy.
4. On an article page, tap/click an inline image and confirm the full-screen viewer opens.
5. Verify the old `/guides/knee-stiffness-after-resting` URL still returns a permanent redirect to `/guides/why-do-my-knees-feel-tight-after-resting`.

Do not add the deleted files back to the asset bundle.
