import { render, screen, fireEvent } from "@testing-library/react";
import type { AtSelectProps } from "./at-select.types";
import { AtSelect } from "./at-select";
import { NextImageProps } from "../at-icon/at-icon.test";

jest.mock("next/image", () => ({
  __esModule: true,
  default: (props: NextImageProps) => <img {...props} />,
}));

describe("AtSelect Component", () => {
  const mockOptions = ["Option 1", "Option 2", "Option 3"];
  const defaultProps: AtSelectProps = {
    id: "test-select",
    name: "test-select",
    options: mockOptions,
    value: "Option 1",
    onChange: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders correctly with provided props", () => {
    render(<AtSelect {...defaultProps} />);

    const select = screen.getByRole("combobox");
    expect(select).toBeInTheDocument();
    expect(select).toHaveAttribute("id", defaultProps.id);
    expect(select).toHaveAttribute("name", defaultProps.name);
    expect(select).toHaveValue(defaultProps.value);
  });

  it("renders all options correctly", () => {
    render(<AtSelect {...defaultProps} />);

    const options = screen.getAllByRole("option");
    expect(options).toHaveLength(mockOptions.length);

    mockOptions.forEach((option) => {
      expect(screen.getByRole("option", { name: option })).toBeInTheDocument();
    });
  });

  it("applies correct CSS classes", () => {
    render(<AtSelect {...defaultProps} />);

    const wrapper = screen.getByTestId("select-wrapper");
    const select = screen.getByRole("combobox");

    expect(wrapper).toHaveClass("relative");
    expect(wrapper).toHaveClass("w-full");

    expect(select).toHaveClass("w-full");
    expect(select).toHaveClass("md:min-w-[205px]");
    expect(select).toHaveClass("p-4");
  });

  it("renders arrow icon correctly", () => {
    render(<AtSelect {...defaultProps} />);

    const icon = screen.getByRole("img");
    expect(icon).toBeInTheDocument();
    expect(icon).toHaveAttribute("src", "/icons/select-arrow.svg");
    expect(icon).toHaveClass("opacity-50");
  });

  it("triggers onChange callback correctly", () => {
    render(<AtSelect {...defaultProps} />);

    const select = screen.getByRole("combobox");
    fireEvent.change(select, { target: { value: "Option 2" } });

    expect(defaultProps.onChange).toHaveBeenCalledTimes(1);
    expect(defaultProps.onChange).toHaveBeenCalledWith("Option 2");
  });

  it("reflects the selected value correctly", () => {
    const { rerender } = render(<AtSelect {...defaultProps} />);
    expect(screen.getByRole("combobox")).toHaveValue("Option 1");

    rerender(<AtSelect {...defaultProps} value="Option 3" />);
    expect(screen.getByRole("combobox")).toHaveValue("Option 3");
  });
});
