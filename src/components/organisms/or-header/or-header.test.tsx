import { render, screen } from "@testing-library/react";
import type { OrHeaderProps } from "./or-header.type";
import { OrHeader } from "./or-header";

jest.mock("next/link", () => ({
  __esModule: true,
  default: ({
    children,
    href,
  }: {
    children: React.ReactNode;
    href: string;
  }) => <a href={href}>{children}</a>,
}));

jest.mock("@/components/molecules/ml-link/ml-link", () => ({
  MlLink: ({
    href,
    iconProps,
  }: {
    href: string;
    iconProps: { src: string; alt: string };
  }) => (
    <a href={href} data-testid="header-icon" data-src={iconProps.src}>
      {iconProps.alt}
    </a>
  ),
}));

describe("OrHeader Component", () => {
  const mockIcons = [
    { icon: "/icons/user.svg", link: "/profile" },
    { icon: "/icons/cart.svg", link: "/cart" },
  ];

  const defaultProps: OrHeaderProps = {
    icons: mockIcons,
  };

  it("renders header with logo and navigation", () => {
    render(<OrHeader {...defaultProps} />);

    const logoLink = screen.getByRole("link", { name: "GamerShop" });
    expect(logoLink).toBeInTheDocument();
    expect(logoLink).toHaveAttribute("href", "/");

    const icons = screen.getAllByTestId("header-icon");
    expect(icons).toHaveLength(mockIcons.length);
  });

  it("applies correct styling classes", () => {
    render(<OrHeader {...defaultProps} />);

    const header = screen.getByRole("banner");
    expect(header).toHaveClass("bg-surface-secondary");
    expect(header).toHaveClass("px-6");
    expect(header).toHaveClass("md:px-32");
    expect(header).toHaveClass("justify-between");
  });

  it("renders all navigation icons with correct props", () => {
    render(<OrHeader {...defaultProps} />);

    const iconLinks = screen.getAllByTestId("header-icon");
    iconLinks.forEach((link, index) => {
      expect(link).toHaveAttribute("href", mockIcons[index].link);
      expect(link).toHaveAttribute("data-src", mockIcons[index].icon);
    });
  });

  it("displays correct logo text", () => {
    render(<OrHeader {...defaultProps} />);
    expect(screen.getByText("GamerShop")).toBeInTheDocument();
  });

  it("handles empty icons array", () => {
    render(<OrHeader icons={[]} />);
    expect(screen.queryAllByTestId("header-icon")).toHaveLength(0);
  });

  it("has proper accessibility attributes", () => {
    render(<OrHeader {...defaultProps} />);

    expect(screen.getByRole("banner")).toBeInTheDocument();
    expect(screen.getByRole("navigation")).toBeInTheDocument();
    expect(screen.getByText("GamerShop")).toHaveAttribute("href", "/");
  });

  it("applies responsive padding", () => {
    render(<OrHeader {...defaultProps} />);

    const header = screen.getByRole("banner");
    expect(header).toHaveClass("md:px-32");
  });
});
