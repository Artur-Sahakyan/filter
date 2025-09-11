import CheckboxList from "./CheckboxList";
import { useEffect } from "react";

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


  useEffect(() => {
    if (open) {
      const prev = document.documentElement.style.overflow;
      document.documentElement.style.overflow = "hidden";
      return () => { document.documentElement.style.overflow = prev || ""; };
    }
    document.documentElement.style.overflow = "";
  }, [open]);


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

      {/* Rating  */}
      <div className="rounded-lg border border-gray-200">
        <div className="border-b border-gray-200 px-3 py-2 text-sm font-medium">Min Rating</div>
        <div className="p-3 space-y-2">
          {[5, 4, 3, 2, 1, 0].map((stars) => (
            <label key={stars} className="flex items-center gap-2 text-sm cursor-pointer">
              <input
                type="radio"
                name="min-rating"
                className="h-4 w-4"
                checked={Number(filters.minRating) === stars}
                onChange={() => setFilters({ ...filters, minRating: stars })}
              />
              <span className="text-amber-500">{"★".repeat(stars)}</span>
              <span className="text-gray-500">{stars === 0 ? "Any" : `${stars === 5 ? stars : stars + "+"}`}</span>
            </label>
          ))}
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
            minRating: 0,
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
          <div className="absolute inset-y-0 left-0 w-80 max-w-[85vw] bg-white shadow-xl flex h-full">
            <div className="flex h-full w-full flex-col">
              <div className="flex items-center justify-between border-b p-4">
                <h2 className="text-lg font-semibold">Filters</h2>
                <button className="rounded border px-2 py-1 text-sm" onClick={onClose}>Close</button>
              </div>
              <div className="flex-1 overflow-y-auto p-4 overscroll-contain">
                {Body}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
