import { Product } from "@/app/models/product";

export interface MlProductCardProps {
  product: Product;
  isProductInCart: boolean;
  onClickButton: (product: Product) => void;
}