import { screen, render } from "@testing-library/react";
import { AboutPage } from "./AboutPage";
import { expect } from "vitest";

describe("AboutPage", () => {
  test("AboutPage renders", () => {
    render(<AboutPage />);

    const headers = screen.getAllByRole("heading");
    expect(headers[0]).toHaveTextContent(/about nc news/i);
    expect(headers[1]).toHaveTextContent(
      /Welcome to NC News! An imaginary news forum filled with gibberish articles./i,
    );
    expect(headers[2]).toHaveTextContent(/About Me & The History/i);
    expect(headers[3]).toHaveTextContent(/Why I Rebuilt It/i);
    expect(headers[4]).toHaveTextContent(/Current Features/i);
    expect(headers[5]).toHaveTextContent(/what's next/i);
    expect(headers[6]).toHaveTextContent(/source code/i);
  });
});
