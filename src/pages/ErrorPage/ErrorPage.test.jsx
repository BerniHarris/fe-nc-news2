import { MemoryRouter } from "react-router";
import { ErrorPage } from "./ErrorPage";
import { fireEvent, render, screen } from "@testing-library/react";

const mockNavigate = vi.fn();

vi.mock("react-router", async () => {
  const actual = await vi.importActual("react-router");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

describe("ErrorPage", () => {
  test("Page renders correclty when no error passed", () => {
    render(
      <MemoryRouter>
        <ErrorPage error={undefined} />
      </MemoryRouter>,
    );
    const headers = screen.getAllByRole("heading");
    expect(headers[0]).toHaveTextContent(500);
    expect(headers[1]).toHaveTextContent("Something went wrong.");
    expect(
      screen.getByText(
        "Sorry, there has been an issue. Please check and try again.",
      ),
    );
    expect(screen.getByRole("button", { name: "Go Back" })).toBeInTheDocument();
  });

  test("Page renders correclty when valid error with status and message passed", () => {
    render(
      <MemoryRouter>
        <ErrorPage error={{ status: 404, message: "very wrong" }} />
      </MemoryRouter>,
    );
    const headers = screen.getAllByRole("heading");
    expect(headers[0]).toHaveTextContent(404);
    expect(headers[1]).toHaveTextContent("very wrong");
    expect(
      screen.getByText(
        "Sorry, there has been an issue. Please check and try again.",
      ),
    );
    expect(screen.getByRole("button", { name: "Go Back" })).toBeInTheDocument();
  });

  test("Page renders correclty when valid error with status and message passed", () => {
    render(
      <MemoryRouter>
        <ErrorPage error={{ status: 404, message: "very wrong" }} />
      </MemoryRouter>,
    );
    const headers = screen.getAllByRole("heading");
    expect(headers[0]).toHaveTextContent(404);
    expect(headers[1]).toHaveTextContent("very wrong");
    expect(
      screen.getByText(
        "Sorry, there has been an issue. Please check and try again.",
      ),
    );
    expect(screen.getByRole("button", { name: "Go Back" })).toBeInTheDocument();
  });
  test("Page renders correclty when only a status passed", () => {
    render(
      <MemoryRouter>
        <ErrorPage error={{ status: 400 }} />
      </MemoryRouter>,
    );
    const headers = screen.getAllByRole("heading");
    expect(headers[0]).toHaveTextContent(400);
    expect(headers[1]).toHaveTextContent("Something went wrong.");
    expect(
      screen.getByText(
        "Sorry, there has been an issue. Please check and try again.",
      ),
    );
    expect(screen.getByRole("button", { name: "Go Back" })).toBeInTheDocument();
  });

  test("Page renders correclty when only a message passed", () => {
    render(
      <MemoryRouter>
        <ErrorPage error={{ message: "wheres my status?" }} />
      </MemoryRouter>,
    );
    const headers = screen.getAllByRole("heading");
    expect(headers[0]).toHaveTextContent(500);
    expect(headers[1]).toHaveTextContent("wheres my status?");
    expect(
      screen.getByText(
        "Sorry, there has been an issue. Please check and try again.",
      ),
    );
    expect(screen.getByRole("button", { name: "Go Back" })).toBeInTheDocument();
  });

  test("back button calls navigate with -1 when clicked", () => {
    render(
      <MemoryRouter>
        <ErrorPage />
      </MemoryRouter>,
    );

    const backButton = screen.getByRole("button", { name: /go back/i });

    fireEvent.click(backButton);
    expect(mockNavigate).toHaveBeenCalled();
    expect(mockNavigate).toHaveBeenCalledWith(-1);
  });
});
