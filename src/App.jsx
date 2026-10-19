import { useEffect, useState } from "react";
import { get } from "../api";

function App() {
  const [articles, setArticles] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    get("/articles")
      .then((articles) => setArticles(articles.articles))
      .catch((error) => setError(error));
  }, []);

  console.log(error);

  return (
    <div>
      <h1>Articles</h1>
      <div>
        {articles.map((article) => {
          return (
            <ul>
              <li>{article.title}</li>
              <li>{article.author}</li>
              <li>{article.topic}</li>
              <li>{article.votes}</li>
              <li>{article.comment_count}</li>
            </ul>
          );
        })}
      </div>
    </div>
  );
}

export default App;
