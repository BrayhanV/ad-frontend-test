import { render, screen } from "@testing-library/react";
import type { MlLinkProps } from "./ml-link.types";
import { AtIconProps } from "@/components/atoms/at-icon";
import { MlLink } from "./ml-link";

jest.mock("next/link", () => ({
  __esModule: true,
  default: ({
    children,
    href,
    className,
  }: {
    children: React.ReactNode;
    href: string;
    className?: string;
  }) => (
    <a href={href} className={className} data-testid="next-link">
      {children}
    </a>
  ),
}));

jest.mock("@/components/atoms/at-icon/at-icon", () => ({
  AtIcon: ({ src, alt, width, height }: AtIconProps) => (
    <img
      src={src}
      alt={alt}
      data-testid="at-icon"
      data-width={width}
      data-height={height}
    />
  ),
}));

describe("MlLink Component", () => {
  const mockIconProps: AtIconProps = {
    src: "/icons/test.svg",
    alt: "Test Icon",
    width: 24,
    height: 24,
  };

  const baseProps: MlLinkProps = {
    href: "/test-path",
  };

  it("renders correctly with all props", () => {
    render(
      <MlLink {...baseProps} iconProps={mockIconProps} label="Test Link" />,
    );

    const link = screen.getByTestId("next-link");
    const icon = screen.getByTestId("at-icon");
    const label = screen.getByText("Test Link");

    expect(link).toHaveAttribute("href", baseProps.href);
    expect(icon).toBeInTheDocument();
    expect(label).toBeInTheDocument();
  });

  it("renders only icon when no label provided", () => {
    render(<MlLink {...baseProps} iconProps={mockIconProps} />);

    expect(screen.getByTestId("at-icon")).toBeInTheDocument();
    expect(screen.queryByTestId("link-label")).toBeNull();
  });

  it("renders only text when no icon provided", () => {
    render(<MlLink {...baseProps} label="Text Only" />);

    expect(screen.queryByTestId("at-icon")).toBeNull();
    expect(screen.getByText("Text Only")).toBeInTheDocument();
  });

  it("applies correct CSS classes", () => {
    render(<MlLink {...baseProps} label="Test" />);

    const link = screen.getByTestId("next-link");
    const label = screen.getByText("Test");

    expect(link).toHaveClass("flex");
    expect(link).toHaveClass("items-center");
    expect(link).toHaveClass("gap-2");

    expect(label).toHaveClass("text-sm");
    expect(label).toHaveClass("tracking-normal");
  });

  it("passes correct icon props", () => {
    render(<MlLink {...baseProps} iconProps={mockIconProps} />);

    const icon = screen.getByTestId("at-icon");

    expect(icon).toHaveAttribute("src", mockIconProps.src);
    expect(icon).toHaveAttribute("alt", mockIconProps.alt);
    expect(icon).toHaveAttribute("data-width", mockIconProps.width?.toString());
    expect(icon).toHaveAttribute(
      "data-height",
      mockIconProps.height?.toString(),
    );
  });

  it("has proper accessibility attributes", () => {
    render(
      <MlLink
        {...baseProps}
        iconProps={mockIconProps}
        label="Accessible Link"
      />,
    );

    const link = screen.getByRole("link");
    expect(link).toHaveAccessibleName("Test Icon Accessible Link");
  });

  it("renders empty link when no children provided", () => {
    render(<MlLink {...baseProps} />);

    const link = screen.getByTestId("next-link");
    expect(link).toBeEmptyDOMElement();
  });
});
