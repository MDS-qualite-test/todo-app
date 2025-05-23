// src/__tests__/Counter.test.tsx
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Counter from "../components/Counter";

describe("Counter component", () => {
  test("renders with initial count", () => {
    render(<Counter initialCount={5} />);
    expect(screen.getByText(/Count: 5/i)).toBeInTheDocument();
  });

  test("increments count when increment button is clicked", () => {
    render(<Counter initialCount={0} />);
    fireEvent.click(screen.getByText(/increment/i));
    expect(screen.getByText(/Count: 1/i)).toBeInTheDocument();
  });

  test("decrements count when decrement button is clicked", () => {
    render(<Counter initialCount={5} />);
    fireEvent.click(screen.getByText(/decrement/i));
    expect(screen.getByText(/Count: 4/i)).toBeInTheDocument();
  });

  test("resets count when reset button is clicked", () => {
    render(<Counter initialCount={5} />);
    fireEvent.click(screen.getByText(/increment/i));
    expect(screen.getByText(/Count: 6/i)).toBeInTheDocument();
    fireEvent.click(screen.getByText(/reset/i));
    expect(screen.getByText(/Count: 5/i)).toBeInTheDocument();
  });
});
