import { expect } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
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
    expect(navLinks.length).toBe(4);
    expect(navLinks[0]).toHaveTextContent("Home");
    expect(navLinks[1]).toHaveTextContent("Articles");
    expect(navLinks[2]).toHaveTextContent("Topics");
    expect(navLinks[3]).toHaveTextContent("Login");
  });
  test("navigates to the currect URL path on click", async () => {
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
    waitFor(() => {
      fireEvent.click(homeLink);
    });

    expect(currentPath).toBe("/");

    const articlesLink = screen.getByRole("link", { name: /articles/i });
    waitFor(() => {
      fireEvent.click(articlesLink);
    });

    expect(currentPath).toBe("/articles");

    const topicsLink = screen.getByRole("link", { name: /topics/i });
    waitFor(() => {
      fireEvent.click(topicsLink);
    });

    expect(currentPath).toBe("/topics");

    const loginLink = screen.getByRole("link", { name: /login/i });
    waitFor(() => {
      fireEvent.click(loginLink);
    });

    expect(currentPath).toBe("/login");
  });
});
