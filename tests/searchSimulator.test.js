import { describe, it, expect } from "vitest";
import { applySearch } from "../src/utils/helper/searchSimulator";

const products = [
  { id: 1, name: "Bluetooth Speaker", brand: "Brand B" },
  { id: 2, name: "Running Shoes", brand: "Brand C" },
  { id: 3, name: "Smartphone", brand: "TechCo" },
];

describe("Search filtering (applySearch)", () => {
  it("returns the original list when the search query is empty or whitespace", () => {
    expect(applySearch(products, "")).toEqual(products);
    expect(applySearch(products, "   ")).toEqual(products);
    expect(applySearch(products, undefined)).toEqual(products);
    expect(applySearch(products, null)).toEqual(products);
  });

  it.each([
    { query: "smart", expectedIds: [3], reason: "partial match against product name" },
    { query: "Brand C", expectedIds: [2], reason: "case-insensitive match against brand" },
    { query: "BLUETOOTH", expectedIds: [1], reason: "uppercase query still matches name" },
  ])("filters correctly by query: $query ($reason)", ({ query, expectedIds }) => {
    const result = applySearch(products, query);
    expect(result.map((p) => p.id)).toEqual(expectedIds);
  });

  it("returns an empty array when no products match the query", () => {
    expect(applySearch(products, "nope")).toEqual([]);
  });
}); 