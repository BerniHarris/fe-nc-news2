import { useArticleList } from "../../hooks/articleHooks";
import { ArticleSummaryCard } from "../../components/ArticleSummaryCard/ArticleSummaryCard";
import "./ArticleListPage.css";
import { useSearchParams } from "react-router";
import { useState } from "react";

export const ArticleListPage = () => {
  const [searchParams] = useSearchParams();
  const [topic, setTopic] = useState(searchParams.get("topic"));
  const [sortBy, setSortBy] = useState(searchParams.get("sort_by"));
  const [order, setOrder] = useState(searchParams.get("order"));
  const { articles, loading, error } = useArticleList(topic, sortBy, order);

  // TODO create selector component for DRY code
  // TODO if topic selected, should it navigate to /topics?
  const TopicSelector = () => {
    return (
      <section className="topic-selector">
        <label htmlFor="topic">Topic:</label>
        <select
          name="topic"
          value={topic || ""}
          onChange={(event) => setTopic(event.target.value)}
          id="topic"
        >
          <option value="">-- Select a Topic --</option>

          <option value="coding">coding</option>
          <option value="cooking">cooking</option>
          <option value="football">football</option>
        </select>
      </section>
    );
  };

  const OrderSelector = () => {
    return (
      <section className="order-selector">
        <label htmlFor="order">Order:</label>
        <select
          name="order"
          value={order || "desc"}
          onChange={(event) => setOrder(event.target.value)}
          id="order"
        >
          <option value="desc">-- Select an order --</option>

          <option value="asc">asc</option>
          <option value="desc">desc</option>
        </select>
      </section>
    );
  };

  const SortBySelector = () => {
    return (
      <section className="sort-by-selector">
        <label htmlFor="sort">Sort by:</label>
        <select
          name="sort"
          value={sortBy || ""}
          onChange={(event) => setSortBy(event.target.value)}
          id="sort"
        >
          <option value="">-- Select way to sort --</option>

          <option value="author">author</option>
          <option value="title">title</option>
          <option value="topic">topic</option>
          <option value="created_at">created_at</option>
          <option value="votes">votes</option>
          <option value="article_id">article_id</option>
          <option value="article_img_url">article_img_url</option>
          <option value="comment_count">comment_count</option>
        </select>
      </section>
    );
  };

  // TODO error component so looks nicer
  // TODO loading screen

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message || error}</p>;

  // TODO move to utils
  const toTitleCase = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  // TODO can this be written nicer? or am I over thinking now I've descovered TODO's?
  const pageHeader = topic ? `${toTitleCase(topic)} Articles` : "Articles";

  return (
    <div className="article-list-page" data-testid="article-list-page">
      <h1>{pageHeader}</h1>
      <section className="organise-articles">
        <TopicSelector onChange={Event} />
        <OrderSelector onChange={Event} />
        <SortBySelector onChange={Event} />
      </section>
      <section className="article-list">
        {articles && articles.length > 0 ? (
          articles.map((article) => (
            <ArticleSummaryCard key={article.article_id} article={article} />
          ))
        ) : (
          <p data-testid="no-articles">No articles found.</p>
        )}
      </section>
    </div>
  );
};
