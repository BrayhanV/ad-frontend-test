'use client'
import MlLink from "@/components/molecules/MlLink"
import { OrOrderSummary } from "@/components/organisms/OrOrderSummary"
import { TmCartProductLabels, TmCartTitles } from "./types"
import { useShallow } from "zustand/shallow"
import { useMemo } from "react"
import { useCartStore } from "@/stores/cart"

export const TmCart = () => {
  const { products, total } = useCartStore(useShallow(state => ({
    products: state.products,
    total: state.total
  })))

  const productsArray = useMemo(() => Array.from(products.values()), [products])

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
      <div className="flex flex-col py-8 md:py-12 gap-8 md:gap-12">
        <div className="flex flex-col gap-3">
          <h2 className="text-primary text-xl md:text-2xl font-bold tracking-wide">{TmCartTitles.YOUR_CART}</h2>
          <h3 className="text-primary text-lg md:text-xl">{productsArray.length} {TmCartProductLabels.ITEMS}</h3>
        </div>

        <div className="flex flex-col md:flex-row gap-12 md:gap-20">
          <div className="flex flex-col gap-0">
            Product List ${total}
          </div>

          <OrOrderSummary />
        </div>
      </div>
    </>
  )
}