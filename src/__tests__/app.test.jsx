import { render, screen } from "@testing-library/react";
import App from "../App.jsx";

describe("fe-nc-news", () => {
  test("renders page", () => {
    render(<App />);
    expect(screen.getByText(/Page Not Found/i)).toBeInTheDocument();
    expect(screen.getByTestId("not-found-page")).toBeInTheDocument();
  });
});
