import { useParams } from "react-router";
import { useState } from "react";

import { useArticle } from "../../hooks/articleHooks/articleHooks.jsx";
import { ArticleCard } from "../../components/ArticleCard/ArticleCard.jsx";
import "./ArticlePage.css";
import { CommentCard } from "../../components/CommentCard/CommentCard.jsx";
import {
  useCommentList,
  useCreateComment,
  useDeleteComment,
} from "../../hooks/useComments/useComments.jsx";

export const ArticlePage = () => {
  const { article_id: articleId } = useParams();
  const {
    article,
    loading: articleLoading,
    error: articleErrors,
  } = useArticle(articleId);
  const {
    comments,
    setComments,
    loading: commentsLoading,
    error: commentsErrors,
  } = useCommentList(articleId);

  const { submitComment, commentLoading, commentError } =
    useCreateComment(articleId);
  const { removeComment } = useDeleteComment();

  const [formData, setFormData] = useState({ username: "", body: "" });

  if (articleLoading || commentsLoading || commentLoading)
    return <p>Loading...</p>;

  if (articleErrors)
    return <p>Error: {articleErrors.message || articleErrors}</p>;

  if (commentsErrors)
    return <p>Error: {commentsErrors.message || commentsErrors}</p>;

  if (commentError) return <p>Error: {commentError.message || commentError}</p>;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newComment = await submitComment(formData);
    setComments((prevComments) => [newComment, ...prevComments]);
    setFormData({ username: "", body: "" });
  };

  const handleDelete = async (e, comment) => {
    e.preventDefault();
    await removeComment(comment.comment_id);
    setComments(
      comments.filter(
        (prevComment) => prevComment.comment_id !== comment.comment_id,
      ),
    );
  };
  return (
    <div className="article-page" data-testid="article-page">
      <ArticleCard article={article} commentNumber={comments.length} />
      <div>
        <form
          onSubmit={handleSubmit}
          className="comment-form"
          id="new-comment-form"
          aria-label="Add a comment"
        >
          <label className="comment-label" htmlFor="username">
            Username:
          </label>
          <input
            type="text"
            id="username"
            value={formData.username}
            onChange={(e) => {
              setFormData({ ...formData, username: e.target.value });
            }}
            placeholder="ExampleName122"
            autoComplete="off"
            required
          />
          <label className="comment-label" htmlFor="body">
            Comment:
          </label>
          <textarea
            className="comment-input"
            type="text"
            id="body"
            value={formData.body}
            onChange={(e) => {
              setFormData({ ...formData, body: e.target.value });
            }}
            placeholder="Please type your comment here"
            autoComplete="off"
            required
          />
          <button
            type="submit"
            className="submit-button"
            data-testid="submit-button"
          >
            Submit Comment
          </button>
        </form>
        <section className="comment-list">
          <h3 className="comments-header">Comments:</h3>
          {comments && comments.length > 0 ? (
            comments.map((comment) => (
              <CommentCard
                key={comment.comment_id}
                comment={comment}
                handleDelete={(e) => handleDelete(e, comment)}
              />
            ))
          ) : (
            <p data-testid="no-comments">No comments found.</p>
          )}
        </section>
      </div>
    </div>
  );
};
