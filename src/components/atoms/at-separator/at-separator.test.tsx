import { render, screen } from "@testing-library/react";
import type { AtSeparatorProps } from "./at-separator.type";
import { AtSeparator } from "./at-separator";

describe("AtSeparator Component", () => {
  it("renders with required props", () => {
    render(<AtSeparator color="#000000" height={1} />);
    const separator = screen.getByRole("separator");

    expect(separator).toBeInTheDocument();
    expect(separator).toHaveClass("w-full");
    expect(separator).toHaveClass("h-[1px]");
    expect(separator).toHaveClass("bg-[#000000]");
  });

  it.each([1, 2, 3, 4] as AtSeparatorProps["height"][])(
    "renders correct height when height is %s",
    (height) => {
      render(<AtSeparator color="#000" height={height} />);
      expect(screen.getByRole("separator")).toHaveClass(`h-[${height}px]`);
    },
  );

  it("renders correct background color", () => {
    const testColor = "rgb(255, 0, 0)";
    render(<AtSeparator color={testColor} height={2} />);

    const separator = screen.getByRole("separator");
    expect(separator).toHaveClass(`bg-[${testColor}]`);
  });

  it("merges custom class names", () => {
    const customClass = "custom-class";
    render(<AtSeparator color="#fff" height={3} className={customClass} />);

    const separator = screen.getByRole("separator");
    expect(separator).toHaveClass(customClass);
  });
});
