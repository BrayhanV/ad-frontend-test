import { Product } from "@/models/Product";

export enum MlProductCardButtonText {
  ADD_TO_CART = "ADD TO CART",
  REMOVE = "REMOVE",
}

export interface MlProductCardProps {
  product: Product;
  isProductInCart: boolean;
  onClickButton: (product: Product) => void;
}
