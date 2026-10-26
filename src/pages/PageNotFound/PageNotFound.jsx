import { useNavigate } from "react-router";
import "./PageNotFound.css";

export const PageNotFound = () => {
  const navigate = useNavigate();
  return (
    <div data-testid="page-not-found" className="page-not-found-container">
      <div data-testid="page-not-found-body" className="page-not-found-body">
        <h1>Page Not Found</h1>
        <button onClick={() => navigate(-1)}>Go Back</button>
      </div>
    </div>
  );
};
