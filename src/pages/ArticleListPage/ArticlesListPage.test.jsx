import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter, useLocation } from "react-router";
import { ArticleListPage } from "./ArticleListPage";
import { useArticleList } from "../../hooks/articleHooks/articleHooks";

vi.mock("../../hooks/articleHooks/articleHooks", () => ({
  useArticleList: vi.fn(),
}));

vi.mock("../../components/ArticleSummaryCard/ArticleSummaryCard", () => ({
  ArticleSummaryCard: ({ article }) => (
    <article data-testid="article-card">
      <h2>{article.title}</h2>
    </article>
  ),
}));

vi.mock("../../components/filtering/TopicDropdown/TopicDropdown", () => ({
  TopicDropdown: ({ value, label, onChange }) => (
    <select
      aria-label={label}
      data-testid="topic-dropdown"
      value={value}
      onChange={onChange}
    >
      <option value="">All topics</option>
      <option value="technology">Technology</option>
      <option value="science">Science</option>
    </select>
  ),
}));

vi.mock("../../components/filtering/SortDropdown/SortDropdown", () => ({
  SortDropdown: ({ value, label, onChange }) => (
    <select
      aria-label={label}
      data-testid="sort-dropdown"
      value={value || ""}
      onChange={onChange}
    >
      <option value="">Default</option>
      <option value="created_at">Date</option>
      <option value="title">Title</option>
    </select>
  ),
}));

vi.mock("../../components/filtering/OrderDropdown/OrderDopdown", () => ({
  OrderDropdown: ({ valu, label, onChange }) => (
    <select
      aria-label={label}
      data-testid="order-dropdown"
      value={valu || ""}
      onChange={onChange}
    >
      <option value="">Default</option>
      <option value="asc">Ascending</option>
      <option value="desc">Descending</option>
    </select>
  ),
}));

const LocationDisplay = () => {
  const location = useLocation();

  return <p data-testid="current-search">{location.search}</p>;
};

const mockArticles = [
  {
    article_id: 1,
    title: "First Article",
  },
  {
    article_id: 2,
    title: "Second Article",
  },
];

const renderPage = (initialEntry = "/articles") => {
  return render(
    <MemoryRouter initialEntries={[initialEntry]}>
      <ArticleListPage />
      <LocationDisplay />
    </MemoryRouter>,
  );
};

