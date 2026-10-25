import { render, screen } from "@testing-library/react";
import { CustomDropdown } from "./CustomDropdown";
import selectEvent from "react-select-event";

describe("CustomDropdown", () => {
  const mockOptions = [
    { value: "fake", label: "Fake" },
    { value: "notReal", label: "Not Real" },
    { value: "imagined", label: "Imagined" },
  ];

  const mockProps = {
    id: "topic",
    label: "Topic",
    options: mockOptions,
    placeholder: "Choose a topic",
    onChange: vi.fn(),
  };

  test("expect drop down to render", () => {
    render(<CustomDropdown {...mockProps} />);

    expect(screen.getByLabelText("Topic")).toBeInTheDocument();
    expect(screen.getByText("Choose a topic")).toBeInTheDocument();
  });

  test("expect onChange to select the correct value when an option is selected", async () => {
    render(<CustomDropdown {...mockProps} />);

    const dropdownLabel = screen.getByLabelText("Topic");

    await selectEvent.select(dropdownLabel, "Fake");
    expect(mockProps.onChange).toHaveBeenCalledTimes(1);
    expect(mockProps.onChange).toHaveBeenCalledWith({
      target: { value: "fake" },
    });
  });

  test("expect onChange to be called with an empty string when clear button is clicked", async () => {
    render(<CustomDropdown {...mockProps} />);

    const dropdownLabel = screen.getByLabelText("Topic");

    await selectEvent.select(dropdownLabel, "Imagined");

    mockProps.onChange.mockClear();

    await selectEvent.clearAll(dropdownLabel);

    expect(mockProps.onChange).toHaveBeenCalledTimes(1);
    expect(mockProps.onChange).toHaveBeenCalledWith({
      target: { value: "" },
    });
  });
});
