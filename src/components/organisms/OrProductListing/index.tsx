"use client";
import { AtButton } from "@/components/atoms/AtButton";
import { AtButtonColor } from "@/components/atoms/AtButton/config";
import { MlProductCard } from "@/components/molecules/MlProductCard";
import { MlProductCardSkeleton } from "@/components/molecules/MlProductCard/skeleton";
import { OrProductListingButtonText, OrProductListingProps } from "./types";
import { useCallback, useRef } from "react";
import { useCartStore } from "@/stores/cart";

export const OrProductListing = ({
  products,
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
    <section className="flex flex-col py-8 md:py-12 gap-12">
      <div className="flex flex-col md:flex-row md:flex-wrap gap-6 md:gap-12">
        {products.map((product) => (
          <MlProductCard
            key={product.id}
            product={product}
            isProductInCart={!!games.get(product.id)}
            onClickButton={onAddProductToCart}
          />
        ))}
        {loading && (
          <>
            <div className="hidden" ref={bottomRef} />
            {[...Array(3)].map((_, index) => (
              <MlProductCardSkeleton key={index} />
            ))}
          </>
        )}
      </div>
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
