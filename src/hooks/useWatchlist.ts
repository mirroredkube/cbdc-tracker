"use client";

import { useState, useCallback } from "react";

const STORAGE_KEY = "cbdc-watchlist";

function readInitialWatchlist() {
  if (typeof window === "undefined") {
    return new Set<string>();
  }

  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? new Set(JSON.parse(stored) as string[]) : new Set<string>();
  } catch {
    return new Set<string>();
  }
}

export function useWatchlist() {
  const [watchlist, setWatchlist] = useState<Set<string>>(readInitialWatchlist);

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
