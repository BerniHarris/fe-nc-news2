import { useEffect, useState } from "react";
import { get, post } from "../../../api";

export const useCommentList = (article_id) => {
  const [comments, setComments] = useState([]);
  const [commentsLoading, setCommentsLoading] = useState(true);
  const [commentsErrors, setCommentsErrors] = useState(null);

  const fetchComments = async () => {
    try {
      const { comments } = await get(`/articles/${article_id}/comments`, {
        params: { article_id },
      });
      setComments(comments);
    } catch (err) {
      setCommentsErrors(err);
    } finally {
      setCommentsLoading(false);
    }
  };

  fetchComments();

  return {
    comments,
    setComments,
    commentsLoading,
    setCommentsLoading,
    commentsErrors,
  };
};

export const useCreateComment = (article_id) => {
  const [newComment, setNewComment] = useState({});
  const [commentLoading, setCommentLoading] = useState(false);
  const [commentError, setCommentError] = useState(null);

  const submitComment = async (commentBody) => {
    setCommentLoading(true);
    setCommentError(null);
    try {
      const { comment } = await post(
        `/articles/${article_id}/comments`,
        commentBody,
      );
      setNewComment(comment);
    } catch (error) {
      setCommentError(error);
      throw error;
    } finally {
      setCommentLoading(false);
    }
  };

  return { submitComment, newComment, commentError, commentLoading };
};
