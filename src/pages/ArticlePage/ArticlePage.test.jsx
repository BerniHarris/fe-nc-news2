import {
  render,
  screen,
  waitFor,
  within,
  fireEvent,
} from "@testing-library/react";
import { describe, test, expect, vi, beforeEach } from "vitest";
import { ArticlePage } from "./ArticlePage";
import api, { get, post, deleteReq, patch } from "../../../api";
import { MemoryRouter, Routes, Route } from "react-router";

vi.mock("../../../api", () => {
  const mockGet = vi.fn();
  const mockPost = vi.fn();
  const mockDelete = vi.fn();
  const mockPatch = vi.fn();

  return {
    get: mockGet,
    post: mockPost,
    deleteReq: mockDelete,
    patch: mockPatch,

    default: {
      get: mockGet,
      post: mockPost,
      deleteReq: mockDelete,
      patch: mockPatch,
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
        article_img_url: "://animage.com",
        body: "very interesting",
        created_at: "2009-06-15T13:45:30.0000000Z",
      };

      const mockComments = [
        {
          body: "here is a comment",
          author: "Berni",
          votes: 4,
          created_at: "2009-06-15T13:45:30.0000000Z",
          article_id: 199,
          comment_id: 2,
        },
        {
          body: "here is another comment",
          author: "Otis",
          votes: 11,
          created_at: "2009-07-15T13:45:30.0000000Z",
          article_id: 199,
          comment_id: 3,
        },
      ];

      const mockPostComment = {
        body: "this is a new comment",
        author: "Otis",
        votes: 0,
        created_at: "2009-07-18T13:45:30.0000000Z",
        article_id: 199,
        comment_id: 4,
      };

      get.mockImplementation((url) => {
        if (url.includes("/comments")) {
          return Promise.resolve({ comments: mockComments });
        }
        if (url.includes("/articles/")) {
          return Promise.resolve({ article: mockArticle });
        }
        return Promise.reject(new Error(`Unhandled URL request: ${url}`));
      });

      post.mockResolvedValue({ comment: mockPostComment });
      deleteReq.mockResolvedValue({});

      render(
        <MemoryRouter initialEntries={["/articles/199"]}>
          <Routes>
            <Route path="/articles/:article_id" element={<ArticlePage />} />
          </Routes>
        </MemoryRouter>,
      );
    };
    test("correctly renders a single article", async () => {
      setup();
      const cards = await screen.findAllByTestId("article-card-199");
      expect(cards).toHaveLength(1);
    });
    test("correctly renders up and down vote buttons", async () => {
      setup();
      const voteButtons = await screen.findAllByTestId("votes-container");
      const upvote = within(voteButtons[0]).getByTestId("upvote");
      const voteCount = within(voteButtons[0]).getByTestId("vote-count");
      const downvote = within(voteButtons[0]).getByTestId("downvote");

      expect(upvote).toBeInTheDocument();
      expect(voteCount).toHaveTextContent(0);
      expect(downvote).toBeInTheDocument();

      fireEvent.click(upvote);
      expect(voteCount).toHaveTextContent(1);
      fireEvent.click(downvote);
      expect(voteCount).toHaveTextContent(0);
    });
    test("correctly renders a comment card list", async () => {
      setup();

      const article = await screen.findAllByTestId("article-card-199");
      expect(article).toHaveLength(1);
      const comments = await screen.findAllByTestId("comment-body-wrapper");
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

      const comments = await screen.findAllByTestId("comment-body-wrapper");
      expect(comments).toHaveLength(2);
      const username = await screen.findByLabelText("Username:");
      const comment = await screen.findByLabelText("Comment:");
      const submit = await screen.findByTestId("submit-button");
      expect(submit).toHaveTextContent(/submit comment/i);
      fireEvent.change(username, { target: { value: "jessjelly" } });
      fireEvent.change(comment, {
        target: { value: "this is a test comment" },
      });
      fireEvent.click(submit);

      expect(screen.getByText(/loading.../i)).toBeInTheDocument();

      const updatedComments = await screen.findAllByTestId(
        "comment-body-wrapper",
      );

      expect(updatedComments).toHaveLength(3);
      expect(updatedComments[0]).toHaveTextContent("this is a new comment");
    });
    test("renders a delete buttons on each comment card", async () => {
      setup();

      const deleteButtons = await screen.findAllByTestId(
        "delete-comment-button",
      );
      expect(deleteButtons).toHaveLength(2);
      const commentCardOne = await screen.findByTestId("comment-card-2");
      const commentCardTwo = await screen.findByTestId("comment-card-3");
      const deleteButtonOne = within(commentCardOne).getByTestId(
        "delete-comment-button",
      );
      const deleteButtonTwo = within(commentCardTwo).getByTestId(
        "delete-comment-button",
      );

      expect(deleteButtonOne).toHaveRole("button");
      expect(deleteButtonTwo).toHaveRole("button");
    });

    test("should delete comment when delete comment button is clicked", async () => {
      setup();
      const commentCount = await screen.findByTestId("comment-count");
      expect(commentCount).toHaveTextContent(2);
      const comments = await screen.findAllByTestId("comment-body-wrapper");
      expect(comments).toHaveLength(2);
      const deleteButtons = await screen.findAllByTestId(
        "delete-comment-button",
      );
      expect(deleteButtons).toHaveLength(2);
      fireEvent.click(deleteButtons[0]);
      waitFor(async () => {
        await screen.findAllByTestId("comment-body-wrapper").toHaveLength(1);
      });

      const commentCountAfterDelete =
        await screen.findByTestId("comment-count");
      expect(commentCountAfterDelete).toHaveTextContent(1);
    });
  });

  test("correctly renders error UI when the network request fails", async () => {
    get.mockRejectedValue("Network Error");

    render(
      <MemoryRouter initialEntries={["/articles/199"]}>
        <Routes>
          <Route path="/articles/:article_id" element={<ArticlePage />} />
        </Routes>
      </MemoryRouter>,
    );

    await waitFor(() => {
      expect(screen.getByText(/Error: Network Error/i)).toBeInTheDocument();
    });
  });

  test("correctly renders loading message", async () => {
    get.mockImplementation(() => new Promise(() => {}));

    render(
      <MemoryRouter initialEntries={["/articles/199"]}>
        <Routes>
          <Route path="/articles/:article_id" element={<ArticlePage />} />
        </Routes>
      </MemoryRouter>,
    );

    expect(screen.getByText(/loading.../i)).toBeInTheDocument();
  });
});
