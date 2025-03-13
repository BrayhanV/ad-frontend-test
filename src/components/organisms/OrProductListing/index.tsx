import { AtButton } from "@/components/atoms/AtButton";
import { AtButtonColor } from "@/components/atoms/AtButton/config";
import { MlProductCard } from "@/components/molecules/MlProductCard";
import { Game } from "@/utils/endpoint";

interface OrProductListingProps {
  products: Game[];
}

export const OrProductListing = ({ products }: OrProductListingProps) => {
  return (
    <section className="flex flex-col py-8 md:py-12 gap-12">
      <div className="flex flex-col md:flex-row md:flex-wrap gap-6 md:gap-12">
        {products.map((product) => (
          <MlProductCard key={product.id} {...product} />
        ))}
      </div>
      <AtButton color={AtButtonColor.SECONDARY}>SEE MORE</AtButton>
    </section>
  )
}