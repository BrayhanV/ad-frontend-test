export enum MlProductImageVariant {
  CATALOG = "catalog",
  CART = "cart",
}

export const MlProductImageClasses = {
  [MlProductImageVariant.CATALOG]: "w-full h-[240px] rounded-t-2xl",
  [MlProductImageVariant.CART]: "min-w-[256px] md:w-[259px] h-[136px] md:h-[156px]",
}