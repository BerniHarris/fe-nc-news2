import { formattedDate } from "../../utils/utils";
import "./CommentCard.css";
import { FaRegHeart, FaRegCommentAlt } from "react-icons/fa";
import { Votes } from "../Votes/Votes";

export const CommentCard = ({ comment }) => {
  if (!comment) {
    return null;
  }

  const { body, author, votes, created_at, article_id, comment_id } = comment;

  return (
    <section
      className="comment-card"
      data-testid={`comment-card-${comment_id}`}
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
        <Votes votes={votes} />
      </footer>
    </section>
  );
};
