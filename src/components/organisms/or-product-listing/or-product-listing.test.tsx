import { render, screen, fireEvent } from "@testing-library/react";
import { Product } from "@/models/Product";
import { useCartStore } from "@/stores/cart";
import { OrProductListing } from "./or-product-listing";

jest.mock("@/components/organisms/or-product-card", () => ({
  OrProductCard: ({ product }: { product: Product }) => (
    <div data-testid="product-card">{product.name}</div>
  ),
  MlProductCardSkeleton: () => <div data-testid="skeleton">Skeleton</div>,
}));

jest.mock("@/components/atoms/at-button", () => ({
  AtButton: ({
    onClick,
    disabled,
    children,
  }: {
    onClick: () => void;
    disabled?: boolean;
    children: React.ReactNode;
  }) => (
    <button onClick={onClick} disabled={disabled} data-testid="see-more-button">
      {children}
    </button>
  ),
  AtButtonColor: { SECONDARY: "secondary" },
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

const mockProductMap = new Map<string, Product>([
  ["1", mockProducts[0]],
  ["2", mockProducts[1]],
]);

jest.mock("@/stores/cart", () => ({
  useCartStore: jest.fn((selector) =>
    selector({
      products: mockProductMap,
      total: 100,
      addProduct: jest.fn(),
      removeProduct: jest.fn(),
      clearCart: jest.fn(),
    }),
  ),
}));

describe("OrProductListing Component", () => {
  const mockScroll = jest.fn();
  const mockOnLoadMore = jest.fn();
  const mockOnAddToCart = jest.fn();

  beforeAll(() => {
    (useCartStore as unknown as jest.Mock).mockImplementation((selector) =>
      selector({
        products: mockProductMap,
        total: 100,
        addProduct: jest.fn(),
        removeProduct: jest.fn(),
        clearCart: jest.fn(),
      }),
    );

    window.HTMLElement.prototype.scrollIntoView = mockScroll;
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders product cards correctly", () => {
    render(
      <OrProductListing
        products={mockProducts}
        onAddProductToCart={mockOnAddToCart}
      />,
    );

    const cards = screen.getAllByTestId("product-card");
    expect(cards).toHaveLength(2);
    expect(cards[0]).toHaveTextContent("Product 1");
    expect(cards[1]).toHaveTextContent("Product 2");
  });

  it("shows skeletons when loading", () => {
    render(
      <OrProductListing loading={true} onAddProductToCart={mockOnAddToCart} />,
    );

    const skeletons = screen.getAllByTestId("skeleton");
    expect(skeletons).toHaveLength(3);
  });

  it("shows See More button only when products exist", () => {
    const { rerender } = render(
      <OrProductListing products={[]} onAddProductToCart={mockOnAddToCart} />,
    );
    expect(screen.queryByTestId("see-more-button")).toBeNull();

    rerender(
      <OrProductListing
        products={mockProducts}
        onAddProductToCart={mockOnAddToCart}
      />,
    );
    expect(screen.getByTestId("see-more-button")).toBeInTheDocument();
  });

  it("triggers load more and scroll", () => {
    render(
      <OrProductListing
        products={mockProducts}
        onLoadMore={mockOnLoadMore}
        onAddProductToCart={mockOnAddToCart}
      />,
    );

    fireEvent.click(screen.getByTestId("see-more-button"));
    jest.advanceTimersByTime(100);

    expect(mockOnLoadMore).toHaveBeenCalled();
  });

  it("disables button correctly", () => {
    const { rerender } = render(
      <OrProductListing
        products={mockProducts}
        onAddProductToCart={mockOnAddToCart}
        loading={true}
      />,
    );
    expect(screen.getByTestId("see-more-button")).toBeDisabled();

    rerender(
      <OrProductListing
        products={mockProducts}
        onAddProductToCart={mockOnAddToCart}
        onLoadMore={undefined}
      />,
    );
    expect(screen.getByTestId("see-more-button")).toBeDisabled();
  });

  it("passes correct cart state to product cards", () => {
    render(
      <OrProductListing
        products={mockProducts}
        onAddProductToCart={mockOnAddToCart}
      />,
    );

    const cards = screen.getAllByTestId("product-card");
    expect(cards[0]).toHaveTextContent("Product 1");
  });

  it("positions bottom ref correctly when loading", () => {
    render(
      <OrProductListing loading={true} onAddProductToCart={mockOnAddToCart} />,
    );

    expect(screen.getByTestId("scroll-div")).toBeInTheDocument();
  });
});
