import { render, screen, fireEvent } from "@testing-library/react";
import { TmHome } from "./tm-home";
import { useCartStore } from "@/stores/cart";
import { Product } from "@/models/Product";
import { useAsyncState } from "@/hooks";
import { useRouter } from "next/navigation";

const mockSearchParams = new URLSearchParams("genre=all");
const mockUseSearchParams = jest
  .fn()
  .mockImplementation(() => mockSearchParams);

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(() => ({
    push: jest.fn(),
  })),
  useSearchParams: () => mockUseSearchParams(),
}));

jest.mock("@/hooks", () => ({
  useAsyncState: jest.fn(),
}));

jest.mock("@/components/organisms/or-product-listing", () => ({
  OrProductListing: ({
    products,
    onLoadMore,
    onAddProductToCart,
  }: {
    products?: Product[];
    onLoadMore?: () => void;
    onAddProductToCart?: (product: Product) => void;
  }) => (
    <div data-testid="product-listing">
      {products?.map((p) => (
        <div
          key={p.id}
          onClick={() => onAddProductToCart && onAddProductToCart(p)}
        >
          {p.name}
        </div>
      ))}
      {onLoadMore && <button onClick={onLoadMore}>SEE MORE</button>}
    </div>
  ),
}));
jest.mock("@/components/atoms/at-select/at-select", () => ({
  AtSelect: ({
    onChange,
    options,
    value,
  }: {
    onChange: (value: string) => void;
    options: string[];
    value: string;
  }) => (
    <select
      data-testid="genre-select"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    >
      {options.map((opt: string) => (
        <option key={opt} value={opt}>
          {opt}
        </option>
      ))}
    </select>
  ),
}));

jest.mock("@/services/games", () => ({
  DEFAULT_GENRE: "all",
  getGames: jest.fn(),
}));

const mockProducts: Product[] = [
  {
    id: "1",
    name: "Product 1",
    price: 100,
    description: "Desc 1",
    label: "Label 1",
    image: "/test1.jpg",
    isNew: true,
  },
  {
    id: "2",
    name: "Product 2",
    price: 200,
    description: "Desc 2",
    label: "Label 2",
    image: "/test2.jpg",
    isNew: false,
  },
];

const mockProductMap = new Map<string, Product>([
  ["1", mockProducts[0]],
  ["2", mockProducts[1]],
]);

jest.mock("@/stores/cart", () => ({
  useCartStore: jest.fn((selector) =>
    selector({
      products: mockProductMap,
      total: 100,
      addProduct: jest.fn(),
      removeProduct: jest.fn(),
      clearCart: jest.fn(),
    }),
  ),
}));

