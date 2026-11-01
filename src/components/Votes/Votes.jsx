import { FaRegHeart } from "react-icons/fa";

export const Votes = ({ votes }) => {
  return (
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
      <p className="vote-count">{votes}</p>
    </button>
  );
};
