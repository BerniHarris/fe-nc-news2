import { render, screen } from "@testing-library/react";
import { SortDropdown } from "./SortDropdown";
import selectEvent from "react-select-event";
import { expect } from "vitest";

describe("SortDropdown", () => {
  test("expect drop down to render", async () => {
    render(<SortDropdown />);

    expect(screen.getByLabelText("Sort:")).toBeInTheDocument();
    expect(screen.getByText("Choose How To Sort")).toBeInTheDocument();
  });

  test("the correct number of options to render", async () => {
    render(<SortDropdown />);

    const dropdownLabel = screen.getByLabelText(/sort:/i);

    selectEvent.openMenu(dropdownLabel);

    const options = await screen.findAllByRole("option");
    expect(options).toHaveLength(8);
    expect(options[0]).toHaveTextContent("Author");
    expect(options[1]).toHaveTextContent("Article ID");
    expect(options[2]).toHaveTextContent("Comments");
    expect(options[3]).toHaveTextContent("Date Created");
    expect(options[4]).toHaveTextContent("Image");
    expect(options[5]).toHaveTextContent("Title");
    expect(options[6]).toHaveTextContent("Topic");
    expect(options[7]).toHaveTextContent("Votes");
  });
});
