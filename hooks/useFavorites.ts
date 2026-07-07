"use client";

import { useState, useEffect } from "react";

const STORAGE_KEY = "favorites";

export function useFavorites() {
  // читаємо збережене ОДРАЗУ при ініціалізації стану
  const [favorites, setFavorites] = useState<string[]>(() => {
    if (typeof window === "undefined") return [];   // захист для SSR
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  });

  // зберігаємо щоразу при зміні
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
  }, [favorites]);

  const isFavorite = (id: string) => favorites.includes(id);

  const toggleFavorite = (id: string) => {
    setFavorites((prev) =>
      prev.includes(id)
        ? prev.filter((item) => item !== id)
        : [...prev, id]
    );
  };

  return { favorites, isFavorite, toggleFavorite };
}