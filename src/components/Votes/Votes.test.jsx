import { render, screen } from "@testing-library/react";
import { Votes } from "./Votes";

describe("Votes component", () => {
  test("render a comment icon along with a number", () => {
    render(<Votes votes={3} />);
    const voteButton = screen.getByRole("button", {
      Name: "Current number of votes: 1",
    });
    const voteIcon = screen.getByTestId("votesHeart");
    const voteNumber = screen.getByRole("paragraph", {
      classname: "vote-count",
    });
    expect(voteButton).toBeInTheDocument();
    expect(voteIcon).toBeInTheDocument();
    expect(voteNumber).toHaveTextContent(3);
  });
});
