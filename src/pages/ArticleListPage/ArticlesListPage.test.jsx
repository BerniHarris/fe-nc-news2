import { render, screen, waitFor } from "@testing-library/react";
import { describe, test, expect, vi, beforeEach } from "vitest";
import { ArticleListPage } from "./ArticleListPage";
import api, { get } from "../../../api";
import { MemoryRouter } from "react-router";
import App from "../../App";

vi.mock("../../components/ArticleSummaryCard/ArticleSummaryCard", () => {
  return {
    ArticleSummaryCard: ({ article }) => (
      <div data-testid="mock-article-card">{article?.title}</div>
    ),
  };
});

vi.mock("../../../api", () => {
  const mockGet = vi.fn();
  return {
    get: mockGet,
    default: {
      get: mockGet,
    },
  };
});

describe("ArticlesListPage", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("Page rendering", () => {
    test("correctly renders a list of articles", async () => {
      const mockArticles = [
        {
          article_id: 1,
          title: "title",
          author: "Berni",
          topic: "coding",
          votes: 0,
          comment_count: 0,
        },
        {
          article_id: 2,
          title: "i'm a dog",
          author: "Otis",
          topic: "cooking",
          votes: 0,
          comment_count: 0,
        },
      ];

      get.mockResolvedValue({ articles: mockArticles });

      render(
        <MemoryRouter>
          <ArticleListPage />
        </MemoryRouter>,
      );

      const cards = await screen.findAllByTestId("mock-article-card");
      expect(cards).toHaveLength(2);
      expect(cards[0]).toHaveTextContent("title");
      expect(cards[0]).not.toHaveTextContent("i'm a dog");
      expect(cards[1]).toHaveTextContent("i'm a dog");
      expect(cards[1]).not.toHaveTextContent("title");
    });
    test("renders top navigation bar", () => {
      render(
        <MemoryRouter initialEntries={["/articles"]}>
          <App />
        </MemoryRouter>,
      );
      const navBar = screen.getByRole("navigation");
      const articlesLink = screen.getByRole("link", { name: /articles/i });
      const topicsLink = screen.getByRole("link", { name: /topics/i });
      const homeLink = screen.getByRole("link", { name: /home/i });

      expect(navBar).toBeInTheDocument();
      expect(articlesLink).toHaveClass("active-link");
      expect(articlesLink).toHaveAttribute("href", "/articles");
      expect(topicsLink).not.toHaveClass();
      expect(topicsLink).toHaveAttribute("href", "/topics");

      expect(homeLink).not.toHaveClass();
      expect(homeLink).toHaveAttribute("href", "/");
    });
  });
  test("correctly renders the empty state when no articles exist", async () => {
    get.mockResolvedValue({ articles: [] });

    render(
      <MemoryRouter>
        <ArticleListPage />
      </MemoryRouter>,
    );

    await waitFor(() => {
      expect(screen.getByTestId("article-list-page")).toBeInTheDocument();
    });
    expect(screen.queryByTestId("mock-article-card")).not.toBeInTheDocument();
    expect(screen.getByTestId("no-articles")).toHaveTextContent(
      "No articles found.",
    );
  });
  test("correctly renders error UI when the network request fails", async () => {
    get.mockRejectedValue("Network Error");

    render(
      <MemoryRouter>
        <ArticleListPage />
      </MemoryRouter>,
    );

    await waitFor(() => {
      expect(screen.getByText(/Error: Network Error/i)).toBeInTheDocument();
    });
  });
  test("correctly renders loading message", async () => {
    get.mockImplementation(() => new Promise(() => {}));

    render(
      <MemoryRouter>
        <ArticleListPage />
      </MemoryRouter>,
    );

    expect(screen.getByText(/loading.../i)).toBeInTheDocument();
  });
});
