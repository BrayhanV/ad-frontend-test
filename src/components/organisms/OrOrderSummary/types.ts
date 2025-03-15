import { Product } from "@/models/Product";

export enum OrOrderSummaryItemLabel {
  ITEMS = 'items',
  ITEM = 'item',
}

export enum OrOrderSummaryTotalLabel {
  TOTAL = 'Order Total',
}

export interface OrOrderSummaryProps {
  products: Product[];
  total: number;
  itemLabel: OrOrderSummaryItemLabel;
  totalLabel: OrOrderSummaryTotalLabel;
}