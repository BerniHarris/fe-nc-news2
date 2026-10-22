import { useTopics } from "./topicHooks";
vi.mock("../../../api", () => ({ get: vi.fn() }));
import { renderHook, waitFor } from "@testing-library/react";
import { get } from "../../../api.js";
import { cleanup } from "@testing-library/react";

afterEach(() => {
  cleanup();
});
describe("useTopics", () => {
  test("initial state", () => {
    get.mockReturnValue(new Promise(() => {}));
    const { result } = renderHook(() => useTopics());

    expect(result.current.topics).toEqual([]);
    expect(result.current.loading).toBe(true);
    expect(result.current.error).toBe(null);
  });

  test("loads topics successfully", async () => {
    get.mockResolvedValue({
      topics: [{ topic: "cool things", slug: "lets talk cool things" }],
    });

    const { result } = renderHook(() => useTopics());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.topics).toEqual([
      { topic: "cool things", slug: "lets talk cool things" },
    ]);

    expect(result.current.error).toBe(null);
  });

  test("handles API failure", async () => {
    get.mockRejectedValue(new Error("Network error"));

    const { result } = renderHook(() => useTopics());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.topics).toEqual([]);
    expect(result.current.error).toBeInstanceOf(Error);
  });
});
