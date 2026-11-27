import { render, screen } from "@testing-library/react";
import { SortDropdown } from "./SortDropdown";
import selectEvent from "react-select-event";
import { expect } from "vitest";

describe("SortDropdown", () => {
  test("expect drop down to render", async () => {
    render(<SortDropdown />);

    expect(screen.getByLabelText("Sort:")).toBeInTheDocument();
    expect(screen.getByText("Sort")).toBeInTheDocument();
  });

  test("the correct number of options to render", async () => {
    render(<SortDropdown />);

    const dropdownLabel = screen.getByLabelText(/sort:/i);

    selectEvent.openMenu(dropdownLabel);

    const options = await screen.findAllByRole("option");
    expect(options).toHaveLength(4);
    expect(options[0]).toHaveTextContent("Date Created");
    expect(options[1]).toHaveTextContent("Comments");
    expect(options[2]).toHaveTextContent("Votes");
    expect(options[3]).toHaveTextContent("Title");
  });
});
