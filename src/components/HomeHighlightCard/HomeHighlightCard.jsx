import { Votes } from "../Votes/Votes";
import { Comments } from "../Comments/Comments";
import { Link } from "react-router";

import "./HomeHighlightCard.css";

export const HomeHighlightCard = ({ article, highlighting, badgeText }) => {
  if (!article) {
    return null;
  }

  const {
    article_id: articleId,
    article_img_url: image,
    title,
    topic,
    votes,
    comment_count: commentCount,
  } = article;

  const topicColour = {
    coding: "#f7b0be",
    cooking: "#3e91c1",
    football: "#fe673a",
  };

  const tagColour = { backgroundColor: `${topicColour[topic] || "#d3d3d3"}` };

  return (
    <Link
      to={`/articles/${articleId}`}
      className="home-highlight-card"
      data-testid={`home-highlight-${highlighting}-card`}
    >
      <header>
        <div className="home-highlight-image-wrapper">
          <img className="home-highlight-image" src={image} />
          <span className="home-highlight-badge">{badgeText}</span>
        </div>
        <h2 className="home-highlight-header">{title}</h2>
      </header>
      <footer className="home-highlight-card-footer">
        <div className="home-highlight-topic" style={tagColour}>
          {topic}
        </div>
        {highlighting === "votes" && <Votes votes={votes} />}
        {highlighting === "comments" && (
          <Comments commentCount={commentCount} />
        )}
      </footer>
    </Link>
  );
};
