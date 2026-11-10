import { describe, test, expect, beforeEach } from "vitest";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import { AuthProvider, useAuth } from "./AuthContext";

const TestComponent = () => {
  const { user, loggedIn, login, logout } = useAuth();

  return (
    <>
      <p>User: {user?.username ?? "none"}</p>
      <p>Logged In: {loggedIn ? "yes" : "no"}</p>

      <button
        onClick={() =>
          login({
            username: "tickle122",
            avatar_url: "avatar.jpg",
          })
        }
      >
        Login
      </button>

      <button onClick={logout}>Logout</button>
    </>
  );
};

describe("AuthProvider", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test("renders children", async () => {
    render(
      <AuthProvider>
        <div>Child Component</div>
      </AuthProvider>,
    );

    expect(await screen.findByText("Child Component")).toBeInTheDocument();
  });

  test("starts logged out when no user exists in localStorage", async () => {
    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>,
    );

    await waitFor(() => {
      expect(screen.getByText("User: none")).toBeInTheDocument();
    });

    expect(screen.getByText("Logged In: no")).toBeInTheDocument();
  });

  test("loads user from localStorage", async () => {
    localStorage.setItem(
      "user",
      JSON.stringify({
        username: "tickle122",
        avatar_url: "avatar.jpg",
      }),
    );

    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>,
    );

    expect(await screen.findByText("User: tickle122")).toBeInTheDocument();

    expect(screen.getByText("Logged In: yes")).toBeInTheDocument();
  });

  test("login updates the user state", async () => {
    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>,
    );

    fireEvent.click(await screen.findByRole("button", { name: "Login" }));

    expect(screen.getByText("User: tickle122")).toBeInTheDocument();
    expect(screen.getByText("Logged In: yes")).toBeInTheDocument();
  });

  test("login stores the user in localStorage", async () => {
    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>,
    );

    fireEvent.click(await screen.findByRole("button", { name: "Login" }));

    expect(JSON.parse(localStorage.getItem("user"))).toEqual({
      username: "tickle122",
      avatar_url: "avatar.jpg",
    });
  });

  test("logout clears user state", async () => {
    localStorage.setItem(
      "user",
      JSON.stringify({
        username: "tickle122",
        avatar_url: "avatar.jpg",
      }),
    );

    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>,
    );

    fireEvent.click(await screen.findByRole("button", { name: "Logout" }));

    expect(screen.getByText("User: none")).toBeInTheDocument();
    expect(screen.getByText("Logged In: no")).toBeInTheDocument();
  });

  test("logout removes user from localStorage", async () => {
    localStorage.setItem(
      "user",
      JSON.stringify({
        username: "tickle122",
        avatar_url: "avatar.jpg",
      }),
    );

    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>,
    );

    fireEvent.click(await screen.findByRole("button", { name: "Logout" }));

    expect(localStorage.getItem("user")).toBe(null);
  });
  test("removes invalid user data from localStorage", async () => {
    const consoleSpy = vi.spyOn(console, "error").mockImplementation(() => {});

    localStorage.setItem("user", "not-valid-json");

    render(
      <AuthProvider>
        <div>Loaded</div>
      </AuthProvider>,
    );

    expect(await screen.findByText("Loaded")).toBeInTheDocument();

    expect(consoleSpy).toHaveBeenCalled();
    expect(localStorage.getItem("user")).toBe(null);

    consoleSpy.mockRestore();
  });
});

describe("useAuth", () => {
  test("throws error when used outside AuthProvider", () => {
    expect(() => render(<TestComponent />)).toThrow(
      "useAuth must be used within an AuthProvider",
    );
  });
});