describe("ArticleListPage", () => {
  beforeEach(() => {
    vi.clearAllMocks();

    useArticleList.mockReturnValue({
      articles: mockArticles,
      loading: false,
      error: null,
    });
  });

  it("renders the page with the Articles heading", () => {
    renderPage();

    expect(
      screen.getByRole("heading", {
        name: "Articles",
        level: 1,
      }),
    ).toBeInTheDocument();
  });

  it("renders the loading message while articles are loading", () => {
    useArticleList.mockReturnValue({
      articles: [],
      loading: true,
      error: null,
    });

    renderPage();

    expect(screen.getByText("Loading...")).toBeInTheDocument();
    expect(screen.queryByTestId("article-list-page")).not.toBeInTheDocument();
  });

  it("renders an error message when the hook returns an Error", () => {
    useArticleList.mockReturnValue({
      articles: [],
      loading: false,
      error: new Error("Failed to fetch articles"),
    });

    renderPage();

    expect(
      screen.getByText("Error: Failed to fetch articles"),
    ).toBeInTheDocument();
  });

  it("renders an error message when the hook returns a string error", () => {
    useArticleList.mockReturnValue({
      articles: [],
      loading: false,
      error: "Something went wrong",
    });

    renderPage();

    expect(screen.getByText("Error: Something went wrong")).toBeInTheDocument();
  });

  it("renders all article cards when articles are available", () => {
    renderPage();

    expect(screen.getAllByTestId("article-card")).toHaveLength(2);
    expect(
      screen.getByRole("heading", { name: "First Article" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Second Article" }),
    ).toBeInTheDocument();
  });

  it("renders a message when there are no articles", () => {
    useArticleList.mockReturnValue({
      articles: [],
      loading: false,
      error: null,
    });

    renderPage();

    expect(screen.getByTestId("no-articles")).toHaveTextContent(
      "No articles found.",
    );
    expect(screen.queryAllByTestId("article-card")).toHaveLength(0);
  });

  it("renders a message when articles is undefined", () => {
    useArticleList.mockReturnValue({
      articles: undefined,
      loading: false,
      error: null,
    });

    renderPage();

    expect(screen.getByTestId("no-articles")).toBeInTheDocument();
  });

  it("uses the topic parameter to create the page heading", () => {
    renderPage("/articles?topic=technology");

    expect(
      screen.getByRole("heading", {
        name: "Technology Articles",
        level: 1,
      }),
    ).toBeInTheDocument();
  });

  it("passes the URL parameters to useArticleList", () => {
    renderPage("/articles?topic=science&sort_by=title&order=desc");

    expect(useArticleList).toHaveBeenCalledWith("science", "title", "desc");
  });

  it("uses default values when URL parameters are missing", () => {
    renderPage("/articles");

    expect(useArticleList).toHaveBeenCalledWith("", undefined, undefined);
  });

  it("renders the dropdowns with values from the URL", () => {
    renderPage("/articles?topic=science&sort_by=title&order=desc");

    expect(screen.getByTestId("topic-dropdown")).toHaveValue("science");
    expect(screen.getByTestId("sort-dropdown")).toHaveValue("title");
    expect(screen.getByTestId("order-dropdown")).toHaveValue("desc");
  });

  it("updates the topic search parameter when the topic changes", () => {
    renderPage("/articles");

    fireEvent.change(screen.getByTestId("topic-dropdown"), {
      target: { value: "technology" },
    });

    expect(screen.getByTestId("current-search")).toHaveTextContent(
      "topic=technology",
    );
  });

  it("updates the sort_by search parameter when sorting changes", () => {
    renderPage("/articles");

    fireEvent.change(screen.getByTestId("sort-dropdown"), {
      target: { value: "title" },
    });

    expect(screen.getByTestId("current-search")).toHaveTextContent(
      "sort_by=title",
    );
  });

  it("updates the order search parameter when the order changes", () => {
    renderPage("/articles");

    fireEvent.change(screen.getByTestId("order-dropdown"), {
      target: { value: "desc" },
    });

    expect(screen.getByTestId("current-search")).toHaveTextContent(
      "order=desc",
    );
  });

  it("removes the topic parameter when the topic is cleared", () => {
    renderPage("/articles?topic=science");

    fireEvent.change(screen.getByTestId("topic-dropdown"), {
      target: { value: "" },
    });

    expect(screen.getByTestId("current-search")).toHaveTextContent("");
  });

  it("removes the sort_by parameter when sorting is cleared", () => {
    renderPage("/articles?sort_by=title");

    fireEvent.change(screen.getByTestId("sort-dropdown"), {
      target: { value: "" },
    });

    expect(screen.getByTestId("current-search")).toHaveTextContent("");
  });

  it("preserves other search parameters when one parameter changes", () => {
    renderPage("/articles?topic=science&sort_by=title&order=desc");

    fireEvent.change(screen.getByTestId("topic-dropdown"), {
      target: { value: "technology" },
    });

    const params = new URLSearchParams(
      screen.getByTestId("current-search").textContent,
    );

    expect(params.get("topic")).toBe("technology");
    expect(params.get("sort_by")).toBe("title");
    expect(params.get("order")).toBe("desc");
  });

  it("prevents the form from submitting and reloading the page", () => {
    renderPage();

    const form = document.querySelector(".organise-articles");
    const event = new Event("submit", {
      bubbles: true,
      cancelable: true,
    });

    form.dispatchEvent(event);

    expect(event.defaultPrevented).toBe(true);
  });
});
