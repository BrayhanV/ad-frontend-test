import { Product } from "@/app/models/product";

export interface OrProductListingProps {
  products: Product[];
  loading?: boolean;
  onLoadMore?: () => void;
  onAddProductToCart: (product: Product) => void;
}