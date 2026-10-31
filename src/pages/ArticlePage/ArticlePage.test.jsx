import {
  render,
  screen,
  waitFor,
  within,
  fireEvent,
} from "@testing-library/react";
import { describe, test, expect, vi, beforeEach } from "vitest";
import { ArticlePage } from "./ArticlePage";
import api, { get, post } from "../../../api";
import { MemoryRouter } from "react-router";
import App from "../../App";

vi.mock("../../components/ArticleCard/ArticleCard", () => {
  return {
    ArticleCard: ({ article }) => (
      <div data-testid="mock-article-card">{article?.title}</div>
    ),
  };
});

vi.mock("../../components/CommentCard/CommentCard", () => {
  return {
    CommentCard: ({ comment }) => (
      <div data-testid="mock-comment-card">{comment?.body}</div>
    ),
  };
});

vi.mock("../../../api", () => {
  const mockGet = vi.fn();
  const mockPost = vi.fn();
  return {
    get: mockGet,
    post: mockPost,
    default: {
      get: mockGet,
      get: mockPost,
    },
  };
});

describe("ArticlePage", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("Page rendering with valid article and existing comments", () => {
    const setup = () => {
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
      const mockComments = [
        {
          body: "here is a comment",
          author: "Berni",
          votes: 4,
          created_at: "2009-06-15T13:45:30.0000000Z",
          article_id: 15,
          comment_id: 2,
        },
        {
          body: "here is another comment",
          author: "Otis",
          votes: 11,
          created_at: "2009-07-15T13:45:30.0000000Z",
          article_id: 15,
          comment_id: 3,
        },
      ];

      const mockPostComment = {
        body: "this is a new comment",
        author: "Otis",
        votes: 0,
        created_at: "2009-07-18T13:45:30.0000000Z",
        article_id: 15,
        comment_id: 4,
      };

      get.mockResolvedValue({ article: mockArticle });

      get.mockResolvedValue({ comments: mockComments });

      post.mockResolvedValue({ comment: mockPostComment });

      render(
        <MemoryRouter>
          <ArticlePage />
        </MemoryRouter>,
      );
    };
    test("correctly renders a single article", async () => {
      setup();

      const cards = await screen.findAllByTestId("mock-article-card");
      expect(cards).toHaveLength(1);
    });
    test("correctly renders a comment card list", async () => {
      setup();

      const article = await screen.findAllByTestId("mock-article-card");
      expect(article).toHaveLength(1);
      const comments = await screen.findAllByTestId("mock-comment-card");
      expect(comments).toHaveLength(2);
    });
    test("correctly updates the form and submits when filled in", async () => {
      setup();

      const form = await screen.findByRole("form", { name: /add a comment/i });
      expect(form).toBeInTheDocument();
      const formFields = within(form).getAllByRole("textbox");
      expect(formFields.length).toBe(2);
      const submitButton = within(form).getByRole("button", {
        type: "submit",
      });

      expect(formFields[0]).toHaveAttribute("id", "username");
      expect(formFields[1]).toHaveAttribute("id", "body");
      expect(submitButton).toBeInTheDocument();
    });
    test("allows form to be submitted and displays new comment at the top of the list", async () => {
      setup();

      const comments = await screen.findAllByTestId("mock-comment-card");
      expect(comments).toHaveLength(2);
      const username = await screen.findByLabelText("Username:");
      const comment = await screen.findByLabelText("Comment:");
      const submit = await screen.findByRole("button", {
        text: "Submit Comment",
      });
      fireEvent.change(username, { target: { value: "jessjelly" } });
      fireEvent.change(comment, {
        target: { value: "this is a test comment" },
      });
      fireEvent.click(submit);

      expect(screen.getByText(/loading.../i)).toBeInTheDocument();

      const updatedComments = await screen.findAllByTestId("mock-comment-card");

      expect(updatedComments).toHaveLength(3);
      expect(updatedComments[0]).toHaveTextContent("this is a new comment");
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
