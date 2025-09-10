export default function ProductCard({ product }) {
    const { name, imageUrl, brand, category, price, rating } = product;
  
    return (
      <div className="group overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition hover:shadow-md">
        <div className="aspect-[4/3] w-full bg-gray-100">
          <img
            src={imageUrl}
            alt={name}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
  
        <div className="space-y-1 p-4">
          <div className="flex items-center justify-between">
            <h3 className="line-clamp-1 font-medium">{name}</h3>
            <span className="rounded-md bg-gray-50 px-2 py-0.5 text-xs text-gray-600">{category}</span>
          </div>
  
          <p className="text-sm text-gray-500">{brand}</p>
  
          <div className="mt-2 flex items-center justify-between">
            <span className="text-lg font-semibold">${price.toFixed(2)}</span>
            <span className="text-sm text-amber-500">★ {rating}</span>
          </div>
        </div>
      </div>
    );
  }
  