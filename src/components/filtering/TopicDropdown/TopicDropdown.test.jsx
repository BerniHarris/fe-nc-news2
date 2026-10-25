import { render, screen } from "@testing-library/react";
import { TopicDropdown } from "./TopicDropdown";
import selectEvent from "react-select-event";
import { expect } from "vitest";

describe("TopicDropdown", () => {
  test("expect drop down to render", async () => {
    render(<TopicDropdown />);

    expect(screen.getByLabelText("Topic:")).toBeInTheDocument();
    expect(screen.getByText("Choose a topic")).toBeInTheDocument();
  });

  test("the correct number of options to render", async () => {
    render(<TopicDropdown />);

    const dropdownLabel = screen.getByLabelText(/topic:/i);

    selectEvent.openMenu(dropdownLabel);

    const options = await screen.findAllByRole("option");
    expect(options).toHaveLength(3);
    expect(options[0]).toHaveTextContent("Coding");
    expect(options[1]).toHaveTextContent("Cooking");
    expect(options[2]).toHaveTextContent("Football");
  });
});
