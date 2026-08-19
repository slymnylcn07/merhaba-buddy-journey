import PremiumCTA from "@/components/PremiumCTA";

interface ArticleMidProductCTAProps {
  articleSlug?: string;
  articleTitle?: string;
}

const ArticleMidProductCTA = ({
  articleSlug,
  articleTitle,
}: ArticleMidProductCTAProps) => (
  <aside aria-label="Recommended FlexiKnee product" data-article-mid-cta>
    <PremiumCTA
      articleSlug={articleSlug}
      articleTitle={articleTitle}
      placement="mid_article"
    />
  </aside>
);

export default ArticleMidProductCTA;
