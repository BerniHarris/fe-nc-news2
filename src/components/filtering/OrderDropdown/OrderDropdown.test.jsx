import { render, screen } from "@testing-library/react";
import { OrderDropdown } from "./OrderDopdown";
import selectEvent from "react-select-event";
import { expect } from "vitest";

describe("OrderDropdown", () => {
  test("expect drop down to render", async () => {
    render(<OrderDropdown />);

    expect(screen.getByLabelText("Order:")).toBeInTheDocument();
    expect(screen.getByText("Order")).toBeInTheDocument();
  });

  test("the correct number of options to render", async () => {
    render(<OrderDropdown />);

    const dropdownLabel = screen.getByLabelText(/order:/i);

    selectEvent.openMenu(dropdownLabel);

    const options = await screen.findAllByRole("option");
    expect(options).toHaveLength(2);
    expect(options[0]).toHaveTextContent("ASC");
    expect(options[1]).toHaveTextContent("DESC");
  });
});
