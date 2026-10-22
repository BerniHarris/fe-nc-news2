import { useArticleList } from "../../hooks/articleHooks";
import { ArticleSummaryCard } from "../../components/ArticleSummaryCard/ArticleSummaryCard";
import "./ArticleListPage.css";

export const ArticleListPage = () => {
  const { articles, loading, error } = useArticleList();

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message || error}</p>;

  return (
    <div className="article-list-page" data-testid="article-list-page">
      <h1>Articles</h1>
      <section className="article-list">
        {articles && articles.length > 0 ? (
          articles.map((article) => (
            <ArticleSummaryCard key={article.article_id} article={article} />
          ))
        ) : (
          <p data-testid="no-articles">No articles found.</p>
        )}
      </section>
    </div>
  );
};
