import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { describe, test, expect } from "vitest";

import { HomeHighlightCard } from "./HomeHighlightCard";

describe("HomeHighlightCard", () => {
  const mockArticle = {
    article_id: 199,
    article_img_url: "https://image.com",
    title: "Test Article",
    topic: "coding",
    votes: 10,
    comment_count: 5,
  };

  test("renders a highlight card", () => {
    render(
      <MemoryRouter>
        <HomeHighlightCard
          article={mockArticle}
          highlighting="votes"
          badgeText="Popular"
        />
      </MemoryRouter>,
    );

    expect(screen.getByTestId("home-highlight-votes-card")).toBeInTheDocument();
  });

  test("renders article information correctly", () => {
    render(
      <MemoryRouter>
        <HomeHighlightCard
          article={mockArticle}
          highlighting="votes"
          badgeText="Popular"
        />
      </MemoryRouter>,
    );

    expect(screen.getByText("Test Article")).toBeInTheDocument();
    expect(screen.getByText("coding")).toBeInTheDocument();
    expect(screen.getByText("Popular")).toBeInTheDocument();
  });

  test("renders the image correctly", () => {
    render(
      <MemoryRouter>
        <HomeHighlightCard
          article={mockArticle}
          highlighting="votes"
          badgeText="Popular"
        />
      </MemoryRouter>,
    );

    const image = screen.getByRole("img");

    expect(image).toHaveAttribute("src", "https://image.com");
  });

  test("links to the correct article page", () => {
    render(
      <MemoryRouter>
        <HomeHighlightCard
          article={mockArticle}
          highlighting="votes"
          badgeText="Popular"
        />
      </MemoryRouter>,
    );

    expect(screen.getByTestId("home-highlight-votes-card")).toHaveAttribute(
      "href",
      "/articles/199",
    );
  });

  test("renders votes when highlighting is votes", () => {
    render(
      <MemoryRouter>
        <HomeHighlightCard
          article={mockArticle}
          highlighting="votes"
          badgeText="Popular"
        />
      </MemoryRouter>,
    );

    expect(screen.getByTestId("vote-count")).toHaveTextContent("10");
    expect(screen.queryByTestId("downvote")).not.toBeInTheDocument();
  });

  test("renders comments when highlighting is comments", () => {
    render(
      <MemoryRouter>
        <HomeHighlightCard
          article={mockArticle}
          highlighting="comments"
          badgeText="Popular"
        />
      </MemoryRouter>,
    );

    expect(screen.getByTestId("comment-count")).toHaveTextContent("5");
  });

  test("renders coding topic colour", () => {
    render(
      <MemoryRouter>
        <HomeHighlightCard
          article={mockArticle}
          highlighting="votes"
          badgeText="Popular"
        />
      </MemoryRouter>,
    );

    const topic = screen.getByText("coding");

    expect(topic).toHaveStyle({
      backgroundColor: "#f7b0be",
    });
  });

  test("renders default topic colour for unknown topics", () => {
    render(
      <MemoryRouter>
        <HomeHighlightCard
          article={{
            ...mockArticle,
            topic: "unknown",
          }}
          highlighting="votes"
          badgeText="Popular"
        />
      </MemoryRouter>,
    );

    const topic = screen.getByText("unknown");

    expect(topic).toHaveStyle({
      backgroundColor: "#d3d3d3",
    });
  });

  test("renders nothing when article is undefined", () => {
    const { container } = render(
      <MemoryRouter>
        <HomeHighlightCard />
      </MemoryRouter>,
    );

    expect(container.firstChild).toBeNull();
  });
});
