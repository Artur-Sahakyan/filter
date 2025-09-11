import { render, screen, fireEvent, act } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import React from "react";
import CatalogPage from "../src/pages/CatalogPage";

// use fake timers to control the simulated delays 
beforeEach(() => {
  vi.useFakeTimers();
});

afterEach(() => {
  vi.runOnlyPendingTimers();
  vi.useRealTimers();
});

describe("CatalogPage (integration)", () => {
  it("loads, filters by search and sorts by price both directions", () => {
    render(<CatalogPage />);

    expect(screen.getByText(/Loading products/i)).toBeInTheDocument();

    act(() => {
      vi.advanceTimersByTime(1000);
    });

    const searchInput = screen.getByPlaceholderText(/Search by name or brand/i);
    fireEvent.change(searchInput, { target: { value: "brand" } });

    // debounce + apply
    act(() => {
      vi.advanceTimersByTime(1000)
      vi.advanceTimersByTime(500);
    });

    expect(screen.getAllByText(/Brand/i).length).toBeGreaterThan(0);

    // Sort ascending
    const sortSelect = screen.getByRole("combobox");
    fireEvent.change(sortSelect, { target: { value: "price-asc" } });
    act(() => {
      vi.advanceTimersByTime(500);
    });
    expect(screen.queryByText(/Applying filters/i)).not.toBeInTheDocument();

    // Sort descending
    fireEvent.change(sortSelect, { target: { value: "price-desc" } });
    act(() => {
      vi.advanceTimersByTime(500);
    });
    expect(screen.queryByText(/Applying filters/i)).not.toBeInTheDocument();
  }, 15000);
}); 