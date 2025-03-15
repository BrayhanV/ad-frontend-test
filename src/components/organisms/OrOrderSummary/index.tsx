import { AtSeparator } from "@/components/atoms/AtSeparator";
import { OrOrderSummaryProps, OrOrderSummaryTitle } from "./types";
import { AtButton } from "@/components/atoms/AtButton";
import { AtButtonColor } from "@/components/atoms/AtButton/config";
import { TmCartButtonLabel } from "@/components/templates/TmCart/types";

export const OrOrderSummary = ({
  total,
  products,
  itemLabel,
  totalLabel,
}: OrOrderSummaryProps) => {
  return (
    <div className="flex flex-col gap-8 md:gap-10 w-[522px]">
      <div className="flex flex-col gap-6 md:gap-8 px-4 md:px-6 py-6 md:py-8 border-[0.5px] border-stroke-primary rounded-lg">
        <div className="flex flex-col gap-3">
          <h2 className="text-primary text-lg font-bold tracking-wide">
            {OrOrderSummaryTitle.ORDER_SUMMARY}
          </h2>
          <p className="text-primary text-base">
            {products.length} {itemLabel}
          </p>
        </div>

        <div className="flex flex-col gap-6 py-6">
          <div className="flex flex-col gap-3">
            {products.map((product) => (
              <div key={product.id} className="flex justify-between">
                <p className="text-primary text-base tracking-wide">
                  {product.name}
                </p>
                <p className="text-primary text-base tracking-wide">
                  $ {product.price}
                </p>
              </div>
            ))}
          </div>
          <AtSeparator color="stroke-secondary" height={1} />
          <div className="flex justify-between">
            <p className="text-primary text-lg font-bold tracking-wide">
              {totalLabel}
            </p>
            <p className="text-primary text-lg font-bold tracking-wide">
              $ {total}
            </p>
          </div>
        </div>
      </div>
      <AtButton color={AtButtonColor.SECONDARY}>
        {TmCartButtonLabel.CHECKOUT}
      </AtButton>
    </div>
  );
};
