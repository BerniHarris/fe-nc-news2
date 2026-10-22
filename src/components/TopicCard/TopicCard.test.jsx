import { fireEvent, render, screen, within } from "@testing-library/react";
import { TopicCard } from "./TopicCard.jsx";
import { expect } from "vitest";
import { MemoryRouter } from "react-router";

describe("TopicCard", () => {
  describe("correctly renders when passed a valid topic", () => {
    const topic = {
      slug: "coding",
      description: "cool coding topic",
    };

    const setup = () => {
      render(
        <MemoryRouter initialEntries={["/topics"]}>
          <TopicCard topic={topic} />
        </MemoryRouter>,
      );
    };
    test("renders an topic  card", () => {
      setup();
      const card = screen.getByTestId("topic-card");
      expect(card).toBeInTheDocument();
    });
    test("renders topic's slug and description", () => {
      setup();
      const slug = screen.getByRole("heading", { name: /coding/i });
      const description = screen.getByText(/cool coding topic/i);
      expect(slug).toBeInTheDocument();
      expect(description).toBeInTheDocument();
    });
    test("correctly links to articles filtered with the topic", () => {
      setup("coding");
      const codingTopic = screen.getByRole("link", { name: /coding/i });
      expect(codingTopic).toHaveAttribute("href", "/articles?topic=coding");
    });
  });
  describe("correctly renders topics background colour", () => {
    const topic = (slug) => {
      return { slug: slug, description: "cool coding topic" };
    };

    const setup = (slug) => {
      render(
        <MemoryRouter initialEntries={["/topics"]}>
          <TopicCard topic={topic(slug)} />
        </MemoryRouter>,
      );
    };

    test("renders topic background colour correctly when the topic is coding", () => {
      setup("coding");
      const codingTopic = screen.getByRole("link", { name: /coding/i });
      expect(codingTopic).toHaveAttribute(
        "style",
        "background-color: rgb(247, 176, 190);",
      );
    });
    test("renders topic background colour correctly when the topic is cooking", () => {
      setup("cooking");
      const cookingTopic = screen.getByRole("link", { name: /cooking/i });
      expect(cookingTopic).toHaveAttribute(
        "style",
        "background-color: rgb(62, 145, 193);",
      );
    });
    test("renders topic background colour correctly when the topic is football", () => {
      setup("football");
      const footballTopic = screen.getByRole("link", { name: /football/i });
      expect(footballTopic).toHaveAttribute(
        "style",
        "background-color: rgb(254, 103, 58);",
      );
    });
    test("renders topic background colour correctly when the topic is unknown", () => {
      setup("puppies");
      const topic = screen.getByRole("link", { name: /puppies/i });

      expect(topic).toHaveAttribute(
        "style",
        "background-color: rgb(211, 211, 211);",
      );
    });

    test("renders nothing when topic is undefined", () => {
      render(<TopicCard article={undefined} />);
      expect(screen.queryByTestId("topic-card")).not.toBeInTheDocument();
    });
  });
});
