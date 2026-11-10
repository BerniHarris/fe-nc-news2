import { Route, Routes, Outlet } from "react-router";
import { ArticleListPage } from "./pages/ArticleListPage/ArticleListPage";
import { ArticlePage } from "./pages/ArticlePage/ArticlePage";
import { HomePage } from "./pages/HomePage/HomePage";
import { TopicListPage } from "./pages/TopicListPage/TopicListPage";
import { PageNotFound } from "./pages/PageNotFound/PageNotFound";
import { LoginPage } from "./pages/LoginPage/LoginPage";

import { NavBar } from "./components/NavBar/NavBar";
import { Footer } from "./components/Footer/Footer";

import "./App.css";

function MainSiteLayout() {
  return (
    <div className="app-wrapper">
      <main className="main-content">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <div className="app">
      <NavBar />
      <Routes>
        <Route element={<MainSiteLayout />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/" element={<HomePage />} />
          <Route path="/articles" element={<ArticleListPage />} />
          <Route path="/articles/:article_id" element={<ArticlePage />} />
          <Route path="/topics/" element={<TopicListPage />} />
          <Route path="*" element={<PageNotFound />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
