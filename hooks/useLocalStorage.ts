"use client";

import { useEffect, useState } from "react";

export function useLocalStorage<T>(
  key: string,
  initialValue: T
) {
  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    const item = localStorage.getItem(key);

    if (item) {
      setValue(JSON.parse(item));
    }
  }, [key]);

  const setStorageValue = (newValue: T) => {
    setValue(newValue);

    localStorage.setItem(
      key,
      JSON.stringify(newValue)
    );
  };

  return [value, setStorageValue] as const;
}