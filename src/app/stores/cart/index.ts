import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { CartState, CartStore } from './types';
import { Game } from '@/utils/endpoint';

const defaultInitState: CartState = {
  games: new Map<string, Game>(),
  total: 0,
};

const useCartStore = create<CartStore>()(
    persist(
      (set) => ({
        ...defaultInitState,
        addGame: (game) => set((state) => {
          const newGames = new Map(state.games).set(game.id, game);
          return {
            games: newGames,
            total: state.total + game.price
          };
        }),
        removeGame: (gameId) => set((state) => {
          const game = state.games.get(gameId);
          if (!game) return state;

          const newGames = new Map(state.games);
          newGames.delete(gameId);
          return {
            games: newGames,
            total: state.total - game.price
          };
        }),
        clearCart: () => set(() => defaultInitState),
      }),
      {
        name: 'cart-storage',
        partialize: (state) => ({ 
          games: new Map(state.games),
          total: state.total
        }),
      }
    )
  );

export default useCartStore;