import {
  render,
  screen,
  waitFor,
  fireEvent,
  within,
} from "@testing-library/react";
import { LoginPage } from "./LoginPage";
import { useAuth } from "../../Context/AuthContext/AuthContext";
import { useUsers } from "../../hooks/useUsers/useUsers";
import { expect, vi } from "vitest";
import { MemoryRouter } from "react-router";

vi.mock("../../Context/AuthContext/AuthContext", () => ({
  useAuth: vi.fn(),
}));
vi.mock("../../hooks/useUsers/useUsers");

describe("LoginPage", () => {
  const mockLogin = vi.fn();
  const mockLogout = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("user logged in", () => {
    test("renders users name in the welcome message when a user is logged in", () => {
      useAuth.mockReturnValue({
        user: {
          username: "jessjelly",
          avatar_url: "avatar.jpg",
        },
        login: mockLogin,
        logout: mockLogout,
      });

      useUsers.mockReturnValue({
        users: [],
        error: null,
      });

      render(<LoginPage />);

      expect(screen.getByText(/welcome jessjelly/i)).toBeInTheDocument();

      expect(
        screen.getByRole("button", { name: /log out/i }),
      ).toBeInTheDocument();
    });
    test("calls logout when user clicks logout", async () => {
      useAuth.mockReturnValue({
        user: {
          username: "jessjelly",
          avatar_url: "avatar.jpg",
        },
        login: mockLogin,
        logout: mockLogout,
      });

      useUsers.mockReturnValue({
        users: [],
        error: null,
      });

      render(<LoginPage />);

      fireEvent.click(screen.getByRole("button", { name: /log out/i }));
      expect(useAuth).toHaveBeenCalled();
      await expect(mockLogout).toHaveBeenCalledTimes(1);
    });
    test("should not render a login button if a user is logged in", () => {
      useAuth.mockReturnValue({
        user: {
          username: "jessjelly",
          avatar_url: "avatar.jpg",
        },
        login: mockLogin,
        logout: mockLogout,
      });

      useUsers.mockReturnValue({
        users: [],
        error: null,
      });

      render(<LoginPage />);

      expect(
        screen.queryByRole("button", { name: /log in/i }),
      ).not.toBeInTheDocument();
      expect(
        screen.getByRole("button", { name: /log out/i }),
      ).toBeInTheDocument();
    });
  });

  describe("user not logged in", () => {
    test("renders guest in the welcome when no user is logged in", () => {
      useAuth.mockReturnValue({
        user: null,
        login: mockLogin,
        logout: mockLogout,
      });

      useUsers.mockReturnValue({
        users: [],
        error: null,
      });

      render(<LoginPage />);

      expect(screen.getByText(/welcome guest/i)).toBeInTheDocument();
      expect(
        screen.getByPlaceholderText(/enter username/i),
      ).toBeInTheDocument();
    });
    test("should not render a logout button if not logged in", () => {
      useAuth.mockReturnValue({
        user: null,
        login: mockLogin,
        logout: mockLogout,
      });

      useUsers.mockReturnValue({
        users: [],
        error: null,
      });

      render(<LoginPage />);

      expect(
        screen.getByRole("button", { name: /log in/i }),
      ).toBeInTheDocument();
      expect(
        screen.queryByRole("button", { name: /log out/i }),
      ).not.toBeInTheDocument();
    });
    test("should display valid demo usernames if user is not logged in", () => {
      useAuth.mockReturnValue({
        user: null,
        login: mockLogin,
        logout: mockLogout,
      });

      useUsers.mockReturnValue({
        users: [],
        error: null,
      });

      render(<LoginPage />);

      const demoUsernames = within(
        screen.getByTestId("demo-username-container"),
      ).getAllByRole("button");

      expect(screen.getByText(/valid demo users:/i)).toBeInTheDocument();
      expect(demoUsernames).toHaveLength(7);
    });
    test("should not display demo username options if one has been clicked", async () => {
      useAuth.mockReturnValue({
        user: null,
        login: mockLogin,
        logout: mockLogout,
      });

      useUsers.mockReturnValue({
        users: [],
        error: null,
      });

      render(<LoginPage />);

      const demoUsernames = within(
        screen.getByTestId("demo-username-container"),
      ).getAllByRole("button");

      fireEvent.click(demoUsernames[0]);

      expect(
        screen.queryByTestId("demo-username-container"),
      ).not.toBeInTheDocument();
    });
    test("when the login button is clicked and the username is valid, calls login", async () => {
      const userObj = {
        username: "jessjelly",
        avatar_url: "avatar.jpg",
      };

      useAuth.mockReturnValue({
        user: null,
        login: mockLogin,
        logout: mockLogout,
      });

      useUsers.mockReturnValue({
        users: [userObj],
        error: null,
      });

      render(<LoginPage />);

      fireEvent.change(screen.getByPlaceholderText(/enter username/i), {
        target: {
          value: "jessjelly",
        },
      });

      fireEvent.click(
        screen.getByRole("button", {
          name: /log in/i,
        }),
      );

      await waitFor(() => {
        expect(mockLogin).toHaveBeenCalledWith(userObj);
      });
    });
    test("does not call login with invalid username", async () => {
      useAuth.mockReturnValue({
        user: null,
        login: mockLogin,
        logout: mockLogout,
      });

      useUsers.mockReturnValue({
        users: [{ username: "jessjelly" }],
        error: null,
      });

      render(<LoginPage />);

      fireEvent.change(screen.getByPlaceholderText(/enter username/i), {
        target: {
          value: "not-a-user",
        },
      });

      fireEvent.click(
        screen.getByRole("button", {
          name: /log in/i,
        }),
      );

      expect(mockLogin).not.toHaveBeenCalled();
    });
  });

  test("shows error state from useUsers", () => {
    useAuth.mockReturnValue({
      user: null,
      login: mockLogin,
      logout: mockLogout,
    });

    useUsers.mockReturnValue({
      users: [],
      error: "Something went wrong",
    });

    render(
      <MemoryRouter>
        <LoginPage />
      </MemoryRouter>,
    );

    expect(screen.getByText(/Something went wrong/i)).toBeInTheDocument();
  });
});
