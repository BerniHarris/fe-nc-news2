import { render, screen, within } from "@testing-library/react";
import { ArticleCard } from "./ArticleCard.jsx";
import { expect } from "vitest";
import { MemoryRouter } from "react-router";

describe("ArticleCard", () => {
  describe("correctly renders when passed a valid article", () => {
    const article = {
      title: "title",
      author: "berni",
      topic: "coding",
      votes: 0,
      comment_count: 2,
      article_id: 199,
      article_img_url: "www.animage.com",
      body: "very interesting",
      created_at: "2009-06-15T13:45:30.0000000Z",
    };

    const userAvatar = "www.image.com";

    const setup = () => {
      render(
        <MemoryRouter initialEntries={["/articles/199"]}>
          <ArticleCard
            article={article}
            commentNumber={2}
            userAvatar={userAvatar}
          />
        </MemoryRouter>,
      );
    };
    test("renders an article card", () => {
      setup();
      const card = screen.getByTestId("article-card-199");
      expect(card).toBeInTheDocument();
    });
    test("renders all elements", () => {
      setup();
      const topic = screen.getByText("CODING");
      const title = screen.getByRole("heading", { name: "TITLE" });
      const image = screen.getAllByRole("img");
      const author = screen.getByText(/by berni/i);
      const date = screen.getByRole("time");
      const article = screen.getByText(/very interesting/i);
      const votes = screen.getByRole("button", {
        name: "Current votes: 0",
      });
      const comments = screen.getByRole("button", {
        name: "Current number of comments: 2",
      });

      expect(topic).toBeInTheDocument();
      expect(title).toBeInTheDocument();
      expect(image[0]).toHaveAttribute("alt", "Cover for title");
      expect(image[1]).toHaveAttribute("alt", "berni avatar");

      expect(author).toBeInTheDocument();
      expect(date).toHaveTextContent("15/06/2009");
      expect(article).toBeInTheDocument();
      expect(votes).toBeInTheDocument();
    });
    test("renders correct number of votes and icon", () => {
      setup();
      const votes = screen.getByTestId("votes-container");
      const voteNum = within(votes).getByText("0");
      const voteIcon = within(votes).getByTestId("votesHeart");

      expect(voteNum).toBeInTheDocument();
      expect(voteIcon).toBeInTheDocument();
    });
    test("renders correct number of comments and icon", () => {
      setup();
      const comments = screen.getByTestId("comments");
      const commentNum = within(comments).getByText("2");
      const commentIcon = within(comments).getByTestId("commentBubble");

      expect(commentNum).toBeInTheDocument();
      expect(commentIcon).toBeInTheDocument();
    });
  });
  describe("correctly renders topic tags background colour", () => {
    const article = (topic) => {
      return {
        title: "title",
        author: "berni",
        topic: topic,
        votes: 0,
        comment_count: 2,
        article_id: 199,
        article_img_url: "www.animage.com",
        body: "very interesting",
        created_at: "2009-06-15T13:45:30.0000000Z",
      };
    };

    const setup = (topic) => {
      render(
        <MemoryRouter initialEntries={["/articles/199"]}>
          <ArticleCard article={article(topic)} />
        </MemoryRouter>,
      );
    };

    test("renders topic background colour correctly when the topic is coding", () => {
      setup("coding");
      const topic = screen.getByText(/coding/i);
      expect(topic).toHaveAttribute(
        "style",
        "background-color: rgb(247, 176, 190);",
      );
    });
    test("renders topic background colour correctly when the topic is cooking", () => {
      setup("cooking");
      const topic = screen.getByText(/cooking/i);
      expect(topic).toHaveAttribute(
        "style",
        "background-color: rgb(62, 145, 193);",
      );
    });
    test("renders topic background colour correctly when the topic is football", () => {
      setup("football");
      const topic = screen.getByText(/football/i);
      expect(topic).toHaveAttribute(
        "style",
        "background-color: rgb(254, 103, 58);",
      );
    });
    test("renders topic background colour correctly when the topic is unknown", () => {
      setup("puppies");
      const topic = screen.getByText(/puppies/i);
      expect(topic).toHaveAttribute(
        "style",
        "background-color: rgb(211, 211, 211);",
      );
    });

    test("renders nothing when article is undefined", () => {
      render(<ArticleCard article={undefined} />);
      expect(screen.queryByTestId("article-card")).not.toBeInTheDocument();
    });
  });
});
