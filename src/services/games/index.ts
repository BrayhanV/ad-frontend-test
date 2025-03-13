import { GetGamesParams, GetGamesResponse } from "./types";

export const DEFAULT_GENRE = "All";

export const getGames = async ({ genre, page }: GetGamesParams): Promise<GetGamesResponse> => {
  try {
    const genreQuery = genre && genre !== DEFAULT_GENRE ? `${genre}` : "";
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/games?genre=${genreQuery}&page=${page}`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error("Error fetching games:", error);
    // Puedes devolver un valor por defecto o propagar el error
    return { 
      games: [],
      availableFilters: [], 
      totalPages: 0, 
      currentPage: 1,
      error: "Failed to fetch games" 
    };
  }
};