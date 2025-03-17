import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { TmCart } from "./tm-cart";
import { Product } from "@/models/Product";

type CartState = {
  products: Map<string, Product>;
  total: number;
  addProduct: (product: Product) => void;
  removeProduct: (id: string) => void;
  clearCart: () => void;
};

type SelectorFn<T> = (state: CartState) => T;

jest.mock("@/components/molecules/ml-link/ml-link", () => ({
  MlLink: ({
    href,
    iconProps,
    label,
  }: {
    href: string;
    iconProps?: { src: string; alt: string };
    label?: string;
  }) => (
    <a href={href} data-testid="ml-link">
      {iconProps && (
        <img src={iconProps.src} alt={iconProps.alt} data-testid="at-icon" />
      )}
      {label && <span className="text-sm tracking-normal">{label}</span>}
    </a>
  ),
}));

jest.mock("@/components/organisms/or-card-basket", () => ({
  OrCardBasket: ({
    product,
    onClickButton,
  }: {
    product: Product;
    onClickButton: (product: Product) => void;
  }) => (
    <div data-testid="or-card-basket" onClick={() => onClickButton(product)}>
      {product.name}
    </div>
  ),
}));

jest.mock("@/components/organisms/or-order-summary", () => ({
  OrOrderSummary: ({
    itemLabel,
    totalLabel,
    products,
    total,
  }: {
    itemLabel: string;
    totalLabel: string;
    products: Product[];
    total: number;
  }) => (
    <div data-testid="or-order-summary">
      {products.length} - {total} - {itemLabel} - {totalLabel}
    </div>
  ),
  OrOrderSummaryItemLabel: { ITEM: "ITEM", ITEMS: "ITEMS" },
  OrOrderSummaryTotalLabel: { TOTAL: "TOTAL" },
}));

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
];

const mockProductMap = new Map<string, Product>([["1", mockProducts[0]]]);

const removeProductMock = jest.fn();

jest.mock("@/stores/cart", () => ({
  useCartStore: jest.fn((selector) =>
    selector({
      products: mockProductMap,
      total: 100,
      addProduct: jest.fn(),
      removeProduct: removeProductMock,
      clearCart: jest.fn(),
    }),
  ),
}));

describe("TmCart Component", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders the cart with correct titles and product count", () => {
    render(<TmCart />);
    expect(screen.getByTestId("ml-link")).toHaveTextContent("Back to Catalog");
    expect(screen.getByTestId("at-icon")).toHaveAttribute(
      "src",
      "/icons/back-arrow.svg",
    );

    expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent(
      "Your Cart",
    );
    expect(screen.getByRole("heading", { level: 3 })).toHaveTextContent(
      "1 Items",
    );
  });

  it("renders an OrCardBasket for each product", () => {
    render(<TmCart />);
    const cardBaskets = screen.getAllByTestId("or-card-basket");
    expect(cardBaskets).toHaveLength(1);
    expect(cardBaskets[0]).toHaveTextContent("Product 1");
  });

  it("renders OrOrderSummary with correct props", () => {
    render(<TmCart />);
    const orderSummary = screen.getByTestId("or-order-summary");
    expect(orderSummary).toHaveTextContent("1 - 100 - ITEM - TOTAL");
  });

  it("calls removeProduct when an OrCardBasket is clicked", () => {
    render(<TmCart />);
    const cardBasket = screen.getByTestId("or-card-basket");
    fireEvent.click(cardBasket);
    expect(removeProductMock).toHaveBeenCalledWith("1");
  });

  it("uses ITEMS label when multiple products in cart", () => {
    const multipleProducts = [
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

    const multipleProductsMap = new Map([
      ["1", multipleProducts[0]],
      ["2", multipleProducts[1]],
    ]);

    const useCartStoreMock = jest.requireMock("@/stores/cart").useCartStore;
    useCartStoreMock.mockImplementation((selector: SelectorFn<CartState>) =>
      selector({
        products: multipleProductsMap,
        total: 300,
        addProduct: jest.fn(),
        removeProduct: removeProductMock,
        clearCart: jest.fn(),
      }),
    );

    render(<TmCart />);

    expect(screen.getByRole("heading", { level: 3 })).toHaveTextContent(
      "2 Items",
    );

    const orderSummary = screen.getByTestId("or-order-summary");
    expect(orderSummary).toHaveTextContent("2 - 300 - ITEMS - TOTAL");

    const cardBaskets = screen.getAllByTestId("or-card-basket");
    expect(cardBaskets).toHaveLength(2);
    expect(cardBaskets[0]).toHaveTextContent("Product 1");
    expect(cardBaskets[1]).toHaveTextContent("Product 2");
  });
});
