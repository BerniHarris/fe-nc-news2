import { FaRegCommentAlt } from "react-icons/fa";

export const Comments = ({ commentCount }) => {
  return (
    <button
      type="button"
      className="comments"
      data-testid="comments"
      aria-label={`Current number of comments: ${commentCount}`}
    >
      <FaRegCommentAlt
        size={"1.4em"}
        className="react-icon"
        data-testid="commentBubble"
      />
      <p className="comment-count">{commentCount}</p>
    </button>
  );
};
