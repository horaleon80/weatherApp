import { render, screen, fireEvent } from "@testing-library/react";
import { useWeather } from "../../context/Weather";
import SearchBar from "./SearchBar";

jest.mock("../../context/Weather", () => ({
  useWeather: jest.fn(),
}));

describe("SearchBar Component", () => {
  const mockFetchWeatherData = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useWeather as jest.Mock).mockReturnValue({
      fetchWeatherData: mockFetchWeatherData,
      isLoading: false,
    });
  });

  it("renders the input and button", () => {
    render(<SearchBar />);

    const input = screen.getByPlaceholderText(/Search for a location/i);
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute("type", "text");

    const button = screen.getByRole("button", { name: /Search/i });
    expect(button).toBeInTheDocument();
  });

  it("updates the query state when typing in the input", () => {
    render(<SearchBar />);

    const input = screen.getByPlaceholderText(/Search for a location/i);
    fireEvent.change(input, { target: { value: "New York" } });

    expect(input).toHaveValue("New York");
  });

  it("calls fetchWeatherData with the correct query on form submission", () => {
    render(<SearchBar />);

    const input = screen.getByPlaceholderText(/Search for a location/i);
    const button = screen.getByRole("button", { name: /Search/i });

    fireEvent.change(input, { target: { value: "Paris" } });
    fireEvent.click(button);

    expect(mockFetchWeatherData).toHaveBeenCalledTimes(1);
    expect(mockFetchWeatherData).toHaveBeenCalledWith("Paris");
    expect(input).toHaveValue(""); 
  });

  it("disables the input and button when loading", () => {
    (useWeather as jest.Mock).mockReturnValue({
      fetchWeatherData: mockFetchWeatherData,
      isLoading: true,
    });

    render(<SearchBar />);

    const input = screen.getByPlaceholderText(/Search for a location/i);
    const button = screen.getByRole("button", { name: /Loading/i });

    expect(input).toBeDisabled();
    expect(button).toBeDisabled();
  });

  it("displays 'Loading...' on the button when loading", () => {
    (useWeather as jest.Mock).mockReturnValue({
      fetchWeatherData: mockFetchWeatherData,
      isLoading: true,
    });

    render(<SearchBar />);

    const button = screen.getByRole("button", { name: /Loading/i });
    expect(button).toBeInTheDocument();
  });
});
