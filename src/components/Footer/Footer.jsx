import { FaGithub } from "react-icons/fa";
import "./Footer.css";

export const Footer = () => {
  const handleRedirect = () => {
    window.open("https://www.github.com/BerniHarris", "_blank", "noreferrer");
  };
  return (
    <footer className="footer" data-testid="footer">
      A project by Berni Harris
      <button
        onClick={handleRedirect}
        className="github-button"
        data-testid="github-button"
        aria-label="link to my github"
      >
        <FaGithub size={"2rem"} />
      </button>
      Recreation of my Northcoders bootcamp fullstack project.
    </footer>
  );
};
