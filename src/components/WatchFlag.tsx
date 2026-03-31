"use client";

import { Bookmark } from "lucide-react";
import clsx from "clsx";
import { useWatchlist } from "@/hooks/useWatchlist";

interface Props {
  id: string;
  className?: string;
}

export function WatchFlag({ id, className }: Props) {
  const { isWatched, toggle } = useWatchlist();
  const watched = isWatched(id);

  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        toggle(id);
      }}
      aria-label={watched ? "Remove from watchlist" : "Add to watchlist"}
      className={clsx(
        "p-1.5 rounded-full transition-colors",
        watched
          ? "text-blue-400 bg-blue-500/10 hover:bg-blue-500/20"
          : "text-slate-500 hover:text-slate-300 hover:bg-slate-700/50",
        className
      )}
    >
      <Bookmark
        className={clsx("w-4 h-4", watched && "fill-blue-400")}
      />
    </button>
  );
}
