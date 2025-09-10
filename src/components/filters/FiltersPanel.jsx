import CheckboxList from "./CheckboxList";

export default function FiltersPanel({ open, onClose, filters, setFilters, options }) {
  const toggleCategory = (c) => {
    console.log(c)
  };

  const Body = (
    <div className="space-y-4">
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

      <CheckboxList
        title="Category"
        items={options.categories}
        selected={filters.categories}
        onToggle={toggleCategory}
      />

      <button
        type="button"
        onClick={() => setFilters({ search: "", categories: [] })}
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
