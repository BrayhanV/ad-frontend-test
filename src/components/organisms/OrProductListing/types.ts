import { Product } from "@/models/Product";

export enum OrProductListingButtonText {
  SEE_MORE = "SEE MORE",
}

export interface OrProductListingProps {
  products: Product[];
  loading?: boolean;
  onLoadMore?: () => void;
  onAddProductToCart: (product: Product) => void;
}
