import { fireEvent, render, screen } from "@testing-library/react";
import { Footer } from "./Footer";
import { expect } from "vitest";

describe("Loading component", () => {
  test("footer render", () => {
    render(<Footer />);
    const footer = screen.getByTestId("footer");
    const githubIcon = screen.getByRole("button", {
      name: "link to my github",
    });

    expect(footer).toHaveTextContent(/A project by Berni Harris/i);
    expect(githubIcon).toBeInTheDocument();
  });
  test("contains the correct url", () => {
    const openSpy = vi.spyOn(window, "open").mockImplementation(() => null);

    render(<Footer />);
    const githubIcon = screen.getByTestId("github-button");
    fireEvent.click(githubIcon);
    expect(openSpy).toHaveBeenCalledWith(
      "https://www.github.com/BerniHarris",
      "_blank",
      "noreferrer",
    );

    openSpy.mockRestore();
  });
});
