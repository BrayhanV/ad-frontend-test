'use client'

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useMemo } from "react";
import { DEFAULT_GENRE, getGames } from "@/services/games";
import { GetGamesResponse } from "@/services/games/types";
import { useAsyncState } from "@/hooks/useAsyncState";
import { MlProductCardSkeleton } from "@/components/molecules/MlProductCard/skeleton";
import { AtSelect } from "@/components/atoms/AtSelect";
import { OrProductListing } from "@/components/organisms/OrProductListing";

export const TmHome = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const selectedGenre = useMemo(() => {
    const genre = searchParams.get('genre');
    return genre && genre !== DEFAULT_GENRE ? genre : DEFAULT_GENRE;
  }, [searchParams]);

  const { 
    value: gamesData, 
    loading 
  } = useAsyncState<GetGamesResponse>(
    () => getGames({genre: selectedGenre, page: 1 }), 
    [selectedGenre]
  );
  
  const handleGenreChange = useCallback((genre: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('genre', genre);
    router.push(`?${params.toString()}`);
  }, [searchParams, router]);

 return (
  <main className='flex flex-col min-h-full px-6 md:px-32'>
    <div className="flex flex-col min-w-full gap-8 py-6 md:py-12">
      <h1 className="text-primary font-bold text-xl md:text-2xl">TOP SELLERS</h1>
      
      <div className="flex flex-row gap-6 min-w-full md:min-w-fit md:max-w-fit items-center md:self-end">
        <label htmlFor="genre" className="text-lg font-bold text-primary">Genre</label>
        <div className="h-[22px] w-px border-solid border-r border-primary" />
        <AtSelect
          id="genre" 
          name="genre" 
          options={[DEFAULT_GENRE, ...gamesData?.availableFilters ?? []]}
          value={selectedGenre}
          onChange={handleGenreChange}
        />
      </div>
    </div>

    {loading ? <MlProductCardSkeleton /> : <OrProductListing products={gamesData?.games ?? []} />}
  </main>
 )
};