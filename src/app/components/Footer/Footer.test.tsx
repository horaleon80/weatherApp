import React from "react";
import { render } from "@testing-library/react";
import Footer from "./Footer";

describe("Footer component", () => {
    it("renders without crashing", () => {
        const { getByText } = render(<Footer />);
        expect(getByText(/WeatherApp. All rights reserved./i)).toBeInTheDocument();
    });

    it("displays the current year", () => {
        const { getByText } = render(<Footer />);
        const currentYear = new Date().getFullYear();
        expect(getByText(new RegExp(`© ${currentYear} WeatherApp. All rights reserved.`, "i"))).toBeInTheDocument();
    });

    it("contains Privacy Policy link", () => {
        const { getByText } = render(<Footer />);
        expect(getByText(/Privacy Policy/i)).toBeInTheDocument();
    });

    it("contains Terms of Service link", () => {
        const { getByText } = render(<Footer />);
        expect(getByText(/Terms of Service/i)).toBeInTheDocument();
    });

    it("contains Contact Us link", () => {
        const { getByText } = render(<Footer />);
        expect(getByText(/Contact Us/i)).toBeInTheDocument();
    });
});