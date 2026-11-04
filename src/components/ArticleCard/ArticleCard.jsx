import "./ArticleCard.css";
import { Votes } from "../../components/Votes/Votes";
import { Comments } from "../Comments/Comments";

export const ArticleCard = ({
  article,
  commentNumber,
  handleUpvote,
  handleDownvote,
}) => {
  if (!article) {
    return null;
  }
  const {
    article_id,
    article_img_url,
    author,
    body,
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
      <img
        src={article_img_url}
        alt={`Cover for ${title}`}
        className="article-image"
      />

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
        <Comments commentCount={commentNumber} />
        <Votes
          votes={votes}
          handleUpvote={handleUpvote}
          handleDownvote={handleDownvote}
        />
      </footer>
    </article>
  );
};
