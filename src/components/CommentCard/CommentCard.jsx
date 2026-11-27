import { isoStringToDDMMYYYY } from "../../utils/utils";
import "./CommentCard.css";
import { Votes } from "../Votes/Votes";
import { DeleteComment } from "../DeleteComment/DeleteComment";
import { FEATURE_FLAGS } from "../../config/featureFlags";

export const CommentCard = ({ comment, handleDelete, userAvatar }) => {
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
          <div className="who">
            {userAvatar && (
              <img
                src={userAvatar}
                alt={`${author} avatar`}
                className="author-avatar"
              />
            )}
            <address className="author" data-testid="author">
              By {author}
            </address>
          </div>
          <time className="date">{isoStringToDDMMYYYY(created_at)}</time>
        </div>
        <p>{body}</p>
      </header>
      <footer className="comment-card-footer">
        {FEATURE_FLAGS.ENABLE_COMMENT_VOTES && <Votes votes={votes} />}
        <DeleteComment commentId={commentId} handleDelete={handleDelete} />
      </footer>
    </section>
  );
};
