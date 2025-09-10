import CheckboxList from "./CheckboxList";

export default function FiltersPanel({ open, onClose, filters, setFilters, options }) {
  const toggleCategory = (category) => {
    const isSelected = filters.categories.includes(category);
    const next = isSelected
      ? filters.categories.filter((c) => c !== category)
      : [...filters.categories, category];
    setFilters({ ...filters, categories: next });
  };

  const toggleBrand = (brand) => {
    const isSelected = filters.brands?.includes(brand);
    const next = isSelected
      ? filters.brands.filter((b) => b !== brand)
      : [...(filters.brands || []), brand];
    setFilters({ ...filters, brands: next });
  };

  const Body = (
    <div className="space-y-4">
      {/* Search */}
      <div className="rounded-lg border border-gray-200">
        <div className="border-b border-gray-200 px-3 py-2 text-sm font-medium">Search</div>
        <div className="p-3">
          <input
            type="text"
            value={filters.search}
            onChange={(e) => setFilters({ ...filters, search: e.target.value })}
            placeholder="Search by name or brand"
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:none"
          />
        </div>
      </div>

      {/* Category */}
      <CheckboxList
        title="Category"
        items={options.categories}
        selected={filters.categories}
        onToggle={toggleCategory}
      />

      {/* Brand */}
      {options.brands && (
        <CheckboxList
          title="Brand"
          items={options.brands}
          selected={filters.brands || []}
          onToggle={toggleBrand}
        />
      )}

    {/* Price Range */}
    <div className="rounded-lg border border-gray-200">
      <div className="border-b border-gray-200 px-3 py-2 text-sm font-medium">
        Price Range
      </div>
      <div className="p-3 grid grid-cols-2 gap-3">
        <input
          type="number"
          value={filters.price[0]}
          placeholder={`${options.minPrice}`}
          onChange={(e) =>
            setFilters({
              ...filters,
              price: [e.target.value === "" ? "" : Number(e.target.value), filters.price[1]],
            })
          }
          className="no-spinner rounded-md border border-gray-300 px-2 py-2 text-sm outline-none"
        />

        <input
          type="number"
          value={filters.price[1]}
          placeholder={`${options.maxPrice}`}
          onChange={(e) =>
            setFilters({
              ...filters,
              price: [filters.price[0], e.target.value === "" ? "" : Number(e.target.value)],
            })
          }
          className="no-spinner rounded-md border border-gray-300 px-2 py-2 text-sm outline-none"
        />
      </div>
    </div>


      <button
        type="button"
        onClick={() =>
          setFilters({
            search: "",
            categories: [],
            brands: [],
            price: [options.minPrice, options.maxPrice],
          })
        }
        className="w-full rounded-md bg-gray-100 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200"
      >
        Reset
      </button>
    </div>
  );

  return (
    <>
      {/* Desktop */}
      <aside className="hidden w-full max-w-xs shrink-0 lg:block">
        {Body}
      </aside>

      {/* Mobile*/}
      {open && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div className="absolute inset-0 bg-black/30" onClick={onClose} />
          <div className="absolute inset-y-0 left-0 w-80 max-w-[85vw] bg-white p-4 shadow-xl">
            <div className="mb-3 flex items-center justify-between">
              <h2 className="text-lg font-semibold">Filters</h2>
              <button className="rounded border px-2 py-1 text-sm" onClick={onClose}>Close</button>
            </div>
            {Body}
          </div>
        </div>
      )}
    </>
  );
}
