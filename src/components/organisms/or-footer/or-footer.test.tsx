import { render, screen } from "@testing-library/react";
import { OrFooter } from "./or-footer";
import { NextImageProps } from "@/components/atoms/at-icon/at-icon.test";

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

jest.mock("next/image", () => ({
  __esModule: true,
  default: (props: NextImageProps) => <img {...props} />,
}));

describe("OrFooter Component", () => {
  it("renders footer with correct structure", () => {
    render(<OrFooter />);

    const footer = screen.getByRole("contentinfo");
    const link = screen.getByRole("link");
    const image = screen.getByAltText("Apply Digital");

    expect(footer).toBeInTheDocument();
    expect(link).toHaveAttribute("href", "/");
    expect(image).toHaveAttribute("src", "/apply-digital-logo.svg");
  });

  it("has correct styling classes", () => {
    render(<OrFooter />);

    const footer = screen.getByRole("contentinfo");
    expect(footer).toHaveClass("bg-neutral-700");
    expect(footer).toHaveClass("px-6");
    expect(footer).toHaveClass("md:px-32");
    expect(footer).toHaveClass("py-16");
    expect(footer).toHaveClass("flex");
  });

  it("meets accessibility standards", () => {
    render(<OrFooter />);

    expect(screen.getByRole("contentinfo")).toBeInTheDocument();

    expect(screen.getByAltText("Apply Digital")).toBeInTheDocument();
  });

  it("contains valid navigation link", () => {
    render(<OrFooter />);

    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", "/");
    expect(link).toContainElement(screen.getByAltText("Apply Digital"));
  });

  it("applies responsive padding", () => {
    render(<OrFooter />);

    const footer = screen.getByRole("contentinfo");
    expect(footer).toHaveClass("md:px-32");
  });
});
