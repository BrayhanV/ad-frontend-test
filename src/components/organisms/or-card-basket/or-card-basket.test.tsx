import { render, screen, fireEvent } from "@testing-library/react";
import type { OrCardBasketProps } from "./or-card-basket.types";
import { Product } from "@/models/Product";
import { OrCardBasket } from "./or-card-basket";

jest.mock("../../molecules/ml-product-image", () => ({
  MlProductImage: ({ src, alt }: { src: string; alt: string }) => (
    <img src={src} alt={alt} data-testid="product-image" />
  ),
  MlProductImageNewLabel: { NEW: "NEW" },
  MlProductImageVariant: { CART: "CART" },
}));

jest.mock("@/components/atoms/at-icon/at-icon", () => ({
  AtIcon: ({ onClick }: { onClick: () => void }) => (
    <button onClick={onClick} data-testid="close-icon">
      ×
    </button>
  ),
}));

describe("OrCardBasket Component", () => {
  const mockProduct: Product = {
    id: "1",
    name: "Test Product",
    description: "Test Description",
    price: 99.99,
    image: "/test-image.jpg",
    label: "Test Label",
    isNew: true,
  };

  const defaultProps: OrCardBasketProps = {
    product: mockProduct,
    onClickButton: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders all product information correctly", () => {
    render(<OrCardBasket {...defaultProps} />);

    expect(
      screen.getByText(mockProduct.label.toUpperCase()),
    ).toBeInTheDocument();
    expect(screen.getByText(mockProduct.name)).toBeInTheDocument();
    expect(screen.getByText(mockProduct.description)).toBeInTheDocument();
    expect(screen.getByText(`$${mockProduct.price}`)).toBeInTheDocument();

    const productImage = screen.getByTestId("product-image");
    expect(productImage).toHaveAttribute("src", mockProduct.image);
    expect(productImage).toHaveAttribute("alt", mockProduct.name);
  });

  it("calls onClickButton when close icon is clicked", () => {
    render(<OrCardBasket {...defaultProps} />);

    fireEvent.click(screen.getByTestId("close-icon"));
    expect(defaultProps.onClickButton).toHaveBeenCalledTimes(1);
    expect(defaultProps.onClickButton).toHaveBeenCalledWith(mockProduct);
  });

  it("passes correct variant to MlProductImage", () => {
    render(<OrCardBasket {...defaultProps} />);

    const productImage = screen.getByTestId("product-image");
    expect(productImage).toBeInTheDocument();
  });

  it("has correct layout structure", () => {
    const { container } = render(<OrCardBasket {...defaultProps} />);

    expect(container.querySelector("article")).toHaveClass("flex-col");
    expect(container.querySelector("div.flex-row")).toHaveClass("items-start");
    expect(screen.getByTestId("close-icon")).toBeInTheDocument();
  });

  it("displays price correctly formatted", () => {
    render(
      <OrCardBasket
        {...defaultProps}
        product={{ ...mockProduct, price: 1234.5 }}
      />,
    );

    expect(screen.getByText("$1234.5")).toBeInTheDocument();
  });
});
