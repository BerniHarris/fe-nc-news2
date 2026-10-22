import { BrowserRouter as Router, Route, Routes } from "react-router";
import { ArticleListPage } from "./pages/ArticleListPage/ArticleListPage";
import { ArticlePage } from "./pages/ArticlePage/ArticlePage";

import { NotFoundPage } from "./pages/NotFoundPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ArticleListPage />} />
        <Route path="/articles" element={<ArticleListPage />} />
        <Route path="/articles/:article_id" element={<ArticlePage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
}

export default App;
