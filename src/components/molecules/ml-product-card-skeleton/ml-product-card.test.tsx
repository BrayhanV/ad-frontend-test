import { render, screen, fireEvent } from "@testing-library/react";
import type { MlProductCardProps } from "../ml-product-card/ml-product-card.types";
import { Product } from "@/models/Product";
import { MlProductCard } from "../ml-product-card/ml-product-card";

jest.mock("../ml-product-image", () => ({
  MlProductImage: ({ src, alt }: { src: string; alt: string }) => (
    <img src={src} alt={alt} data-testid="product-image" />
  ),
  MlProductImageNewLabel: { NEW: "NEW" },
  MlProductImageVariant: { CATALOG: "CATALOG" },
}));

jest.mock("@/components/atoms/at-button", () => ({
  AtButton: ({
    onClick,
    children,
  }: {
    onClick: () => void;
    children: React.ReactNode;
  }) => (
    <button onClick={onClick} data-testid="product-button">
      {children}
    </button>
  ),
  AtButtonColor: { PRIMARY: "PRIMARY" },
  AtButtonVariant: { DESKTOP: "DESKTOP" },
}));

describe("MlProductCard Component", () => {
  const mockProduct: Product = {
    id: "1",
    name: "Test Product",
    description: "Test Description",
    price: 99.99,
    image: "/test-image.jpg",
    label: "Test Label",
    isNew: true,
  };

  const defaultProps: MlProductCardProps = {
    product: mockProduct,
    isProductInCart: false,
    onClickButton: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders all product information correctly", () => {
    render(<MlProductCard {...defaultProps} />);

    expect(
      screen.getByText(mockProduct.label.toUpperCase()),
    ).toBeInTheDocument();
    expect(screen.getByText(mockProduct.name)).toBeInTheDocument();
    expect(screen.getByText(`$${mockProduct.price}`)).toBeInTheDocument();

    const productImage = screen.getByTestId("product-image");
    expect(productImage).toHaveAttribute("src", mockProduct.image);
    expect(productImage).toHaveAttribute("alt", mockProduct.name);
  });

  describe("Button behavior", () => {
    it('shows "ADD TO CART" when product is not in cart', () => {
      render(<MlProductCard {...defaultProps} />);
      expect(screen.getByTestId("product-button")).toHaveTextContent(
        "ADD TO CART",
      );
    });

    it('shows "REMOVE" when product is in cart', () => {
      render(<MlProductCard {...defaultProps} isProductInCart={true} />);
      expect(screen.getByTestId("product-button")).toHaveTextContent("REMOVE");
    });
  });

  it("triggers onClickButton with product when clicked", () => {
    render(<MlProductCard {...defaultProps} />);

    const button = screen.getByTestId("product-button");
    fireEvent.click(button);

    expect(defaultProps.onClickButton).toHaveBeenCalledTimes(1);
    expect(defaultProps.onClickButton).toHaveBeenCalledWith(mockProduct);
  });

  it("has correct layout structure", () => {
    const { container } = render(<MlProductCard {...defaultProps} />);

    const article = screen.getByRole("article");
    expect(article).toHaveClass("w-full");
    expect(article).toHaveClass("md:w-[380px]");
    expect(article).toHaveClass("flex-col");
    expect(container.querySelectorAll("img")).toHaveLength(1);
  });

  it("has proper accessibility attributes", () => {
    render(<MlProductCard {...defaultProps} />);

    const article = screen.getByRole("article");
    const button = screen.getByRole("button");

    expect(article).toBeInTheDocument();
    expect(button).toHaveAccessibleName("ADD TO CART");
  });
});
