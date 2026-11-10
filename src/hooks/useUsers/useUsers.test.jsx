vi.mock("../../../api", () => ({ get: vi.fn() }));
import { renderHook, waitFor, act } from "@testing-library/react";
import { useUsers } from "./useUsers.jsx";
import { get } from "../../../api.js";
import { cleanup } from "@testing-library/react";

afterEach(() => {
  cleanup();
  vi.clearAllMocks();
});

describe("UseUpdateArticle", () => {
  test("starts loading as fetching data", () => {
    get.mockReturnValue(new Promise(() => {}));
    const { result } = renderHook(() => useUsers());

    expect(result.current.users).toEqual([]);
    expect(result.current.loading).toBe(true);
    expect(result.current.error).toBe(null);
  });

  test("returns an array of users successfully", async () => {
    const mockServerResponse = [
      {
        username: "tickle122",
        name: "Tom Tickle",
        avatar_url:
          "https://vignette.wikia.nocookie.net/mrmen/images/d/d6/Mr-Tickle-9a.png/revision/latest?cb=20180127221953",
      },
      {
        username: "grumpy19",
        name: "Paul Grump",
        avatar_url:
          "https://vignette.wikia.nocookie.net/mrmen/images/7/78/Mr-Grumpy-3A.PNG/revision/latest?cb=20170707233013",
      },
      {
        username: "happyamy2016",
        name: "Amy Happy",
        avatar_url:
          "https://vignette1.wikia.nocookie.net/mrmen/images/7/7f/Mr_Happy.jpg/revision/latest?cb=20140102171729",
      },
    ];

    get.mockResolvedValueOnce({ users: mockServerResponse });

    const { result } = renderHook(() => useUsers());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(get).toHaveBeenCalledWith("/users");
    expect(result.current.users).toEqual(mockServerResponse);
    expect(result.current.error).toBe(null);
  });

  test("handles API failure", async () => {
    get.mockRejectedValue(new Error("Network error"));

    const { result } = renderHook(() => useUsers());

    await act(async () => {
      try {
        await result.current.getUsers();
      } catch (error) {}
    });

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.users).toEqual([]);
    expect(result.current.error).toBeInstanceOf(Error);
    expect(result.current.error.message).toBe("Network error");
  });
});
