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
const mockUseAuth = vi.fn();

vi.mock("../../Context/AuthContext/AuthContext", () => ({
  useAuth: () => mockUseAuth(),
}));

describe("NavBar", () => {
  vi.clearAllMocks();

  beforeEach(() => {
    mockUseAuth.mockReturnValue({
      user: null,
      loggedIn: false,
    });
  });
  const setup = () => {
    render(
      <MemoryRouter initialEntries={["/home"]}>
        <NavBar />
      </MemoryRouter>,
    );
  };
  test("NavBar renders", () => {
    setup();

    expect(screen.getByRole("navigation")).toBeInTheDocument();
  });
  test("NavBar renders correct link names", () => {
    setup();

    expect(screen.getByRole("navigation")).toBeInTheDocument();
    const navLinks = screen.getAllByRole("link");
    expect(navLinks.length).toBe(4);
    expect(navLinks[0]).toHaveTextContent("Home");
    expect(navLinks[1]).toHaveTextContent("Articles");
    expect(navLinks[2]).toHaveTextContent("Topics");
    expect(navLinks[3]).toHaveAttribute("data-testid", "nav-login");
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
    fireEvent.click(homeLink);
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
  describe("NavBar Login", () => {
    test("shows Login link when user is not logged in", () => {
      mockUseAuth.mockReturnValue({
        user: null,
        loggedIn: false,
      });
      setup();

      expect(screen.getByText("Login")).toBeInTheDocument();
    });
    test("does not show avatar when user is not logged in", () => {
      mockUseAuth.mockReturnValue({
        user: null,
        loggedIn: false,
      });
      setup();

      expect(document.querySelector(".nav-avatar")).not.toBeInTheDocument();
    });
    test("shows avatar when user is logged in", () => {
      mockUseAuth.mockReturnValue({
        loggedIn: true,
        user: {
          username: "tickle122",
          avatar_url: "avatar.jpg",
        },
      });
      setup();

      const avatar = document.querySelector(".nav-avatar");
      expect(avatar).toBeInTheDocument();
      expect(avatar).toHaveAttribute("src", "avatar.jpg");
    });
    test("does not show Login link when logged in", () => {
      mockUseAuth.mockReturnValue({
        loggedIn: true,
        user: {
          username: "tickle122",
          avatar_url: "avatar.jpg",
        },
      });
      setup();

      expect(screen.queryByText("Login")).not.toBeInTheDocument();
    });

    test("avatar links to login page", () => {
      mockUseAuth.mockReturnValue({
        loggedIn: true,
        user: {
          username: "tickle122",
          avatar_url: "avatar.jpg",
        },
      });
      setup();

      const link = document.querySelector('a[href="/login"]');
      expect(link).toBeInTheDocument();
    });
  });
});
