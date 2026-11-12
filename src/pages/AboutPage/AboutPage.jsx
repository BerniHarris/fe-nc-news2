import { Link } from "react-router";
import "./AboutPage.css";

export const AboutPage = () => {
  return (
    <div className="about-page-container">
      <div className="about-page">
        <h1>About NC News</h1>

        <h2>
          Welcome to NC News! An imaginary news forum filled with gibberish
          articles.
        </h2>
        <section>
          <h3>About Me & The History</h3>
          <p>
            I created the original version of this forum during my coding
            bootcamp in 2022. Alongside competency interviews and live tech
            tests, that project helped me land a fantastic role at JLR as a
            front-end leaning, full-stack engineer on the Over-The-Air (OTA)
            team. I loved it!
          </p>
        </section>
        <section>
          <h3>Why I Rebuilt It</h3>
          <p>
            Unfortunately, I was made redundant in April 2025. While in between
            jobs, I decided to rebuild the project from scratch to stay sharp.
          </p>

          <p>
            The tech industry has changed massively even since I left JLR. When
            I worked there, AI was completely banned, whereas now it is a
            standard part of the workflow. For this rebuild, I challenged myself
            to avoid relying on AI as much as possible. I kept the styling close
            to my original 2022 design while expanding on the core features, and
            I have now reached all the original project goals.
          </p>
        </section>
        <section>
          <h3>Current Features</h3>
          <ul>
            <li>
              <b>Home page</b> - Lists newest article, top 5 liked and top five
              commented
            </li>
            <li>
              <b>Articles page</b> - Lists all articles along with a summary and
              the ability to dynamically sort, filter and order
            </li>
            <li>
              <b>Article page</b> - Presents the full article details along with
              the ability to up-vote/down-vote, leave comments, delete comments
              and view all comments linked to the article
            </li>
            <li>
              <b>Topics page</b> - Lists all the existing forum topics
            </li>
            <li>
              <b>Login page</b> - Validates username and by using context, the
              user details can be shared throughout the app meaning users will
              stay logged in.
            </li>
            <li>
              <b>Dynamic navbar</b> - Changes from top navigation to side burger
              navigation dependant on screen size.
            </li>
          </ul>
          And other smaller features such as error pages, loaders and footer
          etc.
          <h3>What's Next</h3>
          <p>
            The site doesn't have sensitive data so security isn't a priority,
            but passwords and permissions for adding, updating and deleting data
            is something I would like to include. I would also like to give the
            UI a complete overhaul to make it much cleaner and more
            user-friendly.
          </p>
        </section>
        <section>
          <h3>Source Code</h3>
          <div className="code-links">
            <b>Remake</b>
            <ul>
              <li>
                <b>Back-end </b>-
                <a
                  href="https://www.github.com/BerniHarris/be-nc-news2"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  GitHub
                </a>
                {" / "}
                <a
                  href="https://be-nc-news2.onrender.com/api/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Hosted API
                </a>
              </li>
              <li>
                <b>Front-end </b>-
                <a
                  href="https://github.com/BerniHarris/fe-nc-news2"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  GitHub
                </a>
                {" / "}
                <a
                  href="https://ncnews2berni.netlify.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Hosted website
                </a>
              </li>
            </ul>

            <b>Original</b>
            <ul>
              <li>
                <b>Back-end </b>-
                <a
                  href="https://github.com/BerniHarris/be-nc-news"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  GitHub
                </a>
              </li>
              <li>
                <b>Front-end </b>-
                <a
                  href="https://github.com/BerniHarris/nc-news"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  GitHub
                </a>
                {" / "}
                <a
                  href="https://nc-pigeonpost.netlify.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Hosted Website
                </a>
              </li>
            </ul>
          </div>
        </section>
      </div>
    </div>
  );
};
