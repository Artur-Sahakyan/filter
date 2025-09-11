import usePersistentFilters from "../src/hooks/usePersistentFilters";
import { describe, it, expect, beforeEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useState } from "react";

const STORAGE_KEY = "catalog-filters";

function Wrapper({ initial, options }) {
  const [filters, setFilters] = useState(initial);
  usePersistentFilters(filters, setFilters, options);
  return { filters, setFilters };
}

const options = {
  categories: ["A", "B"],
  brands: ["X", "Y"],
  minPrice: 0,
  maxPrice: 100,
};

beforeEach(() => {
  localStorage.clear();
});

describe("usePersistentFilters (localStorage integration)", () => {
  it("rehydrates a previously saved filter state when options become available", () => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        search: "hello",
        categories: ["A"],
        brands: ["X"],
        price: [10, 50],
        minRating: 3,
        sort: "price-asc",
      })
    );

    const { result } = renderHook(({ initial, options }) => Wrapper({ initial, options }), {
      initialProps: { initial: { search: "", categories: [], brands: [], price: [0, 100], minRating: 0, sort: "" }, options },
    });

    expect(result.current.filters).toMatchObject({
      search: "hello",
      categories: ["A"],
      brands: ["X"],
      price: [10, 50],
      minRating: 3,
      sort: "price-asc",
    });
  });

  it("persists filter updates to localStorage only after rehydration step", () => {
    const { result } = renderHook(({ initial, options }) => Wrapper({ initial, options }), {
      initialProps: { initial: { search: "", categories: [], brands: [], price: [0, 100], minRating: 0, sort: "" }, options },
    });

    act(() => {
      result.current.setFilters((prev) => ({ ...prev, search: "abc", sort: "price-desc" }));
    });

    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    expect(saved.search).toBe("abc");
    expect(saved.sort).toBe("price-desc");
  });

  it("ignores corrupted storage gracefully and proceeds with defaults", () => {
    localStorage.setItem(STORAGE_KEY, "{not-json}");

    const { result } = renderHook(({ initial, options }) => Wrapper({ initial, options }), {
      initialProps: { initial: { search: "", categories: [], brands: [], price: [0, 100], minRating: 0, sort: "" }, options },
    });

    expect(result.current.filters).toMatchObject({
      search: "",
      categories: [],
      brands: [],
      price: [0, 100],
      minRating: 0,
      sort: "",
    });
  });
}); 