import { render, screen } from "@testing-library/react";
import { describe, test, expect } from "vitest";
import { MemoryRouter } from "react-router";
import { FeatureCard } from "./FeatureCard";

describe("FeatureCard", () => {
  const mockArticle = (topic = "coding") => {
    return {
      article_id: 199,
      article_img_url: "https://image.com",
      author: "berni",
      created_at: "2009-06-15T13:45:30.0000000Z",
      topic: topic,
      title: "Test Article",
    };
  };

  test("renders a feature card", () => {
    render(
      <MemoryRouter>
        <FeatureCard article={mockArticle()} />
      </MemoryRouter>,
    );

    expect(screen.getByTestId("home-feature-card")).toBeInTheDocument();
  });

  test("renders article information", () => {
    render(
      <MemoryRouter>
        <FeatureCard article={mockArticle()} />
      </MemoryRouter>,
    );

    expect(screen.getByText("Test Article")).toBeInTheDocument();
    expect(screen.getByTestId("author")).toHaveTextContent("By berni");
    expect(screen.getByText("coding")).toBeInTheDocument();
    expect(screen.getByText("New!")).toBeInTheDocument();
  });

  test("renders the image correctly", () => {
    render(
      <MemoryRouter>
        <FeatureCard article={mockArticle()} />
      </MemoryRouter>,
    );

    const image = screen.getByRole("img");

    expect(image).toHaveAttribute("src", "https://image.com");
    expect(image).toHaveAttribute("alt", "Test Article");
  });

  test("links to the article page", () => {
    render(
      <MemoryRouter>
        <FeatureCard article={mockArticle()} />
      </MemoryRouter>,
    );

    expect(screen.getByTestId("home-feature-card")).toHaveAttribute(
      "href",
      "/articles/199",
    );
  });

  test("renders coding topic colour", () => {
    render(
      <MemoryRouter>
        <FeatureCard article={mockArticle()} />
      </MemoryRouter>,
    );

    const topic = screen.getByText("coding");

    expect(topic).toHaveStyle({
      backgroundColor: "#f7b0be",
    });
  });

  test("renders cooking topic colour", () => {
    render(
      <MemoryRouter>
        <FeatureCard article={mockArticle("cooking")} />
      </MemoryRouter>,
    );

    const topic = screen.getByText("cooking");

    expect(topic).toHaveStyle({
      backgroundColor: "#3e91c1",
    });
  });

  test("renders football topic colour", () => {
    render(
      <MemoryRouter>
        <FeatureCard article={mockArticle("football")} />
      </MemoryRouter>,
    );

    const topic = screen.getByText("football");

    expect(topic).toHaveStyle({
      backgroundColor: "#fe673a",
    });
  });

  test("renders default colour for unknown topics", () => {
    render(
      <MemoryRouter>
        <FeatureCard article={mockArticle("unknown")} />
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
        <FeatureCard />
      </MemoryRouter>,
    );

    expect(container.firstChild).toBeNull();
  });
});
