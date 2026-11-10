import { Link } from "react-router";
import "./ArticleSummaryCard.css";
import { Votes } from "../Votes/Votes.jsx";
import { Comments } from "../../components/Comments/Comments.jsx";

export const ArticleSummaryCard = ({ article }) => {
  if (!article) {
    return null;
  }

  const {
    title,
    author,
    topic,
    votes,
    comment_count: commentCount,
    article_id,
    article_img_url: image,
  } = article;

  const topicColour = {
    coding: "#f7b0be",
    cooking: "#3e91c1",
    football: "#fe673a",
  };

  const tagColour = { backgroundColor: `${topicColour[topic] || "#d3d3d3"}` };

  return (
    <Link
      to={`/articles/${article_id}`}
      className="article-summary-card"
      data-testid="article-summary-card"
    >
      <header className="header">
        <div className="article-image-container">
          <img src={image} className="article-image" />
        </div>
        <p className="topic" data-testid="topicTag" style={tagColour}>
          {topic.toUpperCase()}
        </p>
        <h2 className="title">{title.toUpperCase()}</h2>
      </header>
      <footer className="meta">
        <p className="author" data-testid="author">
          By {author}
        </p>
        <Votes votes={votes} />
        <Comments commentCount={commentCount} />
      </footer>
    </Link>
  );
};