describe("TmHome Component", () => {
  const mockFetchMore = jest.fn();
  const mockReset = jest.fn();
  const mockAddGame = jest.fn();
  const mockRemoveGame = jest.fn();

  beforeEach(() => {
    const mockPush = jest.fn();

    (useRouter as jest.Mock).mockImplementation(() => ({
      push: mockPush,
    }));

    (useCartStore as unknown as jest.Mock).mockImplementation((selector) =>
      selector({
        products: mockProductMap,
        addProduct: mockAddGame,
        removeProduct: mockRemoveGame,
        clearCart: jest.fn(),
        total: 100,
      }),
    );

    (useAsyncState as jest.Mock).mockImplementation(() => ({
      value: {
        games: mockProducts,
        currentPage: 1,
        totalPages: 3,
        availableFilters: ["action", "rpg"],
      },
      loading: false,
      fetchMore: mockFetchMore,
      reset: mockReset,
    }));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders initial state correctly", () => {
    render(<TmHome />);

    expect(screen.getByText("Top Sellers")).toBeInTheDocument();
    expect(screen.getByTestId("genre-select")).toHaveValue("all");
    expect(screen.getByText("Product 1")).toBeInTheDocument();
  });

  it("handles genre filter change", () => {
    render(<TmHome />);

    fireEvent.change(screen.getByTestId("genre-select"), {
      target: { value: "action" },
    });

    expect(mockReset).toHaveBeenCalled();
  });

  it("loads more games when available", () => {
    render(<TmHome />);

    fireEvent.click(screen.getByText("SEE MORE"));

    expect(mockFetchMore).toHaveBeenCalledWith({
      genre: "all",
      page: 2,
    });
  });

  it("toggles games in cart", () => {
    render(<TmHome />);

    expect(mockAddGame).toHaveBeenCalledTimes(0);
    expect(mockRemoveGame).toHaveBeenCalledTimes(0);
  });

  it("shows loading state", () => {
    (useAsyncState as jest.Mock).mockImplementation(() => ({
      value: null,
      loading: true,
      fetchMore: mockFetchMore,
    }));

    render(<TmHome />);

    expect(screen.queryByText("Product 1")).toBeNull();
  });

  it("disables load more when no more pages", () => {
    (useAsyncState as jest.Mock).mockImplementation(() => ({
      value: {
        games: mockProducts,
        currentPage: 3,
        totalPages: 3,
        availableFilters: ["action", "rpg"],
      },
      loading: false,
      fetchMore: mockFetchMore,
    }));

    render(<TmHome />);

    expect(screen.queryByText("SEE MORE")).toBeNull();
  });

  it("handles empty game list", () => {
    (useAsyncState as jest.Mock).mockImplementation(() => ({
      value: {
        games: [],
        currentPage: 1,
        totalPages: 1,
        availableFilters: [],
      },
      loading: false,
      fetchMore: mockFetchMore,
    }));

    render(<TmHome />);

    expect(screen.queryByText("SEE MORE")).toBeNull();
  });

  it("selectedGenre uses DEFAULT_GENRE when genre is not set", () => {
    mockUseSearchParams.mockImplementation(() => ({
      get: () => null,
    }));

    render(<TmHome />);
    expect(screen.getByTestId("genre-select")).toHaveValue("all");
  });

  it("selectedGenre uses genre value when not DEFAULT_GENRE", () => {
    mockUseSearchParams.mockImplementation(() => ({
      get: (key: string) => (key === "genre" ? "action" : null),
    }));

    render(<TmHome />);
    expect(screen.getByTestId("genre-select")).toHaveValue("action");
  });

  it("merges paginated results correctly", () => {
    const initialGames = [mockProducts[0]];
    const newGames = [mockProducts[1]];

    (useAsyncState as jest.Mock).mockImplementation(
      (fetcher, deps, options) => {
        const merged = options?.mergeData(
          { games: initialGames },
          { games: newGames },
        );
        return {
          value: merged,
          loading: false,
          fetchMore: mockFetchMore,
          reset: mockReset,
        };
      },
    );

    render(<TmHome />);

    expect(screen.getByText("Product 1")).toBeInTheDocument();
    expect(screen.getByText("Product 2")).toBeInTheDocument();
  });

  describe("Cart interactions", () => {
    it("adds game to cart when not present", () => {
      (useCartStore as unknown as jest.Mock).mockImplementation((selector) =>
        selector({
          products: new Map(),
          addProduct: mockAddGame,
          removeProduct: mockRemoveGame,
          clearCart: jest.fn(),
          total: 0,
        }),
      );

      render(<TmHome />);

      fireEvent.click(screen.getByText("Product 1"));

      expect(mockAddGame).toHaveBeenCalledWith(mockProducts[0]);
    });

    it("removes game from cart when present", () => {
      (useCartStore as unknown as jest.Mock).mockImplementation((selector) =>
        selector({
          products: mockProductMap,
          addProduct: mockAddGame,
          removeProduct: mockRemoveGame,
          clearCart: jest.fn(),
          total: 100,
        }),
      );

      render(<TmHome />);

      fireEvent.click(screen.getByText("Product 1"));

      expect(mockRemoveGame).toHaveBeenCalledWith("1");
    });
  });

  it("uses default genre when search param is null", () => {
    mockUseSearchParams.mockImplementation(() => new URLSearchParams(""));

    render(<TmHome />);

    expect(screen.getByTestId("genre-select")).toHaveValue("all");
    expect(useAsyncState).toHaveBeenCalledWith(
      expect.any(Function),
      ["all"],
      expect.any(Object),
    );
  });

  it("handles null genre from search params", () => {
    mockUseSearchParams.mockImplementation(() => new URLSearchParams(""));

    render(<TmHome />);

    expect(screen.getByTestId("genre-select")).toHaveValue("all");
  });

  it("handles null gamesData", () => {
    (useAsyncState as jest.Mock).mockImplementation(() => ({
      value: null,
      loading: false,
      fetchMore: mockFetchMore,
      reset: mockReset,
    }));

    render(<TmHome />);

    expect(screen.queryByText("SEE MORE")).toBeNull();
  });

  it("handles currentPage equal to totalPages", () => {
    (useAsyncState as jest.Mock).mockImplementation(() => ({
      value: {
        games: mockProducts,
        currentPage: 3,
        totalPages: 3,
        availableFilters: ["action", "rpg"],
      },
      loading: false,
      fetchMore: mockFetchMore,
      reset: mockReset,
    }));

    render(<TmHome />);

    expect(screen.queryByText("SEE MORE")).toBeNull();
  });

  it("handles genre equal to DEFAULT_GENRE", () => {
    mockUseSearchParams.mockImplementation(
      () => new URLSearchParams("genre=all"),
    );

    render(<TmHome />);

    expect(screen.getByTestId("genre-select")).toHaveValue("all");
    expect(useAsyncState).toHaveBeenCalledWith(
      expect.any(Function),
      ["all"],
      expect.any(Object),
    );
  });

  it("correctly toggles products in cart", () => {
    (useCartStore as unknown as jest.Mock).mockImplementation((selector) =>
      selector({
        products: new Map(),
        addProduct: mockAddGame,
        removeProduct: mockRemoveGame,
        clearCart: jest.fn(),
        total: 0,
      }),
    );

    const { rerender } = render(<TmHome />);

    fireEvent.click(screen.getByText("Product 1"));
    expect(mockAddGame).toHaveBeenCalledWith(mockProducts[0]);

    jest.clearAllMocks();

    (useCartStore as unknown as jest.Mock).mockImplementation((selector) =>
      selector({
        products: new Map([["1", mockProducts[0]]]),
        addProduct: mockAddGame,
        removeProduct: mockRemoveGame,
        clearCart: jest.fn(),
        total: 100,
      }),
    );

    rerender(<TmHome />);

    fireEvent.click(screen.getByText("Product 1"));
    expect(mockRemoveGame).toHaveBeenCalledWith("1");
  });

  it("uses params passed to getGames function", () => {
    jest.clearAllMocks();

    const mockGetGames = jest.fn().mockResolvedValue({
      games: mockProducts,
      currentPage: 2,
      totalPages: 3,
      availableFilters: ["action", "rpg"],
    });

    jest
      // eslint-disable-next-line @typescript-eslint/no-require-imports
      .spyOn(require("@/services/games"), "getGames")
      .mockImplementation(mockGetGames);

    (useAsyncState as jest.Mock).mockImplementation((promiseCreator) => {
      return {
        value: {
          games: mockProducts,
          currentPage: 1,
          totalPages: 3,
          availableFilters: ["action", "rpg"],
        },
        loading: false,
        fetchMore: (params: unknown) => {
          promiseCreator(params);
          mockFetchMore(params);
        },
        reset: mockReset,
      };
    });

    render(<TmHome />);

    fireEvent.click(screen.getByText("SEE MORE"));

    expect(mockGetGames).toHaveBeenCalledWith(
      expect.objectContaining({
        genre: "all",
        page: 2,
      }),
    );
  });

  it("uses default params when no params are provided", () => {
    jest.clearAllMocks();

    const mockGetGames = jest.fn().mockResolvedValue({
      games: mockProducts,
      currentPage: 1,
      totalPages: 3,
      availableFilters: ["action", "rpg"],
    });

    jest
      // eslint-disable-next-line @typescript-eslint/no-require-imports
      .spyOn(require("@/services/games"), "getGames")
      .mockImplementation(mockGetGames);

    (useAsyncState as jest.Mock).mockImplementation((promiseCreator) => {
      promiseCreator(undefined);

      return {
        value: {
          games: mockProducts,
          currentPage: 1,
          totalPages: 3,
          availableFilters: ["action", "rpg"],
        },
        loading: false,
        fetchMore: mockFetchMore,
        reset: mockReset,
      };
    });

    render(<TmHome />);

    expect(mockGetGames).toHaveBeenCalledWith({
      genre: "all",
      page: 1,
    });
  });

  it("handles merging data when previous games are undefined", () => {
    jest.clearAllMocks();

    const newGames = [mockProducts[0]];

    (useAsyncState as jest.Mock).mockImplementation(
      (fetcher, deps, options) => {
        const merged = options?.mergeData(
          { games: undefined },
          { games: newGames },
        );

        expect(merged).toEqual({
          games: newGames,
        });

        return {
          value: merged,
          loading: false,
          fetchMore: mockFetchMore,
          reset: mockReset,
        };
      },
    );

    render(<TmHome />);

    expect(screen.getByText("Product 1")).toBeInTheDocument();
  });
});
