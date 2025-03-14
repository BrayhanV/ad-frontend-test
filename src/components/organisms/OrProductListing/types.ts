import { Product } from "@/models/product";

export enum OrProductListingButtonText {
  SEE_MORE = "SEE MORE",
}

export interface OrProductListingProps {
  products: Product[];
  loading?: boolean;
  onLoadMore?: () => void;
  onAddProductToCart: (product: Product) => void;
}