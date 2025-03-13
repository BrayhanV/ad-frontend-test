import { Game } from "@/utils/endpoint"
import { AtButton } from "../../atoms/AtButton"
import { AtButtonColor, AtButtonVariant } from "@/components/atoms/AtButton/config"

export const MlProductCard = ({name, price, image, genre}: Game) => {
  return (  
    <article className="w-full h-fit md:w-[380px] flex flex-col rounded-2xl overflow-hidden p-6 gap-5 border-stroke-secondary border-[0.5px]">
      <figure>
        <img 
          className="w-full h-[240px] rounded-t-2xl"
          src={image ? image : "/no-image.png"} 
          alt={name} 
        />
      </figure>
      <div className="flex flex-col gap-3">
        <p className="font-bold text-sm text-neutral-500 tracking-normal">
          {genre.toUpperCase()}
        </p>
        <div className="flex flex-row justify-between items-start gap-2">
          <h2 className="text-base font-bold tracking-wide">{name}</h2>
          <p className="text-lg font-bold tracking-wide">${price}</p>
        </div>
      </div>
      <AtButton variant={AtButtonVariant.DESKTOP} color={AtButtonColor.PRIMARY}>ADD TO CART</AtButton>
    </article >
  )
}