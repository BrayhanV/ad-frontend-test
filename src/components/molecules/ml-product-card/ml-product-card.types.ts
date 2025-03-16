import { Product } from "@/models/Product";

export interface MlProductCardProps {
  product: Product;
  isProductInCart: boolean;
  onClickButton: (product: Product) => void;
}
