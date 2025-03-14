import { MlProductImageVariant } from "./config";

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