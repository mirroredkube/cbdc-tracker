"use client";

import { useState, useEffect, useCallback } from "react";

const STORAGE_KEY = "cbdc-watchlist";

export function useWatchlist() {
  // Initialize empty — localStorage is only available after hydration
  const [watchlist, setWatchlist] = useState<Set<string>>(new Set());

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) setWatchlist(new Set(JSON.parse(stored) as string[]));
    } catch {
      // ignore parse errors
    }
  }, []);

  const toggle = useCallback((id: string) => {
    setWatchlist((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify([...next]));
      } catch {
        // ignore quota errors
      }
      return next;
    });
  }, []);

  const isWatched = useCallback(
    (id: string) => watchlist.has(id),
    [watchlist]
  );

  return { watchlist, toggle, isWatched };
}
