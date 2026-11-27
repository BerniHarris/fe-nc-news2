import "./ArticleCard.css";
import { Votes } from "../../components/Votes/Votes";
import { Comments } from "../Comments/Comments";
import { isoStringToDDMMYYYY } from "../../utils/utils";

export const ArticleCard = ({
  article,
  userAvatar,
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
      {article_img_url && (
        <img
          src={article_img_url}
          alt={`Cover for ${title}`}
          className="article-card-image"
        />
      )}

      <div className="article-body-wrapper">
        <div className="whoandwhen">
          <div className="who">
            {userAvatar && (
              <img
                src={userAvatar}
                alt={`${author} avatar`}
                className="author-avatar"
              />
            )}
            <address className="author" data-testid="author">
              By {author}
            </address>
          </div>
          <time className="date">{isoStringToDDMMYYYY(created_at)}</time>
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
