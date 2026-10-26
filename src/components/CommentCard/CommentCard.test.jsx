import { render, screen, within } from "@testing-library/react";
import { CommentCard } from "./CommentCard.jsx";
import { expect } from "vitest";
import { MemoryRouter } from "react-router";

describe("CommentCard", () => {
  describe("correctly renders when passed a valid article_id", () => {
    const comment = {
      body: "here is a comment",
      author: "Berni",
      votes: 4,
      created_at: "2009-06-15T13:45:30.0000000Z",
      article_id: 1,
      comment_id: 2,
    };

    const setup = () => {
      render(
        <MemoryRouter initialEntries={["/articles/1/comments"]}>
          <CommentCard comment={comment} />
        </MemoryRouter>,
      );
    };
    test("renders an comment card", async () => {
      setup();
      const card = screen.getByTestId("comment-card-2");
      expect(card).toBeInTheDocument();
    });
    test("renders all elements", () => {
      setup();
      const commentText = screen.getByText("here is a comment");
      const author = screen.getByText(/by berni/i);
      const date = screen.getByRole("time");
      const votes = screen.getByRole("button", {
        name: "Current votes: 4",
      });

      expect(commentText).toBeInTheDocument();
      expect(author).toBeInTheDocument();
      expect(date).toHaveTextContent("Monday, 15 June 2009");
      expect(votes).toBeInTheDocument();
    });
    test("renders correct number of votes and icon", () => {
      setup();
      const votes = screen.getByTestId("votes");
      const voteNum = within(votes).getByText("4");
      const voteIcon = within(votes).getByTestId("votesHeart");

      expect(voteNum).toBeInTheDocument();
      expect(voteIcon).toBeInTheDocument();
    });
    test("renders nothing when comment is undefined", () => {
      render(<CommentCard comment={undefined} />);
      expect(screen.queryByTestId("comment-card")).not.toBeInTheDocument();
    });
  });
});
