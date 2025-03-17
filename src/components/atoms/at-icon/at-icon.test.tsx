import { render, screen, fireEvent } from "@testing-library/react";
import type { AtIconProps } from "./at-icon.types";
import { AtIcon } from "./at-icon";

export interface NextImageProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  priority?: boolean;
  onClick?: () => void;
}

jest.mock("next/image", () => ({
  __esModule: true,
  default: (props: NextImageProps) => (
    <img
      src={props.src}
      alt={props.alt}
      width={props.width}
      height={props.height}
      className={props.className}
      onClick={props.onClick}
      data-priority={props.priority?.toString()}
      data-testid="next-image-mock"
    />
  ),
}));

describe("AtIcon Component", () => {
  const defaultProps: AtIconProps = {
    src: "/icon.png",
    alt: "Test Icon",
  };

  it("renders with required props", () => {
    render(<AtIcon {...defaultProps} />);

    const img = screen.getByTestId("next-image-mock");
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute("src", defaultProps.src);
    expect(img).toHaveAttribute("alt", defaultProps.alt);
  });

  it("uses default width and height when not provided", () => {
    render(<AtIcon {...defaultProps} />);

    const img = screen.getByTestId("next-image-mock");
    expect(img).toHaveAttribute("width", "24");
    expect(img).toHaveAttribute("height", "24");
  });

  it("applies custom width and height when provided", () => {
    const props: AtIconProps = {
      ...defaultProps,
      width: 32,
      height: 32,
    };

    render(<AtIcon {...props} />);

    const img = screen.getByTestId("next-image-mock");
    expect(img).toHaveAttribute("width", "32");
    expect(img).toHaveAttribute("height", "32");
  });

  it("handles priority prop correctly", () => {
    const { rerender } = render(<AtIcon {...defaultProps} priority={true} />);
    const img = screen.getByTestId("next-image-mock");
    expect(img).toHaveAttribute("data-priority", "true");

    rerender(<AtIcon {...defaultProps} priority={false} />);
    expect(img).toHaveAttribute("data-priority", "false");
  });

  describe("CSS classes", () => {
    it("applies base classes", () => {
      render(<AtIcon {...defaultProps} />);
      const img = screen.getByTestId("next-image-mock");

      expect(img).toHaveClass("p-0.5");
      expect(img).toHaveClass("hover:opacity-75");
      expect(img).toHaveClass("transition-opacity");
    });

    it("adds cursor-pointer when onClick is present", () => {
      const { rerender } = render(
        <AtIcon {...defaultProps} onClick={() => {}} />,
      );
      expect(screen.getByTestId("next-image-mock")).toHaveClass(
        "cursor-pointer",
      );

      rerender(<AtIcon {...defaultProps} />);
      expect(screen.getByTestId("next-image-mock")).not.toHaveClass(
        "cursor-pointer",
      );
    });
  });

  it("triggers onClick handler", () => {
    const handleClick = jest.fn();
    render(<AtIcon {...defaultProps} onClick={handleClick} />);

    fireEvent.click(screen.getByTestId("next-image-mock"));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("defaults priority to false", () => {
    render(<AtIcon {...defaultProps} />);
    expect(screen.getByTestId("next-image-mock")).not.toHaveAttribute(
      "data-priority",
    );
  });
});
