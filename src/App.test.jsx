import { render, screen } from "@testing-library/react";
import { AuthProvider } from "./Context/AuthContext/AuthContext";
import { MemoryRouter } from "react-router";
import App from "./App";

describe("App", () => {
  const setup = (initialEntries) => {
    render(
      <AuthProvider>
        <MemoryRouter initialEntries={[initialEntries]}>
          <App />
        </MemoryRouter>
      </AuthProvider>,
    );
  };

  test("renders navbar", () => {
    render(
      <AuthProvider>
        <MemoryRouter>
          <App />
        </MemoryRouter>
      </AuthProvider>,
    );

    expect(screen.getByRole("navigation")).toBeInTheDocument();
  });

  test("renders HomePage at /", async () => {
    setup("/");

    expect(
      await screen.findByRole("heading", { name: /home/i }),
    ).toBeInTheDocument();
  });

  test("renders ArticleListPage at /articles", async () => {
    setup("/articles");

    expect(
      await screen.findByRole("heading", { name: /articles/i }),
    ).toBeInTheDocument();
  });

  test("renders ArticlePage at /articles/:article_id", async () => {
    setup("/articles/1");

    expect(await screen.findByTestId("article-card-1")).toBeInTheDocument();
  });

  test("renders TopicListPage at /Topics", async () => {
    setup("/topics");

    expect(
      await screen.findByRole("heading", { name: /topics/i }),
    ).toBeInTheDocument();
  });

  test("renders ErrorPage at invlaid routes", async () => {
    setup("/jibberish");

    expect(
      await screen.findByRole("heading", { name: /page not found/i }),
    ).toBeInTheDocument();
  });

  test("renders footer", () => {
    render(
      <AuthProvider>
        <MemoryRouter>
          <App />
        </MemoryRouter>
      </AuthProvider>,
    );

    expect(screen.getByTestId("footer")).toBeInTheDocument();
  });
});
