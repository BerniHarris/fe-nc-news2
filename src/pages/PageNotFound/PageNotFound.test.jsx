import { MemoryRouter } from "react-router";
import { PageNotFound } from "./PageNotFound";
import { fireEvent, render, screen } from "@testing-library/react";

const mockNavigate = vi.fn();

vi.mock("react-router", async () => {
  const actual = await vi.importActual("react-router");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

describe("PageNotFound", () => {
  test("Page renders correclty", () => {
    render(
      <MemoryRouter>
        <PageNotFound />
      </MemoryRouter>,
    );
    expect(
      screen.getByRole("heading", { name: /page not found/i }),
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Go Back" })).toBeInTheDocument();
  });

  test("back button calls navigate with -1 when clicked", () => {
    render(
      <MemoryRouter>
        <PageNotFound />
      </MemoryRouter>,
    );

    const backButton = screen.getByRole("button", { name: /go back/i });

    fireEvent.click(backButton);
    expect(mockNavigate).toHaveBeenCalled();
    expect(mockNavigate).toHaveBeenCalledWith(-1);
  });
});
