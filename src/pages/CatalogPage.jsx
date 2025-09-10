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
  const { data, loading, error } = useProducts();
  const { filters, setFilters, options } = useFilterState(data);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [debouncedSearch] = useDebouncedValue(filters.search, 800);

  const categoryFiltered = useMemo(() => {
    if (!data?.length) return [];
    if (!filters.categories.length) return data;
    return data.filter((p) => p.category && filters.categories.includes(p.category));
  }, [data, filters.categories]);

  const [filteredProducts, setFilteredProducts] = useState(categoryFiltered);
  const [applying, setApplying] = useState(false);

  useEffect(() => {
    if (!data?.length) return;

    setApplying(true);

    const id = setTimeout(() => {
      setFilteredProducts(applySearch(categoryFiltered, debouncedSearch));
      setApplying(false);
    }, 1000); // simulate 1 sec fetch

    return () => clearTimeout(id);
  }, [debouncedSearch, categoryFiltered, data]);

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
          options={{ categories: options.categories }}
        />

        <div className="flex-1">
          {loading && <Spinner label="Loading products..." />}

          {!loading && !error && applying && <Spinner label="Applying filters..." />}
          {!loading && !error && !applying && <ProductGrid products={filteredProducts} />}
        </div>
      </div>
    </Layout>
  );
}
