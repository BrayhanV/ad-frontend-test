import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { CartState, CartStore } from './types';
import { Product } from '@/app/models/product';

const defaultInitState: CartState = {
  products: new Map<string, Product>(),
  total: 0,
};

const useCartStore = create<CartStore>()(
  persist(
    (set) => ({
      ...defaultInitState,
      addGame: (game) => set((state) => {
        const newGames = new Map(state.products).set(game.id, game);
        return {
          products: newGames,
          total: state.total + game.price,
        };
      }),
      removeGame: (gameId) => set((state) => {
        const game = state.products.get(gameId);
        if (!game) return state;

        const newGames = new Map(state.products);
        newGames.delete(gameId);
        return {
          products: newGames,
          total: state.total - game.price,
        };
      }),
      clearCart: () => set(() => defaultInitState),
    }),
    {
      name: 'cart-storage',
      partialize: (state) => ({
        products: Array.from(state.products.entries()),
        total: state.total,
      }),
      onRehydrateStorage: () => (state) => {
        if (state) {
          state.products = new Map(state.products);
        }
      },
    }
  )
);

export default useCartStore;
