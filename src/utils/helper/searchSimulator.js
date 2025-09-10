export function applySearch(list, searchText) {
    const query = (searchText || "").trim().toLowerCase();
    if (!query) return list;
    return list.filter(
      (p) =>
        p.name?.toLowerCase().includes(query) ||
        p.brand?.toLowerCase().includes(query)
    );
  }
