import { useArticleList } from "../../hooks/useArticles/useArticles";
import { ArticleSummaryCard } from "../../components/ArticleSummaryCard/ArticleSummaryCard";
import { useSearchParams } from "react-router";
import { toTitleCase } from "../../utils/utils";
import { OrderDropdown } from "../../components/filtering/OrderDropdown/OrderDopdown";
import { TopicDropdown } from "../../components/filtering/TopicDropdown/TopicDropdown";
import { SortDropdown } from "../../components/filtering/SortDropdown/SortDropdown";
import { Loading } from "../../components/Loading/Loading";
import { ErrorPage } from "../ErrorPage/ErrorPage";
import { FaSortAmountDown, FaSortAmountUp } from "react-icons/fa";

import "./ArticleListPage.css";

export const ArticleListPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const {
    topic = "",
    sort_by: sortBy = "created_at",
    order = "desc",
  } = Object.fromEntries(searchParams);
  const { articles, loading, error } = useArticleList(topic, sortBy, order);

  const handleParamChange = (key, event) => {
    const newParams = new URLSearchParams(searchParams);
    const value = event.target.value;

    if (!value || value === "") {
      newParams.delete(key);
    } else {
      newParams.set(key, value);
    }

    setSearchParams(newParams);
  };

  if (error) return <ErrorPage error={error} />;
  if (loading) return <Loading />;

  const pageHeader = topic ? `${toTitleCase(topic)} Articles` : "Articles";

  const toggleOrder = () => {
    const nextOrder = order === "desc" ? "asc" : "desc";
    setSearchParams((prev) => {
      prev.set("order", nextOrder);
      return prev;
    });
  };

  const getOrderLabel = () => {
    if (sortBy === "title") {
      return order === "asc" ? "A-Z" : "Z-A";
    }
    if (sortBy === "created_at") {
      return order === "desc" ? "Newest" : "Oldest";
    }
    return order === "desc" ? "Highest" : "Lowest";
  };

  return (
    <div className="article-list-page" data-testid="article-list-page">
      <h1>{pageHeader}</h1>
      <form className="organise-articles" onSubmit={(e) => e.preventDefault()}>
        <TopicDropdown
          value={topic}
          label="Topic"
          onChange={(e) => handleParamChange("topic", e)}
        />
        <SortDropdown
          value={sortBy}
          label="Sort"
          onChange={(e) => handleParamChange("sort_by", e)}
        />
        <button
          className="toggle-order-button"
          onClick={toggleOrder}
          aria-label={`Current order: ${order === undefined ? "Newest" : getOrderLabel()}. Click to reverse order.`}
          data-testid="toggle-order-button"
        >
          {order === "desc" ? (
            <FaSortAmountDown size={"1rem"} />
          ) : (
            <FaSortAmountUp size={"1rem"} />
          )}
        </button>
      </form>

      <section className="article-list">
        {articles?.length > 0 ? (
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
