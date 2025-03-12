import { Game } from "@/utils/endpoint";

export interface GetGamesResponse {
  games: Game[];
  availableFilters: string[];
  totalPages: number;
  currentPage: number;
  error?: string;
}
