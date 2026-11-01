vi.mock("../../../api.js", () => {
  return { get: vi.fn(), post: vi.fn(), deleteReq: vi.fn() };
});
import { renderHook, waitFor, act } from "@testing-library/react";
import {
  useCommentList,
  useCreateComment,
  useDeleteComment,
} from "./useComments.jsx";
import { deleteReq, get, post } from "../../../api.js";
import { cleanup } from "@testing-library/react";
import { expect } from "vitest";

afterEach(() => {
  cleanup();
  vi.clearAllMocks();
});

describe("useCommentList", () => {
  test("initial state", () => {
    get.mockReturnValue(new Promise(() => {}));
    const { result } = renderHook(() => useCommentList());
    expect(result.current.comments).toEqual([]);
    expect(result.current.commentsLoading).toBe(true);
    expect(result.current.commentsErrors).toBe(null);
  });

  test("loads comments successfully", async () => {
    get.mockResolvedValue({
      comments: [{ article_id: 1, title: "Test" }],
    });

    const { result } = renderHook(() => useCommentList());

    await waitFor(() => {
      expect(result.current.commentsLoading).toBe(false);
    });

    expect(result.current.comments).toEqual([{ article_id: 1, title: "Test" }]);

    expect(result.current.commentsErrors).toBe(null);
  });

  test("handles API failure", async () => {
    get.mockRejectedValue(new Error("Network error"));

    const { result } = renderHook(() => useCommentList());
    await waitFor(() => {
      expect(result.current.commentsErrors).not.toBeNull();
    });

    expect(result.current.comments).toEqual([]);
    expect(result.current.commentsLoading).toBe(false);
    expect(result.current.commentsErrors).toBeInstanceOf(Error);

    expect(result.current.commentsErrors.message).toBe("Network error");
  });
});

describe("useCreateComment", () => {
  test("initial state", () => {
    post.mockReturnValue(new Promise(() => {}));
    const { result } = renderHook(() => useCreateComment());
    expect(result.current.newComment).toEqual({});
    expect(result.current.commentLoading).toBe(false);
    expect(result.current.commentError).toBe(null);
  });

  test("loads newComment successfully", async () => {
    const mockServerResponse = {
      comment: {
        comment_id: 4,
        author: "otis",
        body: "Awesome read!",
        article_id: 199,
      },
    };

    post.mockResolvedValueOnce(mockServerResponse);

    const { result } = renderHook(() => useCreateComment(199));

    let postedComment;

    await waitFor(async () => {
      postedComment = await result.current.submitComment({
        username: "otis",
        body: "Awesome read!",
      });
    });

    expect(post).toHaveBeenCalledWith("/articles/199/comments", {
      username: "otis",
      body: "Awesome read!",
    });
    expect(postedComment).toEqual(mockServerResponse.comment);
    expect(result.current.commentError).toBe(null);
  });

  test("handles API failure", async () => {
    post.mockRejectedValue(new Error("Network error"));

    const { result } = renderHook(() => useCreateComment(199));

    await act(async () => {
      try {
        await result.current.submitComment({
          username: "otis",
          body: "Awesome read!",
        });
      } catch (error) {}
    });

    expect(result.current.commentError).toBeInstanceOf(Error);

    expect(result.current.commentError.message).toBe("Network error");
    expect(result.current.newComment).toEqual({});
    expect(result.current.commentLoading).toBe(false);
  });

  describe("useDeleteComment", () => {
    test("should return initial states", () => {
      const { result } = renderHook(() => useDeleteComment());

      expect(result.current.deleteLoading).toBe(false);
      expect(result.current.deleteError).toBeNull();
      expect(typeof result.current.removeComment).toBe("function");
    });

    test("should delete a comment successfully and manage loading state", async () => {
      deleteReq.mockResolvedValue({});

      const { result } = renderHook(() => useDeleteComment());

      let deletePromise;

      act(() => {
        deletePromise = result.current.removeComment(42);
      });

      expect(result.current.deleteLoading).toBe(true);
      expect(result.current.deleteError).toBeNull();

      let deletedId;
      await act(async () => {
        deletedId = await deletePromise;
      });

      expect(deletedId).toBe(42);
      expect(deleteReq).toHaveBeenCalledWith("/comments/42");
      expect(result.current.deleteLoading).toBe(false);
      expect(result.current.deleteError).toBeNull();
    });

    test("should handle API failure and track the error state", async () => {
      deleteReq.mockRejectedValue(new Error("Failed to delete comment"));

      const { result } = renderHook(() => useDeleteComment());

      await act(async () => {
        try {
          await result.current.removeComment(42);
        } catch (error) {}
      });

      expect(result.current.deleteLoading).toBe(false);
      expect(result.current.deleteError).toBeInstanceOf(Error);
      expect(result.current.deleteError.message).toBe(
        "Failed to delete comment",
      );
    });
  });
});
