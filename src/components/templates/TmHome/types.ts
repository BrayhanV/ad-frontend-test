export enum TmHomeTitles {
  TOP_SELLERS = "Top Sellers",
}

export enum TmHomeFilterLabels {
  GENRE = "Genre",
}

export interface TmHomeProps {
  searchParams: { [key: string]: string | string[] | undefined };
}
