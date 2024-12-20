import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { useWeather } from "../../context/Weather";
import Aside from "./Aside";

jest.mock("../Suggestion/Suggestion", () => {
  const MockSuggestion = ({ suggestion, selectedCondition }: { suggestion: string; selectedCondition: string }) => (
    <div data-testid="suggestion">{`${suggestion} - ${selectedCondition}`}</div>
  );
  MockSuggestion.displayName = "MockSuggestion";
  return MockSuggestion;
});

jest.mock("../../context/Weather", () => ({
  useWeather: jest.fn(),
}));

describe("Aside Component", () => {
  const mockWeatherData = {
    location: { name: "Test City" },
    current: { condition: { text: "Sunny" } },
  };

  beforeEach(() => {
    (useWeather as jest.Mock).mockReturnValue({ weatherData: mockWeatherData });
  });

  it("renders the Aside component", () => {
    render(<Aside />);

    expect(screen.getByText(/Popular Cities/i)).toBeInTheDocument();
    expect(
      screen.getByLabelText(/Filter by Weather Condition/i)
    ).toBeInTheDocument();
    expect(screen.getAllByTestId("suggestion")).toHaveLength(10);
  });

  it("renders the dropdown and allows condition selection", () => {
    render(<Aside />);

    const dropdown = screen.getByLabelText(
      /Filter by Weather Condition/i
    ) as HTMLSelectElement;
    expect(dropdown).toBeInTheDocument();

    expect(dropdown.value).toBe("");

    fireEvent.change(dropdown, { target: { value: "Sunny" } });
    expect(dropdown.value).toBe("Sunny");
  });

  it("renders the correct Suggestion components with selected condition", () => {
    render(<Aside />);

    const dropdown = screen.getByLabelText(/Filter by Weather Condition/i);
    fireEvent.change(dropdown, { target: { value: "Cloudy" } });

    const suggestions = screen.getAllByTestId("suggestion");
    suggestions.forEach((suggestion) => {
      expect(suggestion.textContent).toContain("Cloudy");
    });
  });

  it("does not render if weatherData is missing", () => {
    (useWeather as jest.Mock).mockReturnValue({ weatherData: null });

    const { container } = render(<Aside />);
    expect(container.firstChild).toBeNull();
  });

  it("does not render if location or current is missing", () => {
    (useWeather as jest.Mock).mockReturnValue({
      weatherData: { location: null, current: null },
    });

    const { container } = render(<Aside />);
    expect(container.firstChild).toBeNull();
  });
});
