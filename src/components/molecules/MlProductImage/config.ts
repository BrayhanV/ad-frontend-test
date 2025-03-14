export enum MlProductImageVariant {
  CATALOG = "catalog",
  CART = "cart",
}

export const MlProductImageClasses = {
  [MlProductImageVariant.CATALOG]: "w-full h-[240px] rounded-t-2xl",
  [MlProductImageVariant.CART]: "w-[259px] p-2",
}