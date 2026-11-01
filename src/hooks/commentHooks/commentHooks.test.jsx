vi.mock("../../../api.js", () => {
  return { get: vi.fn(), post: vi.fn() };
});
import { renderHook, waitFor, act } from "@testing-library/react";
import { useCommentList, useCreateComment } from "./commentHooks.jsx";
import { get, post } from "../../../api.js";
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
      expect(result.current.commentsLoading).toBe(false);
    });

    expect(result.current.comments).toEqual([]);
    expect(result.current.commentsErrors).toBeInstanceOf(Error);
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

    act(() => {
      result.current
        .submitComment({
          username: "otis",
          body: "Awesome read!",
        })
        .catch(() => {});
    });

    await waitFor(() => {
      expect(result.current.commentError).toThrow(Error);
    });

    expect(result.current.commentError.message).toBe("Network error");
    expect(result.current.newComment).toEqual({});
    expect(result.current.commentLoading).toBe(false);
  });
});
