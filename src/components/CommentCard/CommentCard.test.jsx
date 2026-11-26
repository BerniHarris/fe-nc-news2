import { render, screen, within } from "@testing-library/react";
import { CommentCard } from "./CommentCard.jsx";
import { beforeEach, describe, expect, test, vi } from "vitest";
import { MemoryRouter } from "react-router";
import { FEATURE_FLAGS } from "../../config/featureFlags.js";

vi.mock("../config/featureFlags", () => ({
  FEATURE_FLAGS: {
    ENABLE_COMMENT_VOTES: true,
  },
}));
describe("CommentCard", () => {
  beforeEach(() => {
    FEATURE_FLAGS.ENABLE_COMMENT_VOTES = true;
  });
  describe("correctly renders when passed a valid article_id", () => {
    const comment = {
      body: "here is a comment",
      author: "Berni",
      votes: 4,
      created_at: "2009-06-15T13:45:30.0000000Z",
      article_id: 1,
      comment_id: 2,
    };

    const userAvatar = "www.image.com";

    const mockHandleDelete = vi.fn();
    const setup = () => {
      render(
        <MemoryRouter initialEntries={["/articles/1/comments"]}>
          <CommentCard
            comment={comment}
            handleDelete={mockHandleDelete}
            userAvatar={userAvatar}
          />
        </MemoryRouter>,
      );
    };
    test("renders an comment card", async () => {
      setup();
      const card = screen.getByTestId("comment-card-2");
      expect(card).toBeInTheDocument();
    });
    test("renders all elements ENABLE_COMMENT_VOTES is true", () => {
      setup();
      const commentText = screen.getByText("here is a comment");
      const author = screen.getByText(/by berni/i);
      const date = screen.getByRole("time");
      const votes = screen.getByRole("button", {
        name: "Current votes: 4",
      });
      const deleteButton = screen.getByTestId("delete-comment-button");

      expect(commentText).toBeInTheDocument();
      expect(author).toBeInTheDocument();
      expect(date).toHaveTextContent("Monday, 15 June 2009");
      expect(votes).toBeInTheDocument();
      expect(deleteButton).toHaveRole("button");
    });
    test("renders correct number of votes and icon ENABLE_COMMENT_VOTES is true", () => {
      setup();
      const votes = screen.getByTestId("votes-container");
      const voteNum = within(votes).getByText("4");
      const voteIcon = within(votes).getByTestId("votesHeart");

      expect(voteNum).toBeInTheDocument();
      expect(voteIcon).toBeInTheDocument();
    });
    test("does not render comment votes if ENABLE_COMMENT_VOTES is false", () => {
      FEATURE_FLAGS.ENABLE_COMMENT_VOTES = false;
      setup();

      expect(screen.getByText("here is a comment")).toBeInTheDocument();
      expect(screen.getByText(/by berni/i)).toBeInTheDocument();
      expect(screen.getByRole("time")).toHaveTextContent(
        "Monday, 15 June 2009",
      );
      expect(screen.getByTestId("delete-comment-button")).toHaveRole("button");

      expect(
        screen.queryByRole("button", {
          name: "Current votes: 4",
        }),
      ).not.toBeInTheDocument();
    });
  });
  describe("CommentCard with missing props", () => {
    test("renders nothing when comment is undefined", () => {
      render(<CommentCard comment={undefined} handleDelete={vi.fn()} />);
      expect(screen.queryByTestId("comment-card")).not.toBeInTheDocument();
    });
    test("renders nothing when comment_id is undefined", () => {
      render(
        <CommentCard
          handleDelete={vi.fn()}
          comment={{
            body: "here is a comment",
            author: "Berni",
            votes: 4,
            created_at: "2009-06-15T13:45:30.0000000Z",
            article_id: 1,
          }}
        />,
      );
      expect(screen.queryByTestId("comment-card")).not.toBeInTheDocument();
    });
    test("renders comment information but no delete button when handleDelete not defined", () => {
      render(
        <CommentCard
          handleDelete={null}
          comment={{
            body: "here is a comment",
            author: "Berni",
            votes: 4,
            created_at: "2009-06-15T13:45:30.0000000Z",
            article_id: 1,
            comment_id: 2,
          }}
        />,
      );
      const commentText = screen.getByText("here is a comment");
      const author = screen.getByText(/by berni/i);
      const date = screen.getByRole("time");
      const votes = screen.getByRole("button", {
        name: "Current votes: 4",
      });
      const deleteButton = screen.queryByTestId("delete-comment-button");

      expect(commentText).toBeInTheDocument();
      expect(author).toBeInTheDocument();
      expect(date).toHaveTextContent("Monday, 15 June 2009");
      expect(votes).toBeInTheDocument();
      expect(deleteButton).not.toBeInTheDocument();
    });
  });
});
