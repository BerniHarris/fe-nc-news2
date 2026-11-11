import { useNavigate } from "react-router";
import { IoMdArrowRoundBack } from "react-icons/io";

import "./ErrorPage.css";

export const ErrorPage = ({ error }) => {
  const navigate = useNavigate();

  const errorMessage = (error) => {
    if (typeof error === "string") {
      return error;
    }
    return error?.message || "Something went wrong.";
  };

  return (
    <section
      data-testid="error-page-container"
      className="error-page-container"
    >
      <div data-testid="error-page-body" className="error-page-body">
        <h1 className="error-code">{error?.status || 500}</h1>
        <h2 className="error-page-header">{errorMessage(error)}</h2>
        <p>Sorry, there has been an issue. Please check and try again.</p>
        <button className="back-button" onClick={() => navigate(-1)}>
          <IoMdArrowRoundBack />
          Go Back
        </button>
      </div>
    </section>
  );
};
