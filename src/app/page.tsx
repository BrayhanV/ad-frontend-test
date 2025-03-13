import { AtSelect } from "@/components/atoms/AtSelect";
import { OrProductListing } from "@/components/organisms/OrProductListing";
import { getGames } from "@/services/games";

export default async function Home() {
  const gamesData = await getGames("", 1);

  return (
    <main className='flex flex-col min-h-full px-6 md:px-32'>
      <div className="flex flex-col min-w-full gap-8 py-6 md:py-12">
        <h1 className="text-primary font-bold text-xl md:text-2xl">TOP SELLERS</h1>
        
        <div className="flex flex-row gap-6 min-w-full md:min-w-fit md:max-w-fit items-center md:self-end">
          <label htmlFor="genre" className="text-lg font-bold text-primary">Genre</label>
          <div className="h-[22px] w-px border-solid border-r border-primary" />
          <AtSelect id="genre" name="genre" options={["All", ...gamesData.availableFilters]} />
        </div>
      </div>
      <OrProductListing products={gamesData.games} />
    </main>
  )
}
