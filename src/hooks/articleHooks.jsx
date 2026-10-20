import { useEffect, useState } from "react";
import { get } from "../../api";

export const useArticleList = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchArticles = async () => {
      get("/articles")
        .then((articles) => setArticles(articles.articles))
        .catch((error) => setError(error))
        .finally(setLoading(false));
    };
    fetchArticles();
  }, []);
  return { articles, loading, error };
};
