import { NotFoundPage } from "./NotFoundPage";
import { render, screen, waitFor } from "@testing-library/react";

describe("NotFoundPage", () => {
  test("Page renders correclty", () => {
    render(<NotFoundPage />);
    expect(
      screen.getByRole("heading", { name: /page not found/i }),
    ).toBeInTheDocument();
  });
});
