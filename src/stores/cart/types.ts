import { Product } from "@/models/product";
export type CartState = {
  products: Map<string, Product>;
  total: number;
}

export type CartActions = {
  addGame: (game: Product) => void;
  removeGame: (gameId: string) => void;
  clearCart: () => void;
}

export type CartStore = CartState & CartActions;