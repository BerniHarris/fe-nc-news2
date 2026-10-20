import { useArticleList } from "../hooks/articleHooks";

export const ArticleListPage = () => {
  const { articles, loading, error } = useArticleList();

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h1>Articles</h1>
      <div>
        {articles.map((article) => {
          return (
            <ul>
              <li key={`title-${article.article_id}`}>{article.title}</li>
              <li key={`author-${article.article_id}`}>{article.author}</li>
              <li key={`topic-${article.article_id}`}>{article.topic}</li>
              <li key={`votes-${article.article_id}`}>{article.votes}</li>
              <li key={`comments-${article.article_id}`}>
                {article.comment_count}
              </li>
            </ul>
          );
        })}
      </div>
    </div>
  );
};
