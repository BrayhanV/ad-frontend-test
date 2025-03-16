import { MlProductImageVariant } from "./ml-product-image.classes";

export enum MlProductImageNewLabel {
  NEW = "New",
}

export interface MlProductImageProps {
  src: string;
  alt: string;
  newLabel?: MlProductImageNewLabel;
  isNew?: boolean;
  variant?: MlProductImageVariant;
}
