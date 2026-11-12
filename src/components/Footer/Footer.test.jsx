import { fireEvent, render, screen } from "@testing-library/react";
import { Footer } from "./Footer";
import { expect } from "vitest";
import { MemoryRouter } from "react-router";

const mockNavigate = vi.fn();

vi.mock("react-router", async () => {
  const actual = await vi.importActual("react-router");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

describe("Loading component", () => {
  test("footer render", () => {
    render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>,
    );
    const footer = screen.getByTestId("footer");
    const githubIcon = screen.getByRole("button", {
      name: "link to my github",
    });

    expect(footer).toHaveTextContent(/A project by Berni Harris/i);
    expect(githubIcon).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /about/i }));
  });
  test("github button contains the correct url", () => {
    const openSpy = vi.spyOn(window, "open").mockImplementation(() => null);

    render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>,
    );
    const githubIcon = screen.getByTestId("github-button");
    fireEvent.click(githubIcon);
    expect(openSpy).toHaveBeenCalledWith(
      "https://www.github.com/BerniHarris",
      "_blank",
      "noreferrer",
    );

    openSpy.mockRestore();
  });
  test("about button calls navigate with '/about' when clicked", () => {
    render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>,
    );

    const backButton = screen.getByRole("button", { name: /about/i });

    fireEvent.click(backButton);
    expect(mockNavigate).toHaveBeenCalled();
    expect(mockNavigate).toHaveBeenCalledWith("/about");
  });
});
