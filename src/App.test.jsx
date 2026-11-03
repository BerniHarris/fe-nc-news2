import { render, screen } from "@testing-library/react";

import { MemoryRouter } from "react-router";
import App from "./App";

describe("App", () => {
  test("renders navbar", () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );

    expect(screen.getByRole("navigation")).toBeInTheDocument();
  });
  test("renders ArticleListPage at /", async () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <App />
      </MemoryRouter>,
    );

    expect(
      await screen.findByRole("heading", { name: /articles/i }),
    ).toBeInTheDocument();
  });

  test("renders ArticleListPage at /articles", async () => {
    render(
      <MemoryRouter initialEntries={["/articles"]}>
        <App />
      </MemoryRouter>,
    );

    expect(
      await screen.findByRole("heading", { name: /articles/i }),
    ).toBeInTheDocument();
  });

  test("renders ArticlePage at /articles/:article_id", async () => {
    render(
      <MemoryRouter initialEntries={["/articles/1"]}>
        <App />
      </MemoryRouter>,
    );

    expect(await screen.findByTestId("article-card-1")).toBeInTheDocument();
  });
  test("renders TopicListPage at /Topics", async () => {
    render(
      <MemoryRouter initialEntries={["/topics"]}>
        <App />
      </MemoryRouter>,
    );

    expect(
      await screen.findByRole("heading", { name: /topics/i }),
    ).toBeInTheDocument();
  });

  test("renders PageNotFound at invlaid routes", async () => {
    render(
      <MemoryRouter initialEntries={["/jibberish"]}>
        <App />
      </MemoryRouter>,
    );

    expect(
      await screen.findByRole("heading", { name: /page not found/i }),
    ).toBeInTheDocument();
  });
});
