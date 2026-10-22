import { NavLink } from "react-router";
import "./NavBar.css";
export const NavBar = () => {
  return (
    <nav className="navbar">
      <ul className="navbar-links">
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
      </ul>
    </nav>
  );
};
