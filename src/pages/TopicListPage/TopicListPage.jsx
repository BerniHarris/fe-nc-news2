import { TopicCard } from "../../components/TopicCard/TopicCard";
import { useTopics } from "../../hooks/TopicHooks/TopicHooks";
import "./TopicListPage.css";

export const TopicListPage = () => {
  const { topics, loading, error } = useTopics();

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message || error}</p>;

  const pageHeader = "Topics";

  return (
    <div className="topic-list-page" data-testid="topic-list-page">
      <h1>{pageHeader}</h1>

      <section className="topic-list">
        {topics && topics.length > 0 ? (
          topics.map((topic) => <TopicCard topic={topic} />)
        ) : (
          <p data-testid="no-topics">No topics found.</p>
        )}
      </section>
    </div>
  );
};
