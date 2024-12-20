import React from "react";
import { render } from "@testing-library/react";
import Loader from "./Loader";
import "@testing-library/jest-dom";

describe("Loader component", () => {
  it("should render without crashing", () => {
    const { container } = render(<Loader />);
    expect(container).toBeInTheDocument();
  });

  it("should have three bouncing divs", () => {
    const { container } = render(<Loader />);
    const bouncingDivs = container.querySelectorAll(".animate-bounce");
    expect(bouncingDivs.length).toBe(3);
  });

  it("should have the correct classes applied", () => {
    const { container } = render(<Loader />);
    const bouncingDivs = container.querySelectorAll(".animate-bounce");
    expect(bouncingDivs[0]).toHaveClass("w-3 h-6 bg-blue-400 rounded-full");
    expect(bouncingDivs[1]).toHaveClass(
      "w-3 h-6 bg-blue-400 rounded-full delay-200"
    );
    expect(bouncingDivs[2]).toHaveClass(
      "w-3 h-6 bg-blue-400 rounded-full delay-400"
    );
  });
});
