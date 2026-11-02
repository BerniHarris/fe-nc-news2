import { formattedDate } from "../../utils/utils";
import "./CommentCard.css";
import { Votes } from "../Votes/Votes";
import { DeleteComment } from "../DeleteComment/DeleteComment";

export const CommentCard = ({ comment, handleDelete }) => {
  if (!comment) {
    return null;
  }

  const { body, author, votes, created_at, comment_id: commentId } = comment;

  return (
    <section className="comment-card" data-testid={`comment-card-${commentId}`}>
      <header
        className="comment-body-wrapper"
        data-testid="comment-body-wrapper"
      >
        <div className="whoandwhenComment">
          <address className="author" data-testid="author">
            By {author}
          </address>
          <time className="date">{formattedDate(created_at)}</time>
        </div>
        <p>{body}</p>
      </header>
      <footer className="comment-card-footer">
        <Votes votes={votes} />
        <DeleteComment commentId={commentId} handleDelete={handleDelete} />
      </footer>
    </section>
  );
};
