import { Link } from "react-router";

import "./FeatureCard.css";

export const FeatureCard = ({ article }) => {
  if (!article) {
    return null;
  }

  const {
    article_id: articleId,
    article_img_url: image,
    author,
    created_at: date,
    topic,
    title,
  } = article;

  const formattedDate = new Date(date).toLocaleDateString("en-GB", {
    dateStyle: "full",
  });

  const topicColour = {
    coding: "#f7b0be",
    cooking: "#3e91c1",
    football: "#fe673a",
  };

  const tagColour = { backgroundColor: `${topicColour[topic] || "#d3d3d3"}` };

  return (
    <Link
      to={`/articles/${articleId}`}
      className="home-feature-card"
      data-testid="home-feature-card"
    >
      <div className="home-feature-card-body">
        <div className="home-feature-card-image-wrapper">
          <img className="home-feature-card-image" src={image} alt={title} />
          <span className="feature-card-new-badge">New!</span>
        </div>
        <h2 className="home-feature-card-header">{title}</h2>
        <div className="home-highlight-topic" style={tagColour}>
          {topic}
        </div>
      </div>
      <footer className="home-feature-card-footer">
        <div className="whoandwhen">
          <address className="author" data-testid="author">
            By {author}
          </address>
          <time className="date">{formattedDate}</time>
        </div>
      </footer>
    </Link>
  );
};
