import { useEffect, useState } from "react";
import { get, post, deleteReq } from "../../../api";

export const useCommentList = (article_id) => {
  const [comments, setComments] = useState([]);
  const [commentsLoading, setCommentsLoading] = useState(false);
  const [commentsErrors, setCommentsErrors] = useState(null);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        setCommentsLoading(true);
        const { comments } = await get(`/articles/${article_id}/comments`);
        setComments(comments);
        return comments;
      } catch (err) {
        setCommentsErrors(err);
      } finally {
        setCommentsLoading(false);
      }
    };

    fetchComments();
  }, [article_id]);

  return {
    comments,
    setComments,
    commentsLoading,
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
      return comment;
    } catch (error) {
      setCommentError(error);
    } finally {
      setCommentLoading(false);
    }
  };
  return { submitComment, newComment, commentError, commentLoading };
};

export const useDeleteComment = () => {
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [deleteError, setDeleteError] = useState(null);

  const removeComment = async (comment_id) => {
    setDeleteLoading(true);
    setDeleteError(null);

    try {
      await deleteReq(`/comments/${comment_id}`);

      return comment_id;
    } catch (error) {
      setDeleteError(error);
      throw error;
    } finally {
      setDeleteLoading(false);
    }
  };

  return {
    removeComment,
    deleteLoading,
    deleteError,
  };
};
