import { useNavigate } from "react-router";
import { IoMdArrowRoundBack } from "react-icons/io";

import "./PageNotFound.css";

export const PageNotFound = () => {
  const navigate = useNavigate();
  return (
    <div data-testid="page-not-found" className="page-not-found-container">
      <div data-testid="page-not-found-body" className="page-not-found-body">
        <h1>Page Not Found</h1>
        <button className="back-button" onClick={() => navigate(-1)}>
          <IoMdArrowRoundBack />
          Go Back
        </button>
      </div>
    </div>
  );
};
