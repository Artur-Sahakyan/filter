import { useEffect, useState } from "react";

export default function useDebouncedValue(value, delay = 250) {
  const [val, setValue] = useState(value);
  const [isDebouncing, setIsDebouncing] = useState(false);

  useEffect(() => {
    setIsDebouncing(true);
    const id = setTimeout(() => {
        setValue(value);
      setIsDebouncing(false);
    }, delay);
    return () => clearTimeout(id);
  }, [value, delay]);

  return [val, isDebouncing];
}
