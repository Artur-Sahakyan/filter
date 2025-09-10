import FiltersPanel from "../components/filters/FiltersPanel";
import useFilterState from "../hooks/useFilterState";
import ProductGrid from "../components/ProductGrid";
import useProducts from "../hooks/useProducts";
import Spinner from "../components/Spinner";
import Layout from "../components/Layout";
import { useState } from "react";

export default function CatalogPage() {
  const [filtersOpen, setFiltersOpen] = useState(false);
  const { data, loading, error } = useProducts();
  const { filters, setFilters, options } = useFilterState(data);

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
          {!loading && !error && <ProductGrid products={data} />}
        </div>
      </div>
    </Layout>
  );
}
