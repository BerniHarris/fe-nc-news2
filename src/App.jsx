import { Route, Routes } from "react-router";
import { ArticleListPage } from "./pages/ArticleListPage/ArticleListPage";
import { ArticlePage } from "./pages/ArticlePage/ArticlePage";
import { TopicListPage } from "./pages/TopicListPage/TopicListPage";

import { NotFoundPage } from "./pages/NotFoundPage";
import { NavBar } from "./components/NavBar/NavBar";

function App() {
  return (
    <div>
      <NavBar />
      <main>
        <Routes>
          <Route path="/" element={<ArticleListPage />} />
          <Route path="/articles" element={<ArticleListPage />} />
          <Route path="/articles/:article_id" element={<ArticlePage />} />
          <Route path="/topics/" element={<TopicListPage />} />

          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
