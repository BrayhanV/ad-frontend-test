import { Product } from "@/models/Product";

export interface MlCardBasketProps {
  product: Product;
  onClickButton: (product: Product) => void;
}
