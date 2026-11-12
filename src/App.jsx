import { Route, Routes, useLocation } from "react-router";
import { useEffect } from "react";

import { ArticleListPage } from "./pages/ArticleListPage/ArticleListPage";
import { ArticlePage } from "./pages/ArticlePage/ArticlePage";
import { HomePage } from "./pages/HomePage/HomePage";
import { TopicListPage } from "./pages/TopicListPage/TopicListPage";
import { ErrorPage } from "./pages/ErrorPage/ErrorPage";
import { LoginPage } from "./pages/LoginPage/LoginPage";
import { AboutPage } from "./pages/AboutPage/AboutPage";

import { NavBar } from "./components/NavBar/NavBar";
import { Footer } from "./components/Footer/Footer";

import "./App.css";

function App() {
  function ScrollToTop() {
    const { pathname } = useLocation();

    useEffect(() => {
      window.scrollTo(0, 0);
    }, [pathname]);

    return null;
  }
  return (
    <div className="app">
      <ScrollToTop />
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/articles" element={<ArticleListPage />} />
        <Route path="/articles/:article_id" element={<ArticlePage />} />
        <Route path="/topics" element={<TopicListPage />} />
        <Route path="/about" element={<AboutPage />} />

        <Route
          path="*"
          element={
            <ErrorPage error={{ message: "Page Not Found", status: 404 }} />
          }
        />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
