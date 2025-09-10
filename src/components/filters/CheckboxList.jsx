export default function CheckboxList({ title, items = [], selected = [], onToggle }) {
  return (
    <div className="rounded-lg border border-gray-200">
      <div className="border-b border-gray-200 px-3 py-2 text-sm font-medium">{title}</div>
      <div className="max-h-56 space-y-1 overflow-auto p-3">
        {items.map((label) => {
          const checked = selected.includes(label);
          return (
            <label key={label} className="flex cursor-pointer items-center gap-2 text-sm">
              <input
                type="checkbox"
                className="h-4 w-4 rounded border-gray-300"
                checked={checked}
                onChange={() => onToggle(label)}
              />
              <span>{label}</span>
            </label>
          );
        })}
      </div>
    </div>
  );
}
