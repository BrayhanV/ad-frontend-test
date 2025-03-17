/**
 * @jest-environment jsdom
 */
import { render, screen, fireEvent } from "@testing-library/react";
import { AtButtonVariant, AtButtonColor } from "./at-button.classes";
import { AtButton } from "./at-button";

describe("AtButton Component", () => {
  it("renders children correctly", () => {
    render(<AtButton>Test Button</AtButton>);
    expect(screen.getByText("Test Button")).toBeInTheDocument();
  });

  it("applies default classes when no props are provided", () => {
    render(<AtButton>Test</AtButton>);
    const button = screen.getByRole("button");

    expect(button).toHaveClass("text-xs");
    expect(button).toHaveClass("md:h-[56px]");
    expect(button).toHaveClass("md:text-sm");

    expect(button).toHaveClass("bg-white");
    expect(button).toHaveClass("text-primary");
    expect(button).toHaveClass("border-stroke-primary");
  });

  describe("Variant handling", () => {
    it("applies MOBILE variant classes", () => {
      render(<AtButton variant={AtButtonVariant.MOBILE}>Test</AtButton>);
      const button = screen.getByRole("button");
      expect(button).toHaveClass("text-xs");
    });

    it("applies DESKTOP variant classes", () => {
      render(<AtButton variant={AtButtonVariant.DESKTOP}>Test</AtButton>);
      const button = screen.getByRole("button");
      expect(button).toHaveClass("h-[56px]");
      expect(button).toHaveClass("w-full");
      expect(button).toHaveClass("text-sm");
    });
  });

  describe("Color handling", () => {
    it("applies PRIMARY color classes", () => {
      render(<AtButton color={AtButtonColor.PRIMARY}>Test</AtButton>);
      const button = screen.getByRole("button");
      expect(button).toHaveClass("bg-white");
      expect(button).toHaveClass("text-primary");
    });

    it("applies SECONDARY color classes", () => {
      render(<AtButton color={AtButtonColor.SECONDARY}>Test</AtButton>);
      const button = screen.getByRole("button");
      expect(button).toHaveClass("bg-secondary");
      expect(button).toHaveClass("text-white");
    });
  });

  describe("Fit prop", () => {
    it("applies w-fit when fit is true", () => {
      render(<AtButton fit>Test</AtButton>);
      expect(screen.getByRole("button")).toHaveClass("w-fit");
    });

    it("applies w-full when fit is false", () => {
      render(<AtButton fit={false}>Test</AtButton>);
      expect(screen.getByRole("button")).toHaveClass("w-full");
    });
  });

  describe("Disabled state", () => {
    it("applies disabled styles and attributes", () => {
      render(<AtButton disabled>Test</AtButton>);
      const button = screen.getByRole("button");

      expect(button).toBeDisabled();
      expect(button).toHaveClass("disabled:opacity-75");
      expect(button).toHaveClass("disabled:hover:bg-white");
    });

    it("prevents onClick when disabled", () => {
      const handleClick = jest.fn();
      render(
        <AtButton disabled onClick={handleClick}>
          Test
        </AtButton>,
      );

      fireEvent.click(screen.getByRole("button"));
      expect(handleClick).not.toHaveBeenCalled();
    });
  });

  it("triggers onClick handler", () => {
    const handleClick = jest.fn();
    render(<AtButton onClick={handleClick}>Test</AtButton>);

    fireEvent.click(screen.getByRole("button"));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("always applies base classes", () => {
    render(<AtButton>Test</AtButton>);
    const button = screen.getByRole("button");

    expect(button).toHaveClass("px-6");
    expect(button).toHaveClass("py-4");
    expect(button).toHaveClass("rounded-lg");
    expect(button).toHaveClass("font-bold");
    expect(button).toHaveClass("transition-all");
  });
});
