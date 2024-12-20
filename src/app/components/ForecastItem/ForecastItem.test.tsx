import React from "react";
import { render, screen } from "@testing-library/react";
import ForecastItem from "./ForecastItem";

describe("ForecastItem Component", () => {
  const mockProps = {
    date: "2024-12-20",
    minTemp: 5,
    maxTemp: 15,
    icon: "//cdn.weatherapi.com/weather/64x64/day/116.png",
  };

  it("renders the date correctly", () => {
    render(<ForecastItem {...mockProps} />);

    expect(screen.getByText(new Date(mockProps.date).toLocaleDateString())).toBeInTheDocument();
  });

  it("renders the minimum temperature correctly", () => {
    render(<ForecastItem {...mockProps} />);

    expect(screen.getByText((content, element) => 
      element?.textContent === `Min: ${mockProps.minTemp}°C`
    )).toBeInTheDocument();
  });

  it("renders the maximum temperature correctly", () => {
    render(<ForecastItem {...mockProps} />);

    expect(screen.getByText((content, element) => 
      element?.textContent === `Max: ${mockProps.maxTemp}°C`
    )).toBeInTheDocument();
  });

  it("renders the weather icon correctly", () => {
    render(<ForecastItem {...mockProps} />);

    const imgElement = screen.getByAltText("Weather Icon");
    expect(imgElement).toBeInTheDocument();
    expect(imgElement).toHaveAttribute("src", mockProps.icon);
  });

  it("applies the correct styling classes", () => {
    render(<ForecastItem {...mockProps} />);

    const container = screen.getByText(new Date(mockProps.date).toLocaleDateString()).closest("div");

    expect(container).toHaveClass(
      "bg-gradient-to-b from-blue-500 to-blue-700 text-white p-4 rounded-lg shadow-lg flex flex-col items-center justify-center"
    );
  });
});
