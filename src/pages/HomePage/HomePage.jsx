import { Link } from "react-router";
import { useHomePageArticles } from "../../hooks/useArticles/useArticles";
import { HomeHighlightCard } from "../../components/HomeHighlightCard/HomeHighlightCard";
import "./HomePage.css";
import { FeatureCard } from "../../components/FeatureCard/FeatureCard";
import { IoMdArrowRoundForward } from "react-icons/io";
import { Loading } from "../../components/Loading/Loading";
import { ErrorPage } from "../ErrorPage/ErrorPage";

export const HomePage = () => {
  const { topFiveLiked, topFiveCommented, newestArticle, loading, error } =
    useHomePageArticles();

  if (error) return <ErrorPage error={error} />;
  if (loading) return <Loading />;

  return (
    <div className="home-page" data-testid="home-page">
      <h1>Home</h1>
      <section>
        <FeatureCard article={newestArticle} />
      </section>
      <div className="home-page-articles">
        <section className="top-liked">
          <h2 className="most-liked-heading">Most Liked</h2>
          <div className="home-article-list">
            {topFiveLiked.length === 5 &&
              topFiveLiked.map((article, key) => (
                <HomeHighlightCard
                  key={`${article.article_id}-vote`}
                  article={article}
                  highlighting={"votes"}
                  badgeText={`#${key + 1} Most Liked`}
                />
              ))}
          </div>
        </section>
        <section className="top-commented">
          <h2 className="most-comments-heading">Most Comments</h2>
          <div className="home-article-list">
            {topFiveCommented.length === 5 &&
              topFiveCommented.map((article, key) => (
                <HomeHighlightCard
                  key={`${article.article_id}-comment`}
                  article={article}
                  highlighting={"comments"}
                  badgeText={`#${key + 1} Most Comments`}
                />
              ))}
          </div>
        </section>
      </div>
      <div className="button-to-articles-container">
        <Link
          to={`/articles`}
          className="button-to-all-articles"
          data-testid="button-to-all-articles"
          aria-label={`Press to view more articles.`}
        >
          More Articles
          <IoMdArrowRoundForward />
        </Link>
      </div>
    </div>
  );
};
