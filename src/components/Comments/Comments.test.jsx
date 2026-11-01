import { render, screen } from "@testing-library/react";
import { Comments } from "./Comments";

describe("Comments component", () => {
  test("render a comment icon along with a number", () => {
    render(<Comments commentCount={1} />);
    const commentButton = screen.getByRole("button", {
      Name: "Current number of comments: 1",
    });
    const commentIcon = screen.getByTestId("commentBubble");
    const commentNumber = screen.getByRole("paragraph", {
      classname: "comment-count",
    });
    expect(commentButton).toBeInTheDocument();
    expect(commentIcon).toBeInTheDocument();
    expect(commentNumber).toHaveTextContent(1);
  });
});
