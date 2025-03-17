import { GameProduct } from "@/models/GameProduct";
import { GetGamesParams, GetGamesResponse } from "./games.types";
import { Game } from "@/utils/endpoint";

export const DEFAULT_GENRE = "All";

export const getGames = async ({
  genre,
  page,
}: GetGamesParams): Promise<GetGamesResponse> => {
  try {
    const genreQuery = genre && genre !== DEFAULT_GENRE ? `${genre}` : "";
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/games?genre=${genreQuery}&page=${page}`,
      {
        cache: "no-store",
      },
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    return {
      ...data,
      games: data.games.map((game: Game) => new GameProduct(game)),
    };
  } catch (error) {
    console.error("Error fetching games:", error);
    return {
      games: [],
      availableFilters: [],
      totalPages: 0,
      currentPage: 1,
      error: "Failed to fetch games",
    };
  }
};
