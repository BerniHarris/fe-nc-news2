import { useEffect, useState } from "react";
import { get } from "../../../api";

export const useCommentList = (article_id) => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const { comments } = await get(`/articles/${article_id}/comments`, {
          params: { article_id },
        });
        setComments(comments);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, [article_id]);

  return { comments, loading, error };
};
