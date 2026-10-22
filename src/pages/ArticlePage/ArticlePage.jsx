import { useParams } from "react-router";
import { useArticle } from "../../hooks/articleHooks.jsx";
import { ArticleCard } from "../../components/ArticleCard/ArticleCard.jsx";
import "./ArticlePage.css";
export const ArticlePage = () => {
  const { article_id: articleId } = useParams();
  const { article, loading, error } = useArticle(articleId);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message || error}</p>;

  return (
    <div className="article-page" data-testid="article-page">
      <ArticleCard article={article} />
    </div>
  );
};
