import { useEffect, useState } from "react";
import { get } from "../../api";

export const useArticleList = (topic, sort_by, order) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const { articles } = await get("/articles", {
          params: { topic: topic, sort_by: sort_by, order: order }, // TODO - Add the config to test
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
      try {
        const { article } = await get(`/articles/${articleId}`);
        setArticle(article);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchArticle();
  }, [articleId]);
  console.log(article, error);

  return { article, loading, error };
};
