import { useEffect, useRef } from "react";

const STORAGE_KEY = "catalog-filters";

const num = (val, fallback) => {
  const n = Number(val);
  return Number.isFinite(n) ? n : fallback;
};

function sanitizeFilters(persisted = {}, options = {}) {
  const {
    categories: allCategories = [],
    brands: allBrands = [],
    minPrice: minOpt = 0,
    maxPrice: maxOpt = 0,
  } = options;

  const search = String(persisted.search || "");

  const categories = (persisted.categories || []).filter((c) =>
    allCategories.length ? allCategories.includes(c) : true
  );

  const brands = (persisted.brands || []).filter((b) =>
    allBrands.length ? allBrands.includes(b) : true
  );

  let minSel =
    persisted.price && persisted.price[0] === ""
      ? minOpt
      : num(persisted.price?.[0], minOpt);
  let maxSel =
    persisted.price && persisted.price[1] === ""
      ? maxOpt
      : num(persisted.price?.[1], maxOpt);

  minSel = Math.max(minOpt, Math.min(minSel, maxOpt));
  maxSel = Math.max(minOpt, Math.min(maxSel, maxOpt));
  if (minSel > maxSel) [minSel, maxSel] = [maxSel, minSel];

  const minRating = num(persisted.minRating, 0);
  const sort = ["price-asc", "price-desc"].includes(persisted.sort) ? persisted.sort : "";

  return { search, categories, brands, price: [minSel, maxSel], minRating, sort };
}

export default function usePersistentFilters(filters, setFilters, options) {
  const hasRehydratedRef = useRef(false);

  useEffect(() => {
    if (hasRehydratedRef.current) return;
    if (options == null) return;
    const { minPrice = 0, maxPrice = 0 } = options;
    if (!Number.isFinite(minPrice) || !Number.isFinite(maxPrice)) return;

    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      try {
        const parsed = JSON.parse(raw);
        setFilters(sanitizeFilters(parsed, options));
      } catch  {
        ///
      }
    }
    hasRehydratedRef.current = true;
  }, [options, setFilters]);

  useEffect(() => {
    if (!hasRehydratedRef.current) return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filters));
  }, [filters]);
}
