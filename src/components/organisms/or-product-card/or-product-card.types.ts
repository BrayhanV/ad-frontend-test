import { Product } from "@/models/Product";

export enum OrProductCardButtonText {
  ADD_TO_CART = "ADD TO CART",
  REMOVE = "REMOVE",
}

export interface OrProductCardProps {
  product: Product;
  isProductInCart: boolean;
  onClickButton: (product: Product) => void;
}
