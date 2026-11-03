import { TbHeart, TbHeartBroken } from "react-icons/tb";

import "./votes.css";

export const Votes = ({ votes, handleUpvote, handleDownvote }) => {
  return (
    <div className="votes-container" data-testid="votes-container">
      <button
        type="button"
        className="votes"
        data-testid="upvote"
        aria-label={`Current votes: ${votes}`}
        onClick={handleUpvote}
      >
        <TbHeart
          size={"1.7em"}
          className="react-icon"
          data-testid="votesHeart"
        />
      </button>
      <p className="vote-count" data-testid="vote-count">
        {votes}
      </p>
      {handleDownvote && (
        <button
          type="button"
          className="votes"
          data-testid="downvote"
          aria-label={`Current votes: ${votes}`}
          onClick={handleDownvote}
        >
          <TbHeartBroken
            size={"1.7em"}
            className="react-icon"
            data-testid="votesHeart"
          />
        </button>
      )}
    </div>
  );
};
