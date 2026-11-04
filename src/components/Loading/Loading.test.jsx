import { render, screen } from "@testing-library/react";
import { Loading } from "./Loading";

describe("Loading component", () => {
  test("render a Loaing animation", () => {
    render(<Loading />);
    const loadingSpinner = screen.getByRole("status", { name: /loading/i });

    expect(loadingSpinner).toHaveStyle({
      "--OP-annulus-phase1-color": "#26a2a8",
    });
  });
});
