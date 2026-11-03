vi.mock("../../../api", () => ({ get: vi.fn(), patch: vi.fn() }));
import { renderHook, waitFor, act } from "@testing-library/react";
import {
  useArticleList,
  useArticle,
  useUpdateArticle,
} from "./articleHooks.jsx";
import { get, patch } from "../../../api.js";
import { cleanup } from "@testing-library/react";

afterEach(() => {
  cleanup();
  vi.clearAllMocks();
});

describe("useArticleList", () => {
  test("initial state", () => {
    get.mockReturnValue(new Promise(() => {}));
    const { result } = renderHook(() => useArticleList());

    expect(result.current.articles).toEqual([]);
    expect(result.current.loading).toBe(true);
    expect(result.current.error).toBe(null);
    expect(get).toHaveBeenCalledWith("/articles", {
      params: { sort_by: undefined, topic: undefined, order: undefined },
    });
  });

  test("should call with params set as undefined by default", async () => {
    get.mockResolvedValue({ articles: [] });

    renderHook(() => useArticleList());

    await waitFor(() => {
      expect(get).toHaveBeenCalled();
    });

    expect(get).toHaveBeenCalledWith("/articles", {
      params: {
        topic: undefined,
        sort_by: undefined,
        order: undefined,
      },
    });
  });

  test("should call get with the supplied params ", async () => {
    get.mockResolvedValue({ articles: [] });

    renderHook(() => useArticleList("coding", "votes", "asc"));

    await waitFor(() => {
      expect(get).toHaveBeenCalled();
    });

    expect(get).toHaveBeenCalledWith("/articles", {
      params: {
        topic: "coding",
        sort_by: "votes",
        order: "asc",
      },
    });
  });

  test("should refetch when params change", async () => {
    get.mockResolvedValue({ articles: [] });

    const { rerender } = renderHook(
      ({ topic }) => useArticleList(topic, "votes", "desc"),
      {
        initialProps: { topic: "coding" },
      },
    );

    await waitFor(() => {
      expect(get).toHaveBeenCalledTimes(1);
    });

    rerender({ topic: "football" });

    await waitFor(() => {
      expect(get).toHaveBeenCalledTimes(2);
    });
  });

  test("loads articles successfully", async () => {
    get.mockResolvedValue({
      articles: [{ article_id: 1, title: "Test" }],
    });

    const { result } = renderHook(() => useArticleList());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.articles).toEqual([{ article_id: 1, title: "Test" }]);

    expect(result.current.error).toBe(null);
    expect(get).toHaveBeenCalledWith("/articles", {
      params: { sort_by: undefined, topic: undefined, order: undefined },
    });
  });

  test("handles API failure", async () => {
    get.mockRejectedValue(new Error("Network error"));

    const { result } = renderHook(() => useArticleList());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.articles).toEqual([]);
    expect(result.current.error).toBeInstanceOf(Error);
    expect(result.current.error.message).toBe("Network error");
  });
});

describe("useArticle", () => {
  test("initial state", () => {
    get.mockReturnValue(new Promise(() => {}));
    const { result } = renderHook(() => useArticle(1));

    expect(result.current.article).toBeUndefined();
    expect(result.current.loading).toBe(true);
    expect(result.current.error).toBe(null);
    expect(get).toHaveBeenCalledWith("/articles/1");
  });

  test("loads article successfully", async () => {
    get.mockResolvedValue({
      article: { article_id: 1, title: "Test" },
    });

    const { result } = renderHook(() => useArticle(1));

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.article).toEqual({ article_id: 1, title: "Test" });

    expect(result.current.error).toBe(null);
    expect(get).toHaveBeenCalledWith("/articles/1");
  });

  test("returns with error message if no article_id passed", async () => {
    get.mockRejectedValue(new Error("Article ID is required"));

    const { result } = renderHook(() => useArticle());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.article).toEqual();
    expect(result.current.error).toBeInstanceOf(Error);
    expect(result.current.error.message).toBe("Article ID is required");
    expect(get).not.toHaveBeenCalled();
  });
  test("handles API failure", async () => {
    get.mockRejectedValue(new Error("Network error"));

    const { result } = renderHook(() => useArticle(1));

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.article).toEqual();
    expect(result.current.error).toBeInstanceOf(Error);
    expect(get).toHaveBeenCalledWith("/articles/1");
  });
});

describe("UseUpdateArticle", () => {
  test("initial state", () => {
    patch.mockReturnValue(new Promise(() => {}));
    const { result } = renderHook(() => useUpdateArticle());

    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBe(null);
  });

  test("updates article votes successfully", async () => {
    const mockServerResponse = {
      article_id: 12,
      votes: 1,
      title: "fake title",
    };

    patch.mockResolvedValueOnce(mockServerResponse);

    const { result } = renderHook(() => useUpdateArticle());

    await act(async () => {
      await result.current.updateArticle(12, 1);
    });

    expect(patch).toHaveBeenCalledWith("/articles/12", {
      inc_votes: 1,
    });
    expect(result.current.updatedArticle).toEqual(mockServerResponse);
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBe(null);
  });

  test("returns with error message if no article_id passed", async () => {
    patch.mockRejectedValue(new Error("Article ID and inc_vote is required"));

    const { result } = renderHook(() => useUpdateArticle());

    await act(async () => {
      try {
        await result.current.updateArticle(undefined, 1);
      } catch (error) {}
    });

    expect(result.current.error).toBeInstanceOf(Error);

    expect(result.current.error.message).toBe(
      "Article ID and inc_vote is required",
    );
    expect(result.current.loading).toBe(false);
  });
  test("returns with error message if no voteInc passed", async () => {
    patch.mockRejectedValue(new Error("Article ID and inc_vote is required"));

    const { result } = renderHook(() => useUpdateArticle());

    await act(async () => {
      try {
        await result.current.updateArticle(12);
      } catch (error) {}
    });

    expect(result.current.error).toBeInstanceOf(Error);

    expect(result.current.error.message).toBe(
      "Article ID and inc_vote is required",
    );
    expect(result.current.loading).toBe(false);
  });
  test("handles API failure", async () => {
    patch.mockRejectedValue(new Error("Network error"));

    const { result } = renderHook(() => useUpdateArticle());

    await act(async () => {
      try {
        await result.current.updateArticle(12, 1);
      } catch (error) {}
    });

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.article).toEqual();
    expect(result.current.error).toBeInstanceOf(Error);
    expect(result.current.error.message).toBe("Network error");
  });
});
