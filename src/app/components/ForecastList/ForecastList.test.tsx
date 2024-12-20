import React from "react";
import { render, screen } from "@testing-library/react";
import { useWeather } from "../../context/Weather";
import ForecastList from "./ForecastList";

jest.mock("../../context/Weather", () => ({
  useWeather: jest.fn(),
}));

const mockForecast = [
  {
    date: "2024-12-20",
    day: {
      mintemp_c: 5,
      maxtemp_c: 15,
      condition: { icon: "//cdn.weatherapi.com/weather/64x64/day/116.png" },
    },
  },
  {
    date: "2024-12-21",
    day: {
      mintemp_c: 6,
      maxtemp_c: 16,
      condition: { icon: "//cdn.weatherapi.com/weather/64x64/day/176.png" },
    },
  },
];

describe("Forecast Component", () => {
  it("renders the forecast data correctly", () => {
    (useWeather as jest.Mock).mockReturnValue({
      weatherData: {
        forecast: {
          forecastday: mockForecast,
        },
      },
    });

    render(<ForecastList />);

    expect(screen.getByText("Forecast")).toBeInTheDocument();

    mockForecast.forEach((day) => {
      expect(screen.getByText(new Date(day.date).toLocaleDateString())).toBeInTheDocument();
      expect(screen.getByText((content, element) => 
        element?.textContent === `Min: ${day.day.mintemp_c}°C`
      )).toBeInTheDocument();
      expect(screen.getByText((content, element) => 
        element?.textContent === `Max: ${day.day.maxtemp_c}°C`
      )).toBeInTheDocument();
    });

    const items = screen.getAllByAltText("Weather Icon");
    expect(items).toHaveLength(mockForecast.length);
  });

  it("renders nothing if no forecast data is available", () => {
    (useWeather as jest.Mock).mockReturnValue({
      weatherData: {},
    });

    render(<ForecastList />);

    expect(screen.queryByText("Min:")).not.toBeInTheDocument();
    expect(screen.queryByText("Max:")).not.toBeInTheDocument();
  });
});
