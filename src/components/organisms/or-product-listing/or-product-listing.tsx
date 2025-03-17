"use client";
import { MlProductCard } from "@/components/molecules/ml-product-card";
import {
  OrProductListingButtonText,
  OrProductListingProps,
} from "./or-product-listing.types";
import { useCallback, useRef } from "react";
import { useCartStore } from "@/stores/cart";
import { AtButton, AtButtonColor } from "@/components/atoms/at-button";
import { MlProductCardSkeleton } from "@/components/molecules/ml-product-card-skeleton";

export const OrProductListing = ({
  products = [],
  loading,
  onLoadMore,
  onAddProductToCart,
}: OrProductListingProps) => {
  const games = useCartStore((state) => state.products);
  const bottomRef = useRef<HTMLDivElement>(null);

  const handleLoadMore = useCallback(async () => {
    if (onLoadMore) {
      onLoadMore();
      setTimeout(
        () => bottomRef.current?.scrollIntoView({ behavior: "smooth" }),
        100,
      );
    }
  }, [onLoadMore]);

  return (
    <section className="flex flex-col px-6 md:px-32 py-8 md:py-12 gap-12">
      <ul className="flex flex-col md:flex-row md:flex-wrap gap-6 md:gap-12">
        {products.map((product) => (
          <li key={product.id}>
            <MlProductCard
              product={product}
              isProductInCart={!!games.get(product.id)}
              onClickButton={onAddProductToCart}
            />
          </li>
        ))}
        {loading && (
          <>
            <li className="-mr-6 md:-mr-12">
              <div ref={bottomRef} data-testid="scroll-div" />
            </li>
            {[...Array(3)].map((_, index) => (
              <li key={index}>
                <MlProductCardSkeleton />
              </li>
            ))}
          </>
        )}
      </ul>
      {!!products.length && (
        <AtButton
          fit={true}
          color={AtButtonColor.SECONDARY}
          disabled={!onLoadMore || loading}
          onClick={handleLoadMore}
        >
          {OrProductListingButtonText.SEE_MORE}
        </AtButton>
      )}
    </section>
  );
};
