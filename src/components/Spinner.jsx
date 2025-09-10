export default function Spinner({ label = "Loading..." }) {
    return (
      <div className="flex h-40 w-full items-center justify-center">
        <div className="flex items-center gap-3 text-gray-600">
          <span className="inline-block h-6 w-6 animate-spin rounded-full border-2 border-gray-300 border-t-transparent" />
          <span className="text-sm">{label}</span>
        </div>
      </div>
    );
  }
  