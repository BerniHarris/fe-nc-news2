import { RiDeleteBin5Line } from "react-icons/ri";

export const DeleteComment = ({ commentId, handleDelete }) => {
  if (!commentId || !handleDelete) {
    return null;
  }
  return (
    <button
      type="button"
      className="comments delete-comment"
      data-testid="delete-comment-button"
      aria-label={`Delete comment_id: ${commentId}`}
      onClick={handleDelete}
    >
      <RiDeleteBin5Line
        size={"1.4em"}
        className="react-icon"
        data-testid="delete-icon"
      />
    </button>
  );
};
