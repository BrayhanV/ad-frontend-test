import { getGames, DEFAULT_GENRE } from "./games";
import { Game } from "@/utils/endpoint";
import { GameProduct } from "@/models/GameProduct";

const originalEnv = process.env.NEXT_PUBLIC_API_URL;

describe("getGames", () => {
  beforeEach(() => {
    process.env.NEXT_PUBLIC_API_URL = "https://api.example.com";

    jest.clearAllMocks();

    jest.spyOn(console, "error").mockImplementation(() => {});
  });

  afterEach(() => {
    process.env.NEXT_PUBLIC_API_URL = originalEnv;

    jest.restoreAllMocks();
  });

  it("should fetch games with the correct URL when genre is DEFAULT_GENRE", async () => {
    const mockResponse = {
      games: [
        { id: "1", name: "Game 1", price: 10 },
        { id: "2", name: "Game 2", price: 20 },
      ],
      availableFilters: ["action", "adventure"],
      totalPages: 2,
      currentPage: 1,
    };

    global.fetch = jest.fn().mockResolvedValueOnce({
      ok: true,
      json: jest.fn().mockResolvedValueOnce(mockResponse),
    });

    const result = await getGames({ genre: DEFAULT_GENRE, page: 1 });

    expect(fetch).toHaveBeenCalledWith(
      "https://api.example.com/games?genre=&page=1",
      { cache: "no-store" },
    );

    expect(result.games).toHaveLength(2);
    expect(result.games[0]).toBeInstanceOf(GameProduct);
    expect(result.games[1]).toBeInstanceOf(GameProduct);
    expect(result.availableFilters).toEqual(["action", "adventure"]);
    expect(result.totalPages).toBe(2);
    expect(result.currentPage).toBe(1);
  });

  it("should fetch games with the correct URL when genre is specific", async () => {
    const mockResponse = {
      games: [{ id: "1", name: "Game 1", price: 10 }],
      availableFilters: ["action", "adventure"],
      totalPages: 1,
      currentPage: 1,
    };

    global.fetch = jest.fn().mockResolvedValueOnce({
      ok: true,
      json: jest.fn().mockResolvedValueOnce(mockResponse),
    });

    const result = await getGames({ genre: "action", page: 1 });

    expect(fetch).toHaveBeenCalledWith(
      "https://api.example.com/games?genre=action&page=1",
      { cache: "no-store" },
    );

    expect(result.games).toHaveLength(1);
    expect(result.availableFilters).toEqual(["action", "adventure"]);
    expect(result.totalPages).toBe(1);
    expect(result.currentPage).toBe(1);
  });

  it("should transform Game objects to GameProduct instances", async () => {
    const mockGameData: Game = {
      id: "1",
      name: "Test Game",
      price: 59.99,
      description: "A test game",
      genre: "action",
      isNew: true,
      image: "/test.jpg",
    };

    const mockResponse = {
      games: [mockGameData],
      availableFilters: ["action"],
      totalPages: 1,
      currentPage: 1,
    };

    global.fetch = jest.fn().mockResolvedValueOnce({
      ok: true,
      json: jest.fn().mockResolvedValueOnce(mockResponse),
    });

    const result = await getGames({ genre: "action", page: 1 });

    expect(result.games[0]).toBeInstanceOf(GameProduct);
    expect(result.games[0].id).toBe("1");
    expect(result.games[0].name).toBe("Test Game");
    expect(result.games[0].price).toBe(59.99);
  });

  it("should handle HTTP errors", async () => {
    global.fetch = jest.fn().mockResolvedValueOnce({
      ok: false,
      status: 404,
    });

    const result = await getGames({ genre: "action", page: 1 });

    expect(console.error).toHaveBeenCalledWith(
      "Error fetching games:",
      expect.any(Error),
    );

    expect(result).toEqual({
      games: [],
      availableFilters: [],
      totalPages: 0,
      currentPage: 1,
      error: "Failed to fetch games",
    });
  });

  it("should handle network errors", async () => {
    global.fetch = jest.fn().mockRejectedValueOnce(new Error("Network error"));

    const result = await getGames({ genre: "action", page: 1 });

    expect(console.error).toHaveBeenCalledWith(
      "Error fetching games:",
      expect.any(Error),
    );

    expect(result).toEqual({
      games: [],
      availableFilters: [],
      totalPages: 0,
      currentPage: 1,
      error: "Failed to fetch games",
    });
  });

  it("should handle null genre", async () => {
    const mockResponse = {
      games: [],
      availableFilters: [],
      totalPages: 0,
      currentPage: 1,
    };

    global.fetch = jest.fn().mockResolvedValueOnce({
      ok: true,
      json: jest.fn().mockResolvedValueOnce(mockResponse),
    });

    await getGames({ genre: "", page: 1 });

    expect(fetch).toHaveBeenCalledWith(
      "https://api.example.com/games?genre=&page=1",
      { cache: "no-store" },
    );
  });
});
