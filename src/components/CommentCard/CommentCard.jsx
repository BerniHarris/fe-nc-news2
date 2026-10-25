import { formattedDate } from "../../utils/utils";
import "./CommentCard.css";
import { FaRegHeart, FaRegCommentAlt } from "react-icons/fa";

export const CommentCard = ({ comment }) => {
  if (!comment) {
    return null;
  }

  const { body, author, votes, created_at, article_id } = comment;

  return (
    <section
      className="comment-card"
      data-testid={`comment-card-${article_id}`}
    >
      <header className="comment-body-wrapper">
        <div className="whoandwhenComment">
          <address className="author" data-testid="author">
            By {author}
          </address>
          <time className="date">{formattedDate(created_at)}</time>
        </div>
        <p>{body}</p>
      </header>
      <footer className="article-card-footer">
        <button
          type="button"
          className="votes"
          data-testid="votes"
          aria-label={`Current votes: ${votes}`}
        >
          <FaRegHeart
            size={"1.5em"}
            className="react-icon"
            data-testid="votesHeart"
          />
          <p>{votes}</p>
        </button>
      </footer>
    </section>
  );
};
