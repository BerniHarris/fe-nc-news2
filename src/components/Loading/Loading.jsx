import { OrbitProgress } from "react-loading-indicators";
import "./Loading.css";
export const Loading = () => {
  return (
    <div className="loading-container" aria-label="Loading...">
      <OrbitProgress color="#26a2a8" size="large" text="" textColor="" />
    </div>
  );
};
