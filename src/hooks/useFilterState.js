import { useMemo, useState } from "react";

export default function useFilterState(products = []) {
  const { categories, brands } = useMemo(() => {
    const categoryList = [];
    const brandList = [];

    for (const product of products) {
      if (product?.category && !categoryList.includes(product.category)) {
        categoryList.push(product.category);
      }
      if (product?.brand && !brandList.includes(product.brand)) {
        brandList.push(product.brand);
      }
    }

    categoryList.sort();
    brandList.sort();

    return { categories: categoryList, brands: brandList };
  }, [products]);

  const [filters, setFilters] = useState({
    search: "",
    categories: [],
    brands: [],
  });

  return { filters, setFilters, options: { categories, brands } };
}
