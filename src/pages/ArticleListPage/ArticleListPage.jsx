import { useArticleList } from "../../hooks/articleHooks/articleHooks";
import { ArticleSummaryCard } from "../../components/ArticleSummaryCard/ArticleSummaryCard";
import "./ArticleListPage.css";
import { useSearchParams } from "react-router";
import { toTitleCase } from "../../utils/utils";
import { OrderDropdown } from "../../components/filtering/OrderDropdown/OrderDopdown";
import { TopicDropdown } from "../../components/filtering/TopicDropdown/TopicDropdown";
import { SortDropdown } from "../../components/filtering/SortDropdown/SortDropdown";

export const ArticleListPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const topic = searchParams.get("topic") || "";
  const sortBy = searchParams.get("sort_by") || undefined;
  const order = searchParams.get("order") || undefined;
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

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message || error}</p>;

  const pageHeader = topic ? `${toTitleCase(topic)} Articles` : "Articles";

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
        <OrderDropdown
          valu={order}
          label="order"
          onChange={(e) => handleParamChange("order", e)}
        />
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
