import { Game } from "@/utils/endpoint";

export interface OrProductListingProps {
  products: Game[];
  loading?: boolean;
  onLoadMore?: () => void;
  onAddProductToCart: (product: Game) => void;
}