import { MlProductCardProps } from "./types";
import { MlProductImage } from "../MlProductImage";
import { MlProductImageVariant } from "../MlProductImage/config";
import { MlProductImageNewLabel } from "../MlProductImage/type";
import {
  AtButton,
  AtButtonColor,
  AtButtonVariant,
} from "@/components/atoms/at-button";

export const MlProductCard = ({
  product,
  isProductInCart,
  onClickButton,
}: MlProductCardProps) => {
  return (
    <article className="w-full h-fit md:w-[380px] flex flex-col rounded-2xl overflow-hidden p-6 gap-5 border-stroke-secondary border-[0.5px]">
      <MlProductImage
        variant={MlProductImageVariant.CATALOG}
        newLabel={MlProductImageNewLabel.NEW}
        isNew={product.isNew}
        src={product.image}
        alt={product.name}
      />
      <div className="flex flex-col gap-3">
        <p className="font-bold text-sm text-neutral-500 tracking-normal">
          {product.label.toUpperCase()}
        </p>
        <div className="flex flex-row justify-between items-start gap-2">
          <h2 className="text-primary text-base font-bold tracking-wide">
            {product.name}
          </h2>
          <p className="text-lg font-bold tracking-wide">${product.price}</p>
        </div>
      </div>
      <AtButton
        variant={AtButtonVariant.DESKTOP}
        color={AtButtonColor.PRIMARY}
        onClick={() => onClickButton(product)}
      >
        {isProductInCart ? "REMOVE" : "ADD TO CART"}
      </AtButton>
    </article>
  );
};
