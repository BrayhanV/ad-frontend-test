import { render, screen } from "@testing-library/react";
import { MlProductCardSkeleton } from "./ml-product-card.skeleton";

describe("MlProductCardSkeleton", () => {
  it("renders the skeleton structure", () => {
    const { container } = render(<MlProductCardSkeleton />);

    expect(container.querySelector("article")).toBeInTheDocument();
    expect(screen.getByTestId("image-skeleton")).toBeInTheDocument();
    expect(screen.getByTestId("button-skeleton")).toBeInTheDocument();
  });

  it("has correct layout classes", () => {
    render(<MlProductCardSkeleton />);
    const article = screen.getByRole("article");

    expect(article).toHaveClass("w-full");
    expect(article).toHaveClass("md:w-[380px]");
    expect(article).toHaveClass("flex-col");
  });

  it("has correct dimensions for skeleton elements", () => {
    render(<MlProductCardSkeleton />);

    const image = screen.getByTestId("image-skeleton");
    expect(image).toHaveClass("h-[240px]");

    const button = screen.getByTestId("button-skeleton");
    expect(button).toHaveClass("h-[56px]");
  });

  it("applies responsive classes", () => {
    render(<MlProductCardSkeleton />);

    const article = screen.getByRole("article");
    expect(article).toHaveClass("md:w-[380px]");
  });
});
