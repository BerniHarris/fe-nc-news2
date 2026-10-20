import { BrowserRouter as Router, Route, Routes } from "react-router";
import { ArticleListPage } from "./pages/ArticleListPage";
import { NotFoundPage } from "./pages/NotFoundPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/articles" element={<ArticleListPage />} />

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
}

export default App;
