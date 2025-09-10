import { useEffect, useMemo, useState } from "react";
import Layout from "../components/Layout";
import Spinner from "../components/Spinner";
import ProductGrid from "../components/ProductGrid";
import useProducts from "../hooks/useProducts";
import useFilterState from "../hooks/useFilterState";
import FiltersPanel from "../components/filters/FiltersPanel";
import useDebouncedValue from "../hooks/useDebouncedValue";
import { applySearch } from "../utils/helper/searchSimulator";

export default function CatalogPage() {
  const { data: products, loading, error } = useProducts();
  const { filters, setFilters, options } = useFilterState(products);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [debouncedSearchText] = useDebouncedValue(filters.search, 1000);

  const categoryBrandPriceFilteredProducts = useMemo(() => {
    if (!products?.length) return [];

    const hasCategories = filters.categories.length > 0;
    const hasBrands = filters.brands.length > 0;
    const minSelectedPrice =
      Array.isArray(filters.price) && typeof filters.price[0] === "number"
        ? filters.price[0]
        : options.minPrice;
    const maxSelectedPrice =
      Array.isArray(filters.price) && typeof filters.price[1] === "number"
        ? filters.price[1]
        : options.maxPrice;

    return products.filter((product) => {
      const matchesCategory =
        !hasCategories ||
        (product.category && filters.categories.includes(product.category));

      const matchesBrand =
        !hasBrands ||
        (product.brand && filters.brands.includes(product.brand));

      const matchesPrice =
        typeof product.price === "number" &&
        product.price >= minSelectedPrice &&
        product.price <= maxSelectedPrice;

      return matchesCategory && matchesBrand && matchesPrice;
    });
  }, [products, filters.categories, filters.brands, filters.price, options.minPrice, options.maxPrice]);

  const [filteredProducts, setFilteredProducts] = useState(categoryBrandPriceFilteredProducts);
  const [isApplyingFilters, setIsApplyingFilters] = useState(false);
  useEffect(() => {
    if (!products?.length) return;

    setIsApplyingFilters(true);
    const timerId = setTimeout(() => {
      setFilteredProducts(
        applySearch(categoryBrandPriceFilteredProducts, debouncedSearchText)
      );
      setIsApplyingFilters(false);
    }, 500);

    return () => clearTimeout(timerId);
  }, [debouncedSearchText, categoryBrandPriceFilteredProducts, products]);

  return (
    <Layout title="Product Catalog">
      <div className="mb-4 lg:hidden">
        <button
          className="rounded border px-3 py-2 text-sm font-medium"
          onClick={() => setFiltersOpen(true)}
        >
          Open Filters
        </button>
      </div>

      <div className="flex gap-6">
        <FiltersPanel
          open={filtersOpen}
          onClose={() => setFiltersOpen(false)}
          filters={filters}
          setFilters={setFilters}
          options={{
            categories: options.categories,
            brands: options.brands,
            minPrice: options.minPrice,
            maxPrice: options.maxPrice,
          }}
        />

        <div className="flex-1">
          {loading && <Spinner label="Loading products..." />}

          {!loading && !error && isApplyingFilters && (
            <Spinner label="Applying filters..." />
          )}

          {!loading && !error && !isApplyingFilters && (
            <ProductGrid products={filteredProducts} />
          )}
        </div>
      </div>
    </Layout>
  );
}
