import { NavLink } from "react-router";
import { useAuth } from "../../Context/AuthContext/AuthContext";

import "./NavBar.css";
export const NavBar = () => {
  const { user, loggedIn } = useAuth();

  return (
    <nav className="navbar">
      <ul className="navbar-links">
        <div className="links">
          <li>
            <NavLink
              to="/"
              end
              className={({ isActive }) => (isActive ? "active-link" : "")}
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/articles"
              className={({ isActive }) => (isActive ? "active-link" : "")}
            >
              Articles
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/topics"
              className={({ isActive }) => (isActive ? "active-link" : "")}
            >
              Topics
            </NavLink>
          </li>
        </div>
        <div className="login">
          <li>
            {loggedIn && user && (
              <NavLink
                to="/login"
                className={({ isActive }) =>
                  isActive ? "active-link avatar" : "avatar"
                }
                data-testid="nav-login"
              >
                <img
                  src={user.avatar_url}
                  alt={`${user.username} avatar`}
                  className="nav-avatar"
                />
              </NavLink>
            )}

            {!loggedIn && (
              <NavLink
                to="/login"
                className={({ isActive }) => (isActive ? "active-link" : "")}
                data-testid="nav-login"
              >
                Login
              </NavLink>
            )}
          </li>
        </div>
      </ul>
    </nav>
  );
};
