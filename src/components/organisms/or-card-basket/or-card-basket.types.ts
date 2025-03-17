import { Product } from "@/models/Product";

export interface OrCardBasketProps {
  product: Product;
  onClickButton: (product: Product) => void;
}
