import { useEffect, useState } from "react";
import { get, patch } from "../../../api";

export const useArticleList = (topic, sort_by, order) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const { articles } = await get("/articles", {
          params: { topic: topic, sort_by: sort_by, order: order },
        });
        setArticles(articles);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, [topic, sort_by, order]);

  return { articles, loading, error };
};

export const useArticle = (articleId) => {
  const [article, setArticle] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchArticle = async () => {
      if (!articleId) {
        setError(new Error("Article ID is required"));
        setLoading(false);
        return;
      }
      try {
        const { article } = await get(`/articles/${articleId}`);
        setArticle(article);
        return article;
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchArticle();
  }, [articleId]);

  return { article, setArticle, loading, error };
};

export const useUpdateArticle = () => {
  const [updatedArticle, setUpdatedArticle] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const updateArticle = async (article_id, voteInc) => {
    setLoading(true);
    setError(null);
    if (!article_id || !voteInc) {
      setError(new Error("Article ID and inc_vote is required"));
      setLoading(false);
      return;
    }

    try {
      const article = await patch(`/articles/${article_id}`, {
        inc_votes: voteInc,
      });
      setUpdatedArticle(article);
      return article;
    } catch (error) {
      setError(error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return {
    updateArticle,
    updatedArticle,
    loading,
    error,
  };
};

export const useHomePageArticles = () => {
  const topLiked = useArticleList(undefined, "votes", "desc");
  const topCommented = useArticleList(undefined, "comment_count", "desc");
  const latest = useArticleList(undefined, "created_at", "desc");

  return {
    topFiveLiked: topLiked.articles.slice(0, 5),
    topFiveCommented: topCommented.articles.slice(0, 5),
    newestArticle: latest.articles[0],
    loading: latest.loading || topLiked.loading || topCommented.loading,
    error: latest.error || topLiked.error || topCommented.error,
  };
};
