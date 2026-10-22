import { expect } from "vitest";
import { render, screen, fireEvent, act } from "@testing-library/react";
import { MemoryRouter, Routes, Route, useLocation } from "react-router";
import { NavBar } from "./NavBar";

let currentPath;
function LocationFinder() {
  const location = useLocation();
  currentPath = location.pathname;
  return null;
}

describe("NavBar", () => {
  test("NavBar renders", () => {
    render(
      <MemoryRouter initialEntries={["/home"]}>
        <NavBar />
      </MemoryRouter>,
    );
    expect(screen.getByRole("navigation")).toBeInTheDocument();
  });
  test("NavBar renders correct link names", () => {
    render(
      <MemoryRouter initialEntries={["/home"]}>
        <NavBar />
      </MemoryRouter>,
    );
    expect(screen.getByRole("navigation")).toBeInTheDocument();
    const navLinks = screen.getAllByRole("link");
    expect(navLinks.length).toBe(3);
    expect(navLinks[0]).toHaveTextContent("Home");
    expect(navLinks[1]).toHaveTextContent("Articles");
    expect(navLinks[2]).toHaveTextContent("Topics");
  });
  test("navigates to the exact topic URL path on click", async () => {
    render(
      <MemoryRouter initialEntries={["/topics"]}>
        <NavBar />

        <LocationFinder />

        <Routes>
          <Route path="*" element={null} />
        </Routes>
      </MemoryRouter>,
    );

    const homeLink = screen.getByRole("link", { name: /home/i });
    act(() => {
      fireEvent.click(homeLink);
    });

    expect(currentPath).toBe("/");

    const articlesLink = screen.getByRole("link", { name: /articles/i });
    act(() => {
      fireEvent.click(articlesLink);
    });

    expect(currentPath).toBe("/articles");

    const topicsLink = screen.getByRole("link", { name: /topics/i });
    act(() => {
      fireEvent.click(topicsLink);
    });

    expect(currentPath).toBe("/topics");
  });
});
