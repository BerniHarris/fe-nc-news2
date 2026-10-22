import { render, screen, waitFor } from "@testing-library/react";
import { describe, test, expect, vi, beforeEach } from "vitest";
import { ArticleListPage } from "./ArticleListPage";
import api, { get } from "../../../api";

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

    render(<ArticleListPage />);

    const cards = await screen.findAllByTestId("mock-article-card");
    expect(cards).toHaveLength(2);
    expect(cards[0]).toHaveTextContent("title");
    expect(cards[0]).not.toHaveTextContent("i'm a dog");
    expect(cards[1]).toHaveTextContent("i'm a dog");
    expect(cards[1]).not.toHaveTextContent("title");
  });

  test("correctly renders the empty state when no articles exist", async () => {
    get.mockResolvedValue({ articles: [] });

    render(<ArticleListPage />);

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

    render(<ArticleListPage />);

    await waitFor(() => {
      expect(screen.getByText(/Error: Network Error/i)).toBeInTheDocument();
    });
  });
  test("correctly renders loading message", async () => {
    get.mockImplementation(() => new Promise(() => {}));

    render(<ArticleListPage />);

    expect(screen.getByText(/loading.../i)).toBeInTheDocument();
  });
});

/* TODO 
- sort renders
- sort contains correct options
- sorts as should
- topic renders
- topic filters correctly
- topic renders correct cards
- order renders
- orders correcctly
- does it render if there are no articles?
*/
