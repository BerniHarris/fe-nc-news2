import { useParams } from "react-router";
import { useArticle } from "../../hooks/articleHooks/articleHooks.jsx";
import { ArticleCard } from "../../components/ArticleCard/ArticleCard.jsx";
import "./ArticlePage.css";
import { CommentCard } from "../../components/CommentCard/CommentCard.jsx";
import { useCommentList } from "../../hooks/commentHooks/commentHooks.jsx";

export const ArticlePage = () => {
  const { article_id: articleId } = useParams();
  const {
    article,
    loading: articleLoading,
    error: articleErrors,
  } = useArticle(articleId);
  const {
    comments,
    loading: commentsLoading,
    error: commentsErrors,
  } = useCommentList(articleId);

  if (articleLoading || commentsLoading) return <p>Loading...</p>;
  if (articleErrors)
    return <p>Error: {articleErrors.message || articleErrors}</p>;
  if (commentsErrors)
    return <p>Error: {commentsErrors.message || commentsErrors}</p>;

  return (
    <div className="article-page" data-testid="article-page">
      <ArticleCard article={article} />
      <div>
        <section className="comment-list">
          {comments && comments.length > 0 ? (
            comments.map((comment) => (
              <CommentCard key={comment.comment_id} comment={comment} />
            ))
          ) : (
            <p data-testid="no-comments">No comments found.</p>
          )}
        </section>
      </div>
    </div>
  );
};
