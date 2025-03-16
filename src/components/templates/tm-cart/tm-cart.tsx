"use client";
import { MlLink } from "@/components/molecules/ml-link/ml-link";
import { TmCartProductLabels, TmCartTitles } from "./tm-cart.types";
import { useShallow } from "zustand/shallow";
import { useCallback, useMemo } from "react";
import { useCartStore } from "@/stores/cart";
import { MlCardBasket } from "@/components/molecules/ml-card-basket";
import { Product } from "@/models/Product";
import {
  OrOrderSummary,
  OrOrderSummaryItemLabel,
  OrOrderSummaryTotalLabel,
} from "@/components/organisms/or-order-summary";

export const TmCart = () => {
  const { products, total, removeProduct } = useCartStore(
    useShallow((state) => ({
      products: state.products,
      total: state.total,
      removeProduct: state.removeProduct,
    })),
  );

  const productsArray = useMemo(
    () => Array.from(products.values()),
    [products],
  );

  const handleRemoveProduct = useCallback(
    (product: Product) => {
      removeProduct(product.id);
    },
    [removeProduct],
  );

  return (
    <>
      <div className="py-4 md:py-6">
        <MlLink
          href="/"
          iconProps={{
            src: "/icons/back-arrow.svg",
            alt: "back arrow",
          }}
          label="Back to Catalog"
        />
      </div>
      <section className="flex flex-col py-8 md:py-12 gap-8 md:gap-12">
        <section className="flex flex-col gap-3">
          <h2 className="text-primary text-xl md:text-2xl font-bold tracking-wide">
            {TmCartTitles.YOUR_CART}
          </h2>
          <h3 className="text-primary text-lg md:text-xl">
            {productsArray.length} {TmCartProductLabels.ITEMS}
          </h3>
        </section>

        <section className="flex flex-col md:flex-row gap-12 md:gap-20">
          {!!productsArray.length && (
            <ul className="flex flex-col gap-0">
              {productsArray.map((product) => (
                <li key={product.id}>
                  <MlCardBasket
                    product={product}
                    onClickButton={handleRemoveProduct}
                  />
                </li>
              ))}
            </ul>
          )}

          <OrOrderSummary
            itemLabel={
              productsArray.length === 1
                ? OrOrderSummaryItemLabel.ITEM
                : OrOrderSummaryItemLabel.ITEMS
            }
            totalLabel={OrOrderSummaryTotalLabel.TOTAL}
            products={productsArray}
            total={total}
          />
        </section>
      </section>
    </>
  );
};
