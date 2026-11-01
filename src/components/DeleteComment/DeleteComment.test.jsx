import { fireEvent, render, screen } from "@testing-library/react";
import { vi } from "vitest";

import { DeleteComment } from "./DeleteComment";

describe("DeleteComment component", () => {
  test("renders a delete icon", () => {
    render(<DeleteComment handleDelete={vi.fn()} commentId={1} />);
    const deleteButton = screen.getByRole("button", {
      Name: "Delete comment_id: 1",
    });
    const deleteIcon = screen.getByTestId("delete-icon");

    expect(deleteButton).toBeInTheDocument();
    expect(deleteIcon).toBeInTheDocument();
  });
  test("triggers handleDelete prop when clicked", () => {
    const mockHandleDelete = vi.fn();
    render(<DeleteComment handleDelete={mockHandleDelete} commentId={1} />);
    const deleteButton = screen.getByRole("button", {
      Name: "Delete comment_id: 1",
    });

    fireEvent.click(deleteButton);

    expect(mockHandleDelete).toHaveBeenCalledTimes(1);
  });
  test("Doesn't render if handleDelete prop is missing", async () => {
    render(<DeleteComment handleDelete={null} commentId={1} />);
    const deleteButton = screen.queryByRole("button");
    expect(deleteButton).not.toBeInTheDocument();
  });
  test("Doesn't render if commentId prop is missing", () => {
    const mockHandleDelete = vi.fn();
    render(<DeleteComment handleDelete={mockHandleDelete} commentId={null} />);
    const deleteButton = screen.queryByRole("button");
    expect(deleteButton).not.toBeInTheDocument();
  });
});
