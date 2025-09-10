import { useMemo, useState } from "react";
import Layout from "../components/Layout";
import Spinner from "../components/Spinner";
import ProductGrid from "../components/ProductGrid";
import useProducts from "../hooks/useProducts";
import useFilterState from "../hooks/useFilterState";
import FiltersPanel from "../components/filters/FiltersPanel";
import useDebouncedValue from "../hooks/useDebouncedValue";

export default function CatalogPage() {
  const { data, loading, error } = useProducts();
  const { filters, setFilters, options } = useFilterState(data);
  const [filtersOpen, setFiltersOpen] = useState(false);

  const [search, searching] = useDebouncedValue(filters.search, 300);

  const filteredProducts = useMemo(() => {
    if (!data?.length) return [];

    const s = search.trim().toLowerCase();
    const cats = filters.categories;

    return data.filter((p) => {
      const hitSearch =
        !s ||
        p.name?.toLowerCase().includes(s) ||
        p.brand?.toLowerCase().includes(s);

      const hitCategory =
        !cats.length || (p.category && cats.includes(p.category));

      return hitSearch && hitCategory;
    });
  }, [data, search, filters.categories]);

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

          {!loading && !error && searching && (
            <Spinner label="Applying filters..." />
          )}

          {!loading && !error && !searching && (
            <ProductGrid products={filteredProducts} />
          )}
        </div>
      </div>
    </Layout>
  );
}
