import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import { LoginPage } from "./LoginPage";
import { useAuth } from "../../Context/AuthContext/AuthContext";
import { useUsers } from "../../hooks/useUsers/useUsers";
import { vi } from "vitest";

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

  test("renders guest when no user is logged in", () => {
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
    expect(screen.getByPlaceholderText(/enter username/i)).toBeInTheDocument();
  });

  test("renders logged in user", () => {
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

  test("calls login when username exists", async () => {
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

    render(<LoginPage />);

    expect(screen.getByText(/error/i)).toBeInTheDocument();
  });
});
