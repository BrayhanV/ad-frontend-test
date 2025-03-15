"use client";
import { Product } from "@/models/Product";
import { AtSelect } from "@/components/atoms/AtSelect";
import { OrProductListing } from "@/components/organisms/OrProductListing";
import { useAsyncState } from "@/hooks/useAsyncState";
import { DEFAULT_GENRE, getGames } from "@/services/games";
import { GetGamesParams, GetGamesResponse } from "@/services/games/types";
import { useSearchParams, useRouter } from "next/navigation";
import { useCallback, useMemo, useState } from "react";
import { useShallow } from "zustand/shallow";
import { useCartStore } from "@/stores/cart";

export const TmHome = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [page, setPage] = useState(1);
  const { games, addGame, removeGame } = useCartStore(
    useShallow((state) => ({
      games: state.products,
      addGame: state.addProduct,
      removeGame: state.removeProduct,
    })),
  );

  const selectedGenre = useMemo(() => {
    const genre = searchParams.get("genre");
    return genre && genre !== DEFAULT_GENRE ? genre : DEFAULT_GENRE;
  }, [searchParams]);

  const {
    value: gamesData,
    loading,
    fetchMore,
    reset,
  } = useAsyncState<GetGamesResponse, GetGamesParams>(
    (params) => getGames(params || { genre: selectedGenre, page: 1 }),
    [selectedGenre],
    {
      mergeData: (prev, next) => {
        return {
          ...next,
          games: [...(prev?.games || []), ...next.games],
        };
      },
    },
  );

  const canLoadMore = useMemo(() => {
    if (!gamesData) return false;

    return gamesData.currentPage < gamesData.totalPages;
  }, [gamesData, gamesData]);

  const handleGenreChange = useCallback(
    (genre: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set("genre", genre);
      router.push(`?${params.toString()}`);
      setPage(1);
      reset();
    },
    [searchParams, router],
  );

  const handleLoadMore = useCallback(() => {
    const nextPage = page + 1;
    fetchMore({
      genre: selectedGenre,
      page: nextPage,
    });
    setPage(nextPage);
  }, [page, selectedGenre, fetchMore]);

  const handleAddToCart = useCallback(
    (game: Product) => {
      if (games.get(game.id)) {
        removeGame(game.id);
      } else {
        addGame(game);
      }
    },
    [games, addGame, removeGame],
  );

  return (
    <>
      <div className="flex flex-col min-w-full gap-8 py-6 md:py-12">
        <h1 className="text-primary font-bold text-xl md:text-2xl">
          TOP SELLERS
        </h1>

        <div className="flex flex-row gap-6 min-w-full md:min-w-fit md:max-w-fit items-center md:self-end">
          <label htmlFor="genre" className="text-lg font-bold text-primary">
            Genre
          </label>
          <div className="h-[22px] w-px border-solid border-r border-primary" />
          <AtSelect
            id="genre"
            name="genre"
            options={[DEFAULT_GENRE, ...(gamesData?.availableFilters ?? [])]}
            value={selectedGenre}
            onChange={handleGenreChange}
          />
        </div>
      </div>

      <OrProductListing
        loading={loading}
        products={gamesData?.games ?? []}
        onAddProductToCart={handleAddToCart}
        onLoadMore={canLoadMore ? handleLoadMore : undefined}
      />
    </>
  );
};
