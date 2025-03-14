import { Game } from "@/utils/endpoint";

export interface MlProductCardProps {
  product: Game;
  isProductInCart: boolean;
  onClickButton: (product: Game) => void;
}