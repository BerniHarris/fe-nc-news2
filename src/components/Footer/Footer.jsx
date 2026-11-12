import { FaGithub } from "react-icons/fa";
import { useNavigate } from "react-router";
import "./Footer.css";

export const Footer = () => {
  const navigate = useNavigate();

  const handleRedirect = () => {
    window.open("https://www.github.com/BerniHarris", "_blank", "noreferrer");
  };
  return (
    <footer className="footer" data-testid="footer">
      <div className="about-link-container">
        <button
          className="about-button"
          onClick={() => {
            navigate("/about");
          }}
        >
          About
        </button>
      </div>
      <div className="github-info-container">
        <button
          onClick={handleRedirect}
          className="github-button"
          data-testid="github-button"
          aria-label="link to my github"
        >
          <FaGithub size={"3rem"} />
        </button>
        <div className="github-text-info">
          <p className="footer-desctoption">A project by Berni Harris</p>
          <p className="footer-description">
            Recreation of my Northcoders bootcamp fullstack project.
          </p>
        </div>
      </div>
    </footer>
  );
};
