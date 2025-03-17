import { render, screen } from "@testing-library/react";
import {
  MlProductImageNewLabel,
  type MlProductImageProps,
} from "./ml-product-image.types";
import { MlProductImage } from "./ml-product-image";
import {
  MlProductImageClasses,
  MlProductImageVariant,
} from "./ml-product-image.classes";

jest.mock("./ml-product-image.classes", () => ({
  MlProductImageVariant: {
    CATALOG: "catalog",
    CART: "cart",
  },
  MlProductImageNewLabel: {
    NEW: "New",
  },
  MlProductImageClasses: {
    catalog: "w-full h-[240px] rounded-t-2xl",
    cart: "min-w-[256px] md:w-[259px] h-[136px] md:h-[156px]",
  },
}));

describe("MlProductImage Component", () => {
  const defaultProps: MlProductImageProps = {
    src: "/test-image.jpg",
    alt: "Test Image",
  };

  it("renders image with correct attributes and structure", () => {
    const { container } = render(<MlProductImage {...defaultProps} />);

    const img = screen.getByRole("img");
    const figure = container.querySelector("figure");

    expect(img).toHaveAttribute("src", defaultProps.src);
    expect(img).toHaveAttribute("alt", defaultProps.alt);
    expect(figure).toBeInTheDocument();

    expect(container.firstChild).toHaveClass("w-full");
    expect(container.firstChild).toHaveClass("h-[240px]");
  });

  describe("Variant handling", () => {
    it("applies correct classes for CATALOG variant", () => {
      const { container } = render(
        <MlProductImage
          {...defaultProps}
          variant={MlProductImageVariant.CATALOG}
        />,
      );

      expect(container.firstChild).toHaveClass("rounded-t-2xl");
      expect(container.firstChild).toHaveClass("w-full");
      expect(screen.getByRole("img")).toHaveClass("h-[240px]");
    });

    it("applies correct classes for CART variant", () => {
      const { container } = render(
        <MlProductImage
          {...defaultProps}
          variant={MlProductImageVariant.CART}
        />,
      );

      const element = container.firstChild;

      expect(element).toHaveClass("min-w-[256px]");
      expect(element).toHaveClass("md:w-[259px]");
      expect(element).toHaveClass("h-[136px]");
      expect(element).toHaveClass("md:h-[156px]");

      expect(element).not.toHaveClass("rounded-t-2xl");
    });
  });

  describe("New Label handling", () => {
    it("displays label with correct content and styling", () => {
      render(
        <MlProductImage
          {...defaultProps}
          isNew
          newLabel={MlProductImageNewLabel.NEW}
        />,
      );

      const label = screen.getByText(MlProductImageNewLabel.NEW);
      expect(label).toHaveClass("absolute");
      expect(label).toHaveClass("top-3");
      expect(label).toHaveClass("left-3");
      expect(label).toHaveClass("bg-stone-100");
    });

    it("does not display label when isNew is false", () => {
      render(<MlProductImage {...defaultProps} isNew={false} />);
      expect(screen.queryByText(MlProductImageNewLabel.NEW)).toBeNull();
    });
  });

  it("applies correct image classes", () => {
    render(<MlProductImage {...defaultProps} />);

    const img = screen.getByRole("img");
    expect(img).toHaveClass("object-cover");
    expect(img).toHaveClass("w-full");
    expect(img).toHaveClass("h-[240px]");
  });

  it("uses CATALOG as default variant", () => {
    render(<MlProductImage {...defaultProps} />);

    const img = screen.getByRole("img");
    expect(img).toHaveClass(
      MlProductImageClasses[MlProductImageVariant.CATALOG],
    );
  });

  it("applies responsive classes for CART variant", () => {
    const { container } = render(
      <MlProductImage {...defaultProps} variant={MlProductImageVariant.CART} />,
    );

    expect(container.firstChild).toHaveClass("md:w-[259px]");
    expect(container.firstChild).toHaveClass("md:h-[156px]");
  });
});
