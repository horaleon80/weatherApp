import { render, screen, fireEvent } from "@testing-library/react";
import { useQuery } from "@tanstack/react-query";
import { useWeather } from "../../context/Weather";
import Suggestion from "./Suggestion";

jest.mock("../../context/Weather", () => ({
  useWeather: jest.fn(),
}));

jest.mock("@tanstack/react-query", () => ({
  useQuery: jest.fn(),
}));

describe("Suggestion Component", () => {
  const mockFetchWeatherData = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useWeather as jest.Mock).mockReturnValue({
      fetchWeatherData: mockFetchWeatherData,
    });
  });

  it("renders the button with city and temperature when weather data is available", () => {
    (useQuery as jest.Mock).mockReturnValue({
      data: {
        location: { name: "Test City" },
        current: { temp_c: 25, condition: { text: "Sunny" } },
      },
      isLoading: false,
    });

    render(<Suggestion suggestion="Test City" selectedCondition="" />);

    expect(screen.getByText(/Test City/i)).toBeInTheDocument();
    expect(screen.getByText(/25°C/i)).toBeInTheDocument();
  });

  it("does not render the button when selected condition does not match", () => {
    (useQuery as jest.Mock).mockReturnValue({
      data: {
        location: { name: "Test City" },
        current: { temp_c: 25, condition: { text: "Rainy" } },
      },
      isLoading: false,
    });

    render(<Suggestion suggestion="Test City" selectedCondition="Sunny" />);

    expect(screen.queryByRole("button")).not.toBeInTheDocument();
  });

  it("does not render the button while loading", () => {
    (useQuery as jest.Mock).mockReturnValue({
      data: null,
      isLoading: true,
    });

    render(<Suggestion suggestion="Test City" selectedCondition="" />);

    expect(screen.queryByRole("button")).not.toBeInTheDocument();
  });

  it("calls fetchWeatherData when the button is clicked", () => {
    (useQuery as jest.Mock).mockReturnValue({
      data: {
        location: { name: "Test City" },
        current: { temp_c: 25, condition: { text: "Sunny" } },
      },
      isLoading: false,
    });

    render(<Suggestion suggestion="Test City" selectedCondition="" />);

    const button = screen.getByRole("button");
    fireEvent.click(button);

    expect(mockFetchWeatherData).toHaveBeenCalledTimes(1);
    expect(mockFetchWeatherData).toHaveBeenCalledWith("Test City");
  });
});
