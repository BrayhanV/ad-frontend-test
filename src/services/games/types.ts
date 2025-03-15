import { Product } from "@/models/Product";
export interface GetGamesParams {
  genre: string;
  page: number;
}

export interface GetGamesResponse {
  games: Product[];
  availableFilters: string[];
  totalPages: number;
  currentPage: number;
  error?: string;
}
