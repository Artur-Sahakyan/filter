import { useEffect, useState } from "react";
import { PRODUCTS } from "../data/products";

// Simulate loading like fetching products from real api
export default function useProducts() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);

    const timer = setTimeout(() => {
      try {
        setData(PRODUCTS);
      }
      finally {
        setLoading(false);
      }
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  return { data, loading };
}
