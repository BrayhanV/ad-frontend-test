import { MlProductImageProps } from "./ml-product-image.types";
import {
  MlProductImageClasses,
  MlProductImageVariant,
} from "./ml-product-image.classes";

export const MlProductImage = ({
  src,
  alt,
  isNew,
  newLabel,
  variant = MlProductImageVariant.CATALOG,
}: MlProductImageProps) => {
  return (
    <div className={`relative ${MlProductImageClasses[variant]}`}>
      {isNew && (
        <span className="absolute top-3 left-3 z-10 px-3 py-2 bg-stone-100 text-primary text-sm rounded-[4px]">
          {newLabel}
        </span>
      )}
      <figure>
        <img
          className={`object-cover ${MlProductImageClasses[variant]}`}
          src={src}
          alt={alt}
        />
      </figure>
    </div>
  );
};
