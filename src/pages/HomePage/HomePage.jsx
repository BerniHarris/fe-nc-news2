import { Link } from "react-router";
import { useArticleList } from "../../hooks/useArticles/useArticles";
import { HomeHighlightCard } from "../../components/HomeHighlightCard/HomeHighlightCard";
import "./HomePage.css";
import { FeatureCard } from "../../components/FeatureCard/FeatureCard";
import { IoMdArrowRoundForward } from "react-icons/io";
import { Loading } from "../../components/Loading/Loading";

export const HomePage = () => {
  const { articles: topLiked, loading: topLikedLoading } = useArticleList(
    undefined,
    "votes",
    "desc",
  );
  const { articles: topCommented, loading: topCommentedLoading } =
    useArticleList(undefined, "comment_count", "desc");
  const { articles: latestArticle, loading: latestArticleLoading } =
    useArticleList(undefined, "created_at", "desc");

  const topFiveLiked = topLiked.slice(0, 5);
  const topFiveCommented = topCommented.slice(0, 5);
  const newestArticle = latestArticle[0];

  if (latestArticleLoading || topLikedLoading || topCommentedLoading)
    return <Loading />;

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
