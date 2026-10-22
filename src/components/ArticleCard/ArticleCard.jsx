import "./ArticleCard.css";
import { FaRegHeart, FaRegCommentAlt } from "react-icons/fa";

export const ArticleCard = ({ article }) => {
  if (!article) {
    return null;
  }

  const {
    article_id,
    article_img_url,
    author,
    body,
    comment_count,
    created_at,
    title,
    topic,
    votes,
  } = article;

  const topicColour = {
    coding: "#f7b0be",
    cooking: "#3e91c1",
    football: "#fe673a",
  };

  const formattedDate = new Date(created_at).toLocaleDateString("en-GB", {
    dateStyle: "full",
  });

  const tagColour = { backgroundColor: `${topicColour[topic] || "#d3d3d3"}` };

  return (
    <article
      className="article-card"
      data-testid={`article-card-${article_id}`}
    >
      <header className="header">
        <div className="topic" data-testid="topicTag" style={tagColour}>
          {topic.toUpperCase()}
        </div>
        <h2 className="title">{title.toUpperCase()}</h2>
      </header>
      <img src={article_img_url} alt={`Cover for ${title}`} />

      <div className="article-body-wrapper">
        <div className="whoandwhen">
          <address className="author" data-testid="author">
            By {author}
          </address>
          <time className="date">{formattedDate}</time>
        </div>
        <p>{body}</p>
      </div>
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
        <button
          type="button"
          className="comments"
          data-testid="comments"
          aria-label={`Current number of comments: ${comment_count}`}
        >
          <FaRegCommentAlt
            size={"1.4em"}
            className="react-icon"
            data-testid="commentBubble"
          />
          <p className="comment-count">{comment_count}</p>
        </button>
      </footer>
    </article>
  );
};
