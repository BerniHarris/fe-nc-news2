import { render, screen } from "@testing-library/react";
import { describe, test, expect, vi, beforeEach } from "vitest";
import { MemoryRouter } from "react-router";

import { HomePage } from "./HomePage";
import { useArticleList } from "../../hooks/useArticles/useArticles";

vi.mock("../../hooks/useArticles/useArticles", () => ({
  useArticleList: vi.fn(),
}));

const mockArticle = {
  article_id: 1,
  article_img_url: "https://image.com",
  title: "Test Article",
  topic: "coding",
  votes: 100,
  comment_count: 50,
  author: "berni",
  created_at: "2026-01-01T00:00:00.000Z",
};

const mockArticles = [
  { ...mockArticle, article_id: 1 },
  { ...mockArticle, article_id: 2 },
  { ...mockArticle, article_id: 3 },
  { ...mockArticle, article_id: 4 },
  { ...mockArticle, article_id: 5 },
  { ...mockArticle, article_id: 6 },
];
describe("HomePage", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  const setupLoadedPage = () => {
    useArticleList
      .mockReturnValueOnce({
        articles: mockArticles,
        loading: false,
      })
      .mockReturnValueOnce({
        articles: mockArticles,
        loading: false,
      })
      .mockReturnValueOnce({
        articles: [mockArticle],
        loading: false,
      });

    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>,
    );
  };

  test("renders homepage", () => {
    setupLoadedPage();

    expect(screen.getByTestId("home-page")).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Home" })).toBeInTheDocument();
  });

  test("calls useArticleList with correct arguments", () => {
    setupLoadedPage();

    expect(useArticleList).toHaveBeenNthCalledWith(
      1,
      undefined,
      "votes",
      "desc",
    );

    expect(useArticleList).toHaveBeenNthCalledWith(
      2,
      undefined,
      "comment_count",
      "desc",
    );

    expect(useArticleList).toHaveBeenNthCalledWith(
      3,
      undefined,
      "created_at",
      "desc",
    );
  });

  test("renders loading component while loading", () => {
    useArticleList
      .mockReturnValueOnce({
        articles: [],
        loading: true,
      })
      .mockReturnValueOnce({
        articles: [],
        loading: false,
      })
      .mockReturnValueOnce({
        articles: [],
        loading: false,
      });

    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>,
    );

    expect(screen.getByLabelText(/loading.../i)).toBeInTheDocument();
  });

  test("renders feature card with newest article", () => {
    setupLoadedPage();

    expect(screen.getByTestId("home-feature-card")).toBeInTheDocument();
  });

  test("renders five most liked cards", () => {
    setupLoadedPage();

    const cards = screen.getAllByTestId("home-highlight-votes-card");

    expect(cards).toHaveLength(5);
  });

  test("renders most liked section", () => {
    setupLoadedPage();

    expect(
      screen.getByRole("heading", {
        name: /most liked/i,
      }),
    ).toBeInTheDocument();

    expect(screen.getByText("#1 Most Liked")).toBeInTheDocument();
  });

  test("renders most commented section", () => {
    setupLoadedPage();

    expect(
      screen.getByRole("heading", {
        name: /most comments/i,
      }),
    ).toBeInTheDocument();

    expect(screen.getByText("#1 Most Comments")).toBeInTheDocument();
  });

  test("renders link to articles page", () => {
    setupLoadedPage();

    expect(screen.getByTestId("button-to-all-articles")).toHaveAttribute(
      "href",
      "/articles",
    );
  });

  test("does not render most liked cards when fewer than five articles are returned", () => {
    useArticleList
      .mockReturnValueOnce({
        articles: [mockArticles[0], mockArticles[1]],
        loading: false,
      })
      .mockReturnValueOnce({
        articles: [mockArticles],
        loading: false,
      })
      .mockReturnValueOnce({
        articles: [mockArticle],
        loading: false,
      });

    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>,
    );

    expect(screen.queryByText("#3 Most Liked")).not.toBeInTheDocument();
  });

  test("does not render most commented cards when fewer than five articles are returned", () => {
    useArticleList
      .mockReturnValueOnce({
        articles: [mockArticles],
        loading: false,
      })
      .mockReturnValueOnce({
        articles: [mockArticles[3], mockArticles[5]],
        loading: false,
      })
      .mockReturnValueOnce({
        articles: [mockArticle],
        loading: false,
      });

    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>,
    );

    expect(screen.queryByText("#1 Most Comments")).not.toBeInTheDocument();
  });
});
