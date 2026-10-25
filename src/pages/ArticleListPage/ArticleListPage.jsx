import { useArticleList } from "../../hooks/articleHooks/articleHooks";
import { ArticleSummaryCard } from "../../components/ArticleSummaryCard/ArticleSummaryCard";
import "./ArticleListPage.css";
import { useSearchParams } from "react-router";
import { useState } from "react";
import { toTitleCase } from "../../utils/utils";

export const ArticleListPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const topic = searchParams.get("topic") || "";
  const sortBy = searchParams.get("sort_by") || undefined;
  const order = searchParams.get("order") || undefined;
  const { articles, loading, error } = useArticleList(topic, sortBy, order);

  const handleTopicChange = (event) => {
    const newParams = new URLSearchParams(searchParams);

    if (event.target.value === "") {
      newParams.delete("topic");
    } else {
      newParams.set("topic", event.target.value);
    }

    return setSearchParams(newParams);
  };

  const handleSortByChange = (event) => {
    const newParams = new URLSearchParams(searchParams);

    if (!event.target.value) {
      newParams.delete("sort_by");
    } else {
      newParams.set("sort_by", event.target.value);
    }

    return setSearchParams(newParams);
  };

  const handleOrderChange = (event) => {
    const newParams = new URLSearchParams(searchParams);

    if (!event.target.value) {
      newParams.delete("order");
    } else {
      newParams.set("order", event.target.value);
    }

    return setSearchParams(newParams);
  };
  console.log(order);
  const TopicSelector = () => {
    return (
      <section className="topic-selector">
        <label htmlFor="topic">Topic:</label>
        <select
          name="topic"
          value={topic}
          onChange={handleTopicChange}
          id="topic"
        >
          {!topic && (
            <option value="" disabled default>
              -- Topic --
            </option>
          )}
          {topic && <option value="">❌ Clear Selection</option>}

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
          value={order || ""}
          onChange={handleOrderChange}
          id="order"
        >
          {!order && (
            <option value="" disabled>
              -- Order --
            </option>
          )}
          {order && <option value="">❌ Clear Selection</option>}
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
          name="sort_by"
          value={sortBy || ""}
          onChange={handleSortByChange}
          id="sort_by"
        >
          <option value="" disabled>
            -- Sort --
          </option>

          {sortBy && <option value="">❌ Clear Selection</option>}

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

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message || error}</p>;

  const pageHeader = topic ? `${toTitleCase(topic)} Articles` : "Articles";

  return (
    <div className="article-list-page" data-testid="article-list-page">
      <h1>{pageHeader}</h1>
      <form className="organise-articles" onSubmit={(e) => e.preventDefault()}>
        <TopicSelector />
        <OrderSelector />
        <SortBySelector />
      </form>

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
