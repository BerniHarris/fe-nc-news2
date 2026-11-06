import { Route, Routes } from "react-router";
import { ArticleListPage } from "./pages/ArticleListPage/ArticleListPage";
import { ArticlePage } from "./pages/ArticlePage/ArticlePage";
import { HomePage } from "./pages/HomePage/HomePage";
import { TopicListPage } from "./pages/TopicListPage/TopicListPage";
import { PageNotFound } from "./pages/PageNotFound/PageNotFound";
import { NavBar } from "./components/NavBar/NavBar";
import "./App.css";

function App() {
  return (
    <div className="app">
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/articles" element={<ArticleListPage />} />
        <Route path="/articles/:article_id" element={<ArticlePage />} />
        <Route path="/topics/" element={<TopicListPage />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </div>
  );
}

export default App;
