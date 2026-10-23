import { Link } from "react-router";
import "./TopicCard.css";

export const TopicCard = ({ topic }) => {
  if (!topic) {
    return null;
  }

  console.log(topic);

  const { slug, description } = topic;

  const topicColour = {
    coding: "#f7b0be",
    cooking: "#3e91c1",
    football: "#fe673a",
  };

  const tagColour = {
    backgroundColor: `${topicColour[slug.toLowerCase()] || "#d3d3d3"}`,
  };

  return (
    <Link
      to={`/articles?topic=${slug}`}
      className="topic-card"
      data-testid="topic-card"
      style={tagColour}
    >
      <div className="slug-and-description">
        <h2 className="topic-slug" data-testid="topicSlug">
          {slug.toUpperCase()}
        </h2>
        <p className="topic-description">{description}</p>
      </div>
    </Link>
  );
};
