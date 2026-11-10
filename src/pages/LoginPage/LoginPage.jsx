import { useState } from "react";
import { useAuth } from "../../Context/AuthContext/AuthContext";
import { useUsers } from "../../hooks/useUsers/useUsers";
import "./LoginPage.css";

export const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [errors, setErrors] = useState({});
  const { user, login, logout } = useAuth();
  const { users, error } = useUsers();

  const isValidUsername =
    users.filter((existingUser) => existingUser.username === username)
      .length === 1;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isValidUsername) {
      setErrors({ username: "Invalid username." });
      return;
    }
    await login(users.find((user) => user.username === username));
  };

  const handleLogout = async () => {
    setUsername("");
    setErrors({});
    await logout();
    return;
  };

  if (error) {
    return <p>error</p>;
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
                (setUsername(e.target.value), setErrors({}));
              }}
              placeholder="Enter username"
              className={`username-input ${showError ? "has-error" : ""}`}
              required
            />
            {showError && <p className="username-error">{errors.username}</p>}

            <button type="submit" className="login-button">
              Log In
            </button>
          </div>
        </form>
      )}
      {user && (
        <div className="login-page-body">
          <img src={user.avatar_url} className="user-avatar" />
          <button className="logout-button" onClick={handleLogout}>
            Log Out
          </button>
        </div>
      )}
    </div>
  );
};
