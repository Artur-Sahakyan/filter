import { renderHook } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import useFilterState from "../src/hooks/useFilterState";

const products = [
  { id: 1, category: "Electronics", brand: "Brand A", price: 10 },
  { id: 2, category: "Electronics", brand: "Brand B", price: 25 },
  { id: 3, category: "Clothing", brand: "Brand C", price: 5 },
];

describe("useFilterState", () => {
  it("derives unique, sorted category and brand options and correct price bounds from the data set", () => {
    const { result } = renderHook(() => useFilterState(products));
    expect(result.current.options.categories).toEqual(["Clothing", "Electronics"]);
    expect(result.current.options.brands).toEqual(["Brand A", "Brand B", "Brand C"]);
    expect(result.current.options.minPrice).toBe(5);
    expect(result.current.options.maxPrice).toBe(25);
  });

  it("initializes filters to defaults that align with derived bounds (ready for API-driven data)", () => {
    const { result } = renderHook(() => useFilterState(products));
    const { filters, options } = result.current;
    expect(filters).toMatchObject({
      search: "",
      categories: [],
      brands: [],
      price: [options.minPrice, options.maxPrice],
      minRating: 0,
      sort: "",
    });
  });
}); 