import { useMemo, useState } from "react";

export default function useFilterState(products = []) {
  const categories = useMemo(() => {
    const list = [];
    for (const prod of products) {
      if (prod?.category && !list.includes(p.category)) list.push(prod.category);
    }
    return list.sort();
  }, [products]);

  const [filters, setFilters] = useState({
    search: "",
    categories: [],
  });

  return { filters, setFilters, options: { categories } };
}
