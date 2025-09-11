import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import FiltersPanel from "../src/components/filters/FiltersPanel";

function renderPanel() {
  const filters = {
    search: "",
    categories: [],
    brands: [],
    price: [0, 100],
    minRating: 0,
    sort: "",
  };
  const setFilters = vi.fn();
  const options = { categories: ["A"], brands: ["X"], minPrice: 0, maxPrice: 100 };
  render(<FiltersPanel open={false} onClose={() => {}} filters={filters} setFilters={setFilters} options={options} />);
  return { setFilters };
}

describe("FiltersPanel", () => {
  it("changes sort select value", () => {
    const { setFilters } = renderPanel();
    const select = screen.getByRole("combobox");
    fireEvent.change(select, { target: { value: "price-asc" } });
    expect(setFilters).toHaveBeenCalledWith({
      search: "",
      categories: [],
      brands: [],
      price: [0, 100],
      minRating: 0,
      sort: "price-asc",
    });
  });
}); 