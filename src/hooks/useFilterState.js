import { useEffect, useMemo, useState } from "react";

export default function useFilterState(products = []) {
  const { categories, brands, minPrice, maxPrice } = useMemo(() => {
    const categoryList = [];
    const brandList = [];
    let min = Infinity;
    let max = 0;

    for (const product of products) {
      if (product?.category && !categoryList.includes(product.category)) {
        categoryList.push(product.category);
      }
      if (product?.brand && !brandList.includes(product.brand)) {
        brandList.push(product.brand);
      }
      if (typeof product?.price === "number") {
        if (product.price < min) min = product.price;
        if (product.price > max) max = product.price;
      }
    }

    if (!isFinite(min)) min = 0;
    if (!isFinite(max)) max = 0;

    categoryList.sort();
    brandList.sort();

    return {
      categories: categoryList,
      brands: brandList,
      minPrice: Math.floor(min),
      maxPrice: Math.ceil(max),
    };
  }, [products]);

  const [filters, setFilters] = useState({
    search: "",
    categories: [],
    brands: [],
    price: [minPrice, maxPrice],
    minRating: 0,
    sort: "",
  });

  useEffect(() => {
    setFilters((prev) => ({ ...prev, price: [minPrice, maxPrice] }));
  }, [minPrice, maxPrice]);

  return { filters, setFilters, options: { categories, brands, minPrice, maxPrice } };
}
