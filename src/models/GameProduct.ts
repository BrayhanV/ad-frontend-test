import { Game } from "@/utils/endpoint";
import { Product } from "./Product";

export class GameProduct extends Product {
  constructor(game: Game) {
    super(
      game.id,
      game.name,
      game.description,
      game.price,
      game.image,
      game.genre,
      game.isNew,
    );
  }
}
