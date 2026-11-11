import { useArticleList } from "../../hooks/useArticles/useArticles";
import { ArticleSummaryCard } from "../../components/ArticleSummaryCard/ArticleSummaryCard";
import { useSearchParams } from "react-router";
import { toTitleCase } from "../../utils/utils";
import { OrderDropdown } from "../../components/filtering/OrderDropdown/OrderDopdown";
import { TopicDropdown } from "../../components/filtering/TopicDropdown/TopicDropdown";
import { SortDropdown } from "../../components/filtering/SortDropdown/SortDropdown";
import { Loading } from "../../components/Loading/Loading";
import { ErrorPage } from "../ErrorPage/ErrorPage";
import "./ArticleListPage.css";

export const ArticleListPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const {
    topic = "",
    sort_by: sortBy,
    order,
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
