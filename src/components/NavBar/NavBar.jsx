import { NavLink } from "react-router";
import { useAuth } from "../../Context/AuthContext/AuthContext";
import { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { MdOutlineClose } from "react-icons/md";

import "./NavBar.css";

export const NavBar = () => {
  const { user, loggedIn } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  const closeMenu = () => setIsOpen(false);

  return (
    <nav className="navbar">
      <button className="burger-menu" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? (
          <MdOutlineClose size={"2.5rem"} className="close-button" />
        ) : (
          <GiHamburgerMenu className="burger-menu" />
        )}
      </button>

      <ul className={`navbar-links ${isOpen ? "open" : ""}`}>
        <li>
          <NavLink
            to="/"
            end
            className={({ isActive }) => (isActive ? "active-link" : "")}
            onClick={closeMenu}
          >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/articles"
            className={({ isActive }) => (isActive ? "active-link" : "")}
            onClick={closeMenu}
          >
            Articles
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/topics"
            className={({ isActive }) => (isActive ? "active-link" : "")}
            onClick={closeMenu}
          >
            Topics
          </NavLink>
        </li>
      </ul>

      <div className="login-container">
        {loggedIn && user ? (
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
        ) : (
          <NavLink
            to="/login"
            className={({ isActive }) => (isActive ? "active-link" : "")}
            data-testid="nav-login"
          >
            Login
          </NavLink>
        )}
      </div>
    </nav>
  );
};
