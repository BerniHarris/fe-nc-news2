import "./ArticleSummaryCard.css";
import { FaRegHeart, FaRegCommentAlt } from "react-icons/fa";

export const ArticleSummaryCard = ({ article }) => {
  if (!article) {
    return null;
  }

  const { title, author, topic, votes, comment_count } = article;

  const topicColour = {
    coding: "#f7b0be",
    cooking: "#3e91c1",
    football: "#fe673a",
  };

  const tagColour = { backgroundColor: `${topicColour[topic] || "#d3d3d3"}` };

  return (
    <article
      key={article.article_id}
      className="article-summary-card"
      data-testid="article-summary-card"
    >
      <header className="header">
        <p className="topic" data-testid="topicTag" style={tagColour}>
          {topic.toUpperCase()}
        </p>
        <h2 className="title">{title.toUpperCase()}</h2>
      </header>
      <footer className="meta">
        <p className="author" data-testid="author">
          By {author}
        </p>
        <div className="votes" data-testid="votes">
          <FaRegHeart
            size={"1.5em"}
            className="react-icon"
            data-testid="votesHeart"
          />
          <p>{votes}</p>
        </div>
        <div className="comments" data-testid="comments">
          <FaRegCommentAlt
            size={"1.4em"}
            className="react-icon"
            data-testid="commentBubble"
          />
          <p className="comment-count">{comment_count}</p>
        </div>
      </footer>
    </article>
  );
};
