export default function Layout({ title = "", children }) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-6">
        <header className="mb-6 flex items-center justify-between">
          <h1 className="text-2xl font-bold">{title}</h1>
        </header>
        {children}
      </div>
    );
  }
  