import { render, screen } from "@testing-library/react";
import { useWeather } from "../../context/Weather";
import Weather from "./Weather";

jest.mock("../../context/Weather", () => ({
  useWeather: jest.fn(),
}));

describe("Weather Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders nothing when weatherData is incomplete", () => {
    (useWeather as jest.Mock).mockReturnValue({ weatherData: null });

    const { container } = render(<Weather />);
    expect(container.firstChild).toBeNull();
  });

  it("renders the weather data correctly when available", () => {
    (useWeather as jest.Mock).mockReturnValue({
      weatherData: {
        location: {
          name: "Test City",
          region: "Test Region",
          country: "Test Country",
          localtime: "2024-12-19 14:30",
        },
        current: {
          temp_c: 22,
          condition: {
            text: "Sunny",
            icon: "https://example.com/sunny.png",
          },
          feelslike_c: 21,
          windchill_c: 20,
          humidity: 55,
          pressure_mb: 1015,
          vis_km: 10,
          uv: 3,
          wind_kph: 15,
          wind_dir: "N",
          gust_kph: 25,
          precip_mm: 0,
        },
      },
    });

    render(<Weather />);

    expect(screen.getByText(/Test City, Test Region/i)).toBeInTheDocument();
    expect(screen.getByText(/Test Country/i)).toBeInTheDocument();

    expect(screen.getByText(/Local Time/i)).toBeInTheDocument();

    expect(screen.getByText(/22°C/i)).toBeInTheDocument();
    expect(screen.getByText(/Sunny/i)).toBeInTheDocument();

    const icon = screen.getByAltText(/Sunny/i);
    expect(icon).toBeInTheDocument();
    expect(icon).toHaveAttribute("src", "https://example.com/sunny.png");

    expect(screen.getByText(/Feels Like/i)).toBeInTheDocument();
    expect(screen.getByText(/21°C/i)).toBeInTheDocument();
    expect(screen.getByText(/Wind Chill/i)).toBeInTheDocument();
    expect(screen.getByText(/20°C/i)).toBeInTheDocument();
    expect(screen.getByText(/Humidity/i)).toBeInTheDocument();
    expect(screen.getByText(/55%/i)).toBeInTheDocument();
    expect(screen.getByText(/Pressure/i)).toBeInTheDocument();
    expect(screen.getByText(/1015 mb/i)).toBeInTheDocument();
    expect(screen.getByText(/Visibility/i)).toBeInTheDocument();
    expect(screen.getByText(/10 km/i)).toBeInTheDocument();
    expect(screen.getByText(/UV Index/i)).toBeInTheDocument();
    expect(screen.getByText(/15 kph \(N\)/i)).toBeInTheDocument();
    expect(screen.getByText(/Gust Speed/i)).toBeInTheDocument();
    expect(screen.getByText(/25 kph/i)).toBeInTheDocument();
    expect(screen.getByText(/Precipitation/i)).toBeInTheDocument();
    expect(screen.getByText(/0 mm/i)).toBeInTheDocument();
  });
});
