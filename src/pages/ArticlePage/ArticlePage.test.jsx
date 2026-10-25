import { render, screen, waitFor } from "@testing-library/react";
import { describe, test, expect, vi, beforeEach } from "vitest";
import { ArticlePage } from "./ArticlePage";
import api, { get } from "../../../api";
import { MemoryRouter } from "react-router";
import App from "../../App";

vi.mock("../../components/ArticleCard/ArticleCard", () => {
  return {
    ArticleCard: ({ article }) => (
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

describe("ArticlePage", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("Page rendering", () => {
    test("correctly renders a single article", async () => {
      const mockArticle = {
        title: "title",
        author: "berni",
        topic: "coding",
        votes: 0,
        comment_count: 2,
        article_id: 199,
        article_img_url: "www.animage.com",
        body: "very interesting",
        created_at: "2009-06-15T13:45:30.0000000Z",
      };

      get.mockResolvedValue({ article: mockArticle });

      render(
        <MemoryRouter>
          <ArticlePage />
        </MemoryRouter>,
      );

      const cards = await screen.findAllByTestId("mock-article-card");
      expect(cards).toHaveLength(1);
    });
    test("renders top navigation bar", async () => {
      render(
        <MemoryRouter initialEntries={["/articles"]}>
          <App />
        </MemoryRouter>,
      );

      const navBar = await screen.findByRole("navigation");
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

  test("correctly renders error UI when the network request fails", async () => {
    get.mockRejectedValue("Network Error");

    render(
      <MemoryRouter>
        <ArticlePage />
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
        <ArticlePage />
      </MemoryRouter>,
    );

    expect(screen.getByText(/loading.../i)).toBeInTheDocument();
  });
});
