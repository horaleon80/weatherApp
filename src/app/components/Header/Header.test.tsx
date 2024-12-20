import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { useQuery } from "@tanstack/react-query";
import Header from "./Header";

jest.mock("../SearchBar/SearchBar", () => {
  const MockSearchBar = () => <div data-testid="search-bar" />;
  MockSearchBar.displayName = "MockSearchBar";
  return MockSearchBar;
});

jest.mock("@tanstack/react-query", () => ({
  useQuery: jest.fn(),
}));

const mockGeolocation = {
  getCurrentPosition: jest.fn(),
};
Object.defineProperty(global.navigator, "geolocation", {
  value: mockGeolocation,
  configurable: true,
});

describe("Header Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders the Header component", () => {
    (useQuery as jest.Mock).mockReturnValue({ data: null, isLoading: false });

    render(<Header />);

    expect(screen.getByTestId("search-bar")).toBeInTheDocument();
    expect(screen.queryByText(/Loading/i)).not.toBeInTheDocument();
  });

  it("displays loading state when timezone data is loading", () => {
    (useQuery as jest.Mock).mockReturnValue({ data: null, isLoading: true });

    render(<Header />);

    expect(screen.getByText(/Loading/i)).toBeInTheDocument();
  });

  it("handles geolocation successfully", async () => {
    mockGeolocation.getCurrentPosition.mockImplementationOnce((success) =>
      success({
        coords: {
          latitude: 51.5074,
          longitude: -0.1278,
        },
      })
    );

    (useQuery as jest.Mock).mockReturnValue({ data: null, isLoading: false });

    render(<Header />);

    await waitFor(() => {
      expect(mockGeolocation.getCurrentPosition).toHaveBeenCalled();
    });
  });

  it("handles geolocation error", async () => {
    mockGeolocation.getCurrentPosition.mockImplementationOnce((_, error) =>
      error()
    );

    (useQuery as jest.Mock).mockReturnValue({ data: null, isLoading: false });

    render(<Header />);

    await waitFor(() => {
      expect(mockGeolocation.getCurrentPosition).toHaveBeenCalled();
    });

    expect(screen.queryByText(/N\/A/i)).not.toBeInTheDocument();
  });

  it("handles empty timezone data gracefully", () => {
    (useQuery as jest.Mock).mockReturnValue({ data: null, isLoading: false });

    render(<Header />);

    expect(screen.queryByText(/Time Zone:/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/,/)).not.toBeInTheDocument();
  });
});
