import { TopicCard } from "../../components/TopicCard/TopicCard";
import { useTopics } from "../../hooks/topicHooks/topicHooks.jsx";
import "./TopicListPage.css";
import { Loading } from "../../components/Loading/Loading.jsx";
import { ErrorPage } from "../ErrorPage/ErrorPage.jsx";

export const TopicListPage = () => {
  const { topics, loading, error } = useTopics();

  if (loading) return <Loading />;
  if (error) return <ErrorPage error={error} />;

  const pageHeader = "Topics";

  return (
    <div className="topic-list-page" data-testid="topic-list-page">
      <h1>{pageHeader}</h1>

      <section className="topic-list">
        {topics && topics.length > 0 ? (
          topics.map((topic) => <TopicCard key={topic.slug} topic={topic} />)
        ) : (
          <p data-testid="no-topics">No topics found.</p>
        )}
      </section>
    </div>
  );
};
