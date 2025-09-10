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

  const categoryBrandPriceRatingFilteredProducts = useMemo(() => {
    if (!products?.length) return [];

    const hasCategories = filters.categories.length > 0;
    const hasBrands = filters.brands.length > 0;
    const rawMin = Array.isArray(filters.price) ? filters.price[0] : undefined;
    const rawMax = Array.isArray(filters.price) ? filters.price[1] : undefined;

    const minSelectedPrice =
      rawMin === "" || Number.isNaN(Number(rawMin)) ? options.minPrice : Number(rawMin);
    const maxSelectedPrice =
      rawMax === "" || Number.isNaN(Number(rawMax)) ? options.maxPrice : Number(rawMax);
    const minSelectedRating =
      typeof filters.minRating === "number" ? filters.minRating : 0;

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

      const matchesRating =
        typeof product.rating === "number" &&
        product.rating >= minSelectedRating;

      return matchesCategory && matchesBrand && matchesPrice && matchesRating;
    });
  }, [
    products,
    filters.categories,
    filters.brands,
    filters.price,
    filters.minRating,
    options.minPrice,
    options.maxPrice,
  ]);

  // Final list 
  const [filteredProducts, setFilteredProducts] = useState(categoryBrandPriceRatingFilteredProducts);
  const [isApplyingFilters, setIsApplyingFilters] = useState(false);
  useEffect(() => {
    if (!products?.length) return;

    setIsApplyingFilters(true);
    const timerId = setTimeout(() => {
      setFilteredProducts(
        applySearch(categoryBrandPriceRatingFilteredProducts, debouncedSearchText)
      );
      setIsApplyingFilters(false);
    }, 500); // simulat

    return () => clearTimeout(timerId);
  }, [debouncedSearchText, categoryBrandPriceRatingFilteredProducts, products]);

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
