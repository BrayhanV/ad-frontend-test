import { MlProductImageProps } from "./type";
import { MlProductImageClasses, MlProductImageVariant } from "./config";

export const MlProductImage = ({
  src,
  alt,
  isNew,
  newLabel,
  variant,
}: MlProductImageProps) => {
  return (
    <div
      className={`relative ${MlProductImageClasses[variant ?? MlProductImageVariant.CATALOG]}`}
    >
      {isNew && (
        <span className="absolute top-3 left-3 z-10 px-3 py-2 bg-stone-100 text-primary text-sm rounded-[4px]">
          {newLabel}
        </span>
      )}
      <figure>
        <img
          className={`object-cover ${MlProductImageClasses[variant ?? MlProductImageVariant.CATALOG]}`}
          src={src}
          alt={alt}
        />
      </figure>
    </div>
  );
};
