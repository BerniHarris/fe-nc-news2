import { render, screen, waitFor, act } from "@testing-library/react";
import { describe, test, expect, vi, beforeEach } from "vitest";
import { TopicListPage } from "./TopicListPage";
import api, { get } from "../../../api";
import { MemoryRouter } from "react-router";
import App from "../../App";

vi.mock("../../components/TopicCard/TopicCard", () => {
  return {
    TopicCard: ({ topic }) => (
      <div data-testid="mock-topic-card">{topic?.slug}</div>
    ),
  };
});

vi.mock("../../../api", () => {
  const mockGet = vi.fn();
  return {
    get: mockGet,
    default: {
      get: mockGet,
    },
  };
});

describe("TopicListPage", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("Page rendering", () => {
    test("correctly renders a list of topics", async () => {
      const mockTopics = [
        {
          slug: "coding",
          description: "cool coding topic",
        },
        {
          slug: "mock topic",
          description: "cool mock topic",
        },
      ];

      get.mockResolvedValue({ topics: mockTopics });

      render(
        <MemoryRouter>
          <TopicListPage />
        </MemoryRouter>,
      );

      const cards = await screen.findAllByTestId("mock-topic-card");
      expect(cards).toHaveLength(2);
      expect(cards[0]).toHaveTextContent("coding");
      expect(cards[0]).not.toHaveTextContent("mock topic");
      expect(cards[1]).toHaveTextContent("mock topic");
      expect(cards[1]).not.toHaveTextContent("coding");
    });

    test("correctly renders the empty state when no topics exist", async () => {
      get.mockResolvedValue({ topics: [] });

      render(
        <MemoryRouter>
          <TopicListPage />
        </MemoryRouter>,
      );

      await waitFor(() => {
        expect(screen.getByTestId("topic-list-page")).toBeInTheDocument();
      });
      expect(screen.queryByTestId("mock-article-card")).not.toBeInTheDocument();
      expect(screen.getByTestId("no-topics")).toHaveTextContent(
        "No topics found.",
      );
    });
    test("correctly renders error UI when the network request fails", async () => {
      get.mockRejectedValue("Network Error");

      render(
        <MemoryRouter>
          <TopicListPage />
        </MemoryRouter>,
      );

      await waitFor(() => {
        expect(screen.getByText(/Network Error/i)).toBeInTheDocument();
      });
    });
    test("correctly renders loading message", async () => {
      get.mockImplementation(() => new Promise(() => {}));

      render(
        <MemoryRouter>
          <TopicListPage />
        </MemoryRouter>,
      );

      expect(screen.getByLabelText(/loading.../i)).toBeInTheDocument();
    });
  });
});
