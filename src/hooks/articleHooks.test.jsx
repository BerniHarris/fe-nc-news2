vi.mock("../../api", () => ({ get: vi.fn() }));
import { renderHook, waitFor } from "@testing-library/react";
import { useArticleList } from "./articleHooks.jsx";
import { get } from "../../api";
import { cleanup } from "@testing-library/react";

afterEach(() => {
  cleanup();
});

describe("useArticleList", () => {
  test("initial state", () => {
    get.mockReturnValue(new Promise(() => {}));
    const { result } = renderHook(() => useArticleList());

    expect(result.current.articles).toEqual([]);
    expect(result.current.loading).toBe(true);
    expect(result.current.error).toBe(null);
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
  });

  test("handles API failure", async () => {
    get.mockRejectedValue(new Error("Network error"));

    const { result } = renderHook(() => useArticleList());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.articles).toEqual([]);
    expect(result.current.error).toBeInstanceOf(Error);
  });
});
