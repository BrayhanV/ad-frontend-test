import { AtIcon } from "@/components/atoms/at-icon/at-icon";
import { MlProductImage } from "../MlProductImage";
import { MlProductImageVariant } from "../MlProductImage/config";
import { MlCardBasketProps } from "./ml-card-basket.types";

export const MlCardBasket = ({ product, onClickButton }: MlCardBasketProps) => {
  return (
    <article className="flex flex-col px-4 py-5 gap-4 border-b-[0.5px] last:border-0 border-stroke-secondary">
      <div className="flex flex-row items-start gap-3 md:gap-6">
        <div className="flex flex-col md:flex-row gap-4 md:gap-6">
          <MlProductImage
            src={product.image}
            alt={product.name}
            variant={MlProductImageVariant.CART}
          />

          <div className="flex flex-col gap-6 w-full">
            <p className="font-bold text-sm text-neutral-500 tracking-normal">
              {product.label.toUpperCase()}
            </p>
            <div className="flex flex-col gap-2">
              <h2 className="text-primary text-base font-bold tracking-wide">
                {product.name}
              </h2>
              <p className="text-neutral-500 text-sm tracking-normal">
                {product.description}
              </p>
            </div>

            <div className="h-10 content-end self-end items-end">
              <p className="w-fit text-primary text-base font-bold tracking-wide">
                ${product.price}
              </p>
            </div>
          </div>
        </div>

        <AtIcon
          src="/icons/close.svg"
          alt="close"
          onClick={() => onClickButton(product)}
        />
      </div>
    </article>
  );
};
