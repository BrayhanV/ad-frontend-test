import { MlProductCard } from "@/components/molecules/MlProductCard";
import { Game } from "@/utils/endpoint";

interface OrProductListingProps {
  products: Game[];
}

export const OrProductListing = ({ products }: OrProductListingProps) => {
  return (
    <div className="flex flex-col md:flex-row md:flex-wrap py-8 md:py-12 gap-6 md:gap-12">
      {products.map((product) => (
        <MlProductCard key={product.id} {...product} />
      ))}
    </div>
  )
}