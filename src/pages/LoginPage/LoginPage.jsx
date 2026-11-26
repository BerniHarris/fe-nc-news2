import { useState } from "react";
import { useAuth } from "../../Context/AuthContext/AuthContext";
import { useUsers } from "../../hooks/useUsers/useUsers";
import "./LoginPage.css";
import { ErrorPage } from "../ErrorPage/ErrorPage";

export const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [errors, setErrors] = useState({});
  const { user, login, logout } = useAuth();
  const { users, error } = useUsers();

  const demoUsers = [
    "tickle122",
    "grumpy19",
    "happyamy2016",
    "cooljmessy",
    "weegembump",
    "jessjelly",
    "guestUser1",
  ];

  const matchedUser = users?.find(
    (existingUser) => existingUser.username === username,
  );

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!matchedUser) {
      setErrors({ username: "Invalid username." });
      return;
    }
    await login(matchedUser);
  };

  const handleLogout = async () => {
    setUsername("");
    setErrors({});
    await logout();
  };

  if (error) {
    return <ErrorPage error={error} />;
  }

  const showError = errors.username;

  return (
    <div className="login-page-container">
      <h2>Welcome {user?.username ?? "guest"}!</h2>
      {!user && (
        <form
          onSubmit={handleSubmit}
          className="login-form"
          aria-label="login-form"
        >
          <div className="login-page-body">
            <input
              type="text"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
                setErrors({});
              }}
              placeholder="Enter username"
              className={`username-input ${showError ? "has-error" : ""}`}
              required
            />
            {!demoUsers.includes(username) && (
              <div
                className="demo-usernames"
                data-testid="demo-username-container"
              >
                <span>Valid demo users: </span>
                {demoUsers.map((demo) => (
                  <button
                    className="username-button"
                    key={demo}
                    type="button"
                    onClick={() => {
                      setUsername(demo);
                      setErrors({});
                    }}
                  >
                    {demo}
                  </button>
                ))}
              </div>
            )}

            {showError && <p className="username-error">{errors.username}</p>}

            <button type="submit" className="login-button">
              Log In
            </button>
          </div>
        </form>
      )}
      {user && (
        <div className="login-page-body">
          <img
            src={user.avatar_url}
            alt={`${user.username}'s avatar`}
            className="user-avatar"
          />
          <button className="logout-button" onClick={handleLogout}>
            Log Out
          </button>
        </div>
      )}
    </div>
  );
};
