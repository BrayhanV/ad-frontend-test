import { Game } from "@/utils/endpoint";

export type CartState = {
  games: Map<string, Game>;
  total: number;
}

export type CartActions = {
  addGame: (game: Game) => void;
  removeGame: (gameId: string) => void;
  clearCart: () => void;
}

export type CartStore = CartState & CartActions;