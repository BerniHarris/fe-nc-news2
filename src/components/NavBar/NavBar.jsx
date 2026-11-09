import { NavLink } from "react-router";
import "./NavBar.css";
export const NavBar = () => {
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
            <NavLink
              to="/login"
              className={({ isActive }) => (isActive ? "active-link" : "")}
            >
              Login
            </NavLink>
          </li>
        </div>
      </ul>
    </nav>
  );
};
