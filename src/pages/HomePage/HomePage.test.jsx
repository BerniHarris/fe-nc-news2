import { render, screen } from "@testing-library/react";
import { describe, test, expect, vi, beforeEach } from "vitest";
import { MemoryRouter } from "react-router";

import { HomePage } from "./HomePage";
import { useHomePageArticles } from "../../hooks/useArticles/useArticles";

vi.mock("../../hooks/useArticles/useArticles", () => ({
  useHomePageArticles: vi.fn(),
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
    useHomePageArticles.mockReturnValue({
      topFiveLiked: mockArticles.slice(0, 5),
      topFiveCommented: mockArticles.slice(0, 5),
      newestArticle: mockArticle,
      loading: false,
      error: null,
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

  test("renders loading component while loading", () => {
    useHomePageArticles.mockReturnValue({
      topFiveLiked: [],
      topFiveCommented: [],
      newestArticle: undefined,
      loading: true,
      error: null,
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
      screen.getByRole("heading", { name: /most liked/i }),
    ).toBeInTheDocument();

    expect(screen.getByText("#1 Most Liked")).toBeInTheDocument();
  });

  test("renders most commented section", () => {
    setupLoadedPage();

    expect(
      screen.getByRole("heading", { name: /most comments/i }),
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
    useHomePageArticles.mockReturnValue({
      topFiveLiked: mockArticles.slice(0, 2),
      topFiveCommented: mockArticles.slice(0, 5),
      newestArticle: mockArticle,
      loading: false,
      error: null,
    });

    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>,
    );

    expect(screen.queryByText("#3 Most Liked")).not.toBeInTheDocument();
  });

  test("does not render most commented cards when fewer than five articles are returned", () => {
    useHomePageArticles.mockReturnValue({
      topFiveLiked: mockArticles.slice(0, 5),
      topFiveCommented: mockArticles.slice(0, 2),
      newestArticle: mockArticle,
      loading: false,
      error: null,
    });

    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>,
    );

    expect(screen.queryByText("#1 Most Comments")).not.toBeInTheDocument();
  });

  test("correctly renders error UI when the network request fails", () => {
    useHomePageArticles.mockReturnValue({
      topFiveLiked: [],
      topFiveCommented: [],
      newestArticle: undefined,
      loading: false,
      error: "Network Error",
    });

    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>,
    );

    expect(screen.getByText(/Network Error/i)).toBeInTheDocument();
  });
});
