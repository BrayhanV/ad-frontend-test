import { render, screen } from "@testing-library/react";
import {
  OrOrderSummaryItemLabel,
  OrOrderSummaryTotalLabel,
  type OrOrderSummaryProps,
} from "./or-order-summary.types";
import { Product } from "@/models/Product";
import { OrOrderSummary } from "./or-order-summary";

jest.mock("@/components/atoms/at-separator/at-separator", () => ({
  AtSeparator: ({ color, height }: { color: string; height: number }) => (
    <hr data-testid="separator" data-color={color} data-height={height} />
  ),
}));

jest.mock("@/components/atoms/at-button", () => ({
  AtButton: ({
    color,
    variant,
    children,
  }: {
    color: string;
    variant?: string;
    children: React.ReactNode;
  }) => (
    <button
      data-testid="checkout-button"
      data-color={color}
      data-variant={variant}
    >
      {children}
    </button>
  ),
  AtButtonColor: { SECONDARY: "secondary" },
  AtButtonVariant: { DESKTOP: "desktop" },
}));

describe("OrOrderSummary Component", () => {
  const mockProducts: Product[] = [
    {
      id: "1",
      name: "Product 1",
      price: 100,
      description: "Desc 1",
      label: "Label 1",
      image: "/test1.jpg",
      isNew: true,
    },
    {
      id: "2",
      name: "Product 2",
      price: 200,
      description: "Desc 2",
      label: "Label 2",
      image: "/test2.jpg",
      isNew: false,
    },
  ];

  const defaultProps: OrOrderSummaryProps = {
    products: mockProducts,
    total: 300,
    itemLabel: OrOrderSummaryItemLabel.ITEMS,
    totalLabel: OrOrderSummaryTotalLabel.TOTAL,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders all main elements", () => {
    render(<OrOrderSummary {...defaultProps} />);

    expect(screen.getByText("Order Summary")).toBeInTheDocument();
    expect(screen.getByText("2 items")).toBeInTheDocument();
    expect(screen.getByText("Product 1")).toBeInTheDocument();
    expect(screen.getByText("$ 100")).toBeInTheDocument();
    expect(screen.getByText("Order Total")).toBeInTheDocument();
    expect(screen.getByText("$ 300")).toBeInTheDocument();
    expect(screen.getByTestId("checkout-button")).toBeInTheDocument();
  });

  it("displays correct item labels", () => {
    const { rerender } = render(
      <OrOrderSummary
        {...defaultProps}
        itemLabel={OrOrderSummaryItemLabel.ITEM}
      />,
    );
    expect(screen.getByText("2 item")).toBeInTheDocument();

    rerender(
      <OrOrderSummary
        {...defaultProps}
        products={[mockProducts[0]]}
        itemLabel={OrOrderSummaryItemLabel.ITEMS}
      />,
    );
    expect(screen.getByText("1 items")).toBeInTheDocument();
  });

  it("renders all products in the list", () => {
    render(<OrOrderSummary {...defaultProps} />);

    const productNames = screen.getAllByText(/Product \d/);
    const productPrices = screen.getAllByText(/\$ (100|200)/);

    expect(productNames).toHaveLength(2);
    expect(productPrices).toHaveLength(2);
  });

  it("displays correct total and separator", () => {
    render(<OrOrderSummary {...defaultProps} total={500} />);

    const separator = screen.getByTestId("separator");
    expect(separator).toBeInTheDocument();
    expect(separator).toHaveAttribute("data-color", "stroke-secondary");
    expect(separator).toHaveAttribute("data-height", "1");

    expect(screen.getByText("$ 500")).toBeInTheDocument();
  });

  it("renders checkout button correctly", () => {
    render(<OrOrderSummary {...defaultProps} />);

    const button = screen.getByTestId("checkout-button");
    expect(button).toHaveTextContent("Checkout");
    expect(button).toHaveAttribute("data-color", "secondary");
  });

  it("handles empty product list", () => {
    render(
      <OrOrderSummary
        {...defaultProps}
        products={[]}
        itemLabel={OrOrderSummaryItemLabel.ITEMS}
      />,
    );

    expect(screen.getByText("0 items")).toBeInTheDocument();
    expect(screen.queryByText(/Product \d/)).toBeNull();
  });

  it("applies correct styling classes", () => {
    const { container } = render(<OrOrderSummary {...defaultProps} />);

    const section = container.firstChild;
    expect(section).toHaveClass("md:w-[522px]");
    expect(screen.getByText("Order Summary").parentElement).toHaveClass(
      "gap-3",
    );
  });
});
