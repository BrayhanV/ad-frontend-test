import { AtButton } from "@/components/atoms/AtButton";
import { AtButtonColor } from "@/components/atoms/AtButton/config";
import { MlProductCard } from "@/components/molecules/MlProductCard";
import { MlProductCardSkeleton } from "@/components/molecules/MlProductCard/skeleton";
import { OrProductListingProps } from "./types";
import useCartStore from "@/app/stores/cart";

export const OrProductListing = ({ products, loading, onLoadMore, onAddProductToCart }: OrProductListingProps) => {
  const games = useCartStore(state => state.games);

  return (
    <section className="flex flex-col py-8 md:py-12 gap-12">
      <div className="flex flex-col md:flex-row md:flex-wrap gap-6 md:gap-12">
        {products.map((product) => (
          <MlProductCard key={product.id} product={product} isProductInCart={!!games.get(product.id)} onClickButton={onAddProductToCart} />
        )) }
        {loading && <MlProductCardSkeleton />}
      </div>
      {!!products.length && ( 
        <AtButton 
          color={AtButtonColor.SECONDARY} 
          disabled={!onLoadMore || loading} 
          onClick={onLoadMore}
        >
          SEE MORE
        </AtButton>
      )}
    </section>
  )
}