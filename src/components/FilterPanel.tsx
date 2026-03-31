"use client";

import { useState } from "react";
import { SlidersHorizontal, X, Search } from "lucide-react";
import type { Filters } from "@/hooks/useFilters";
import type { Stage, Type } from "@/data/cbdcData";
import { STAGE_COLORS } from "@/components/CBDCMap";
import clsx from "clsx";

interface Props {
  filters: Filters;
  regions: string[];
  allTypes: Type[];
  onToggleStage: (stage: Stage) => void;
  onSetType: (type: Type | "All") => void;
  onSetRegion: (r: string) => void;
  onSetSearch: (q: string) => void;
  onClear: () => void;
  resultCount: number;
}

export function FilterPanel({
  filters,
  regions,
  allTypes,
  onToggleStage,
  onSetType,
  onSetRegion,
  onSetSearch,
  onClear,
  resultCount,
}: Props) {
  const [open, setOpen] = useState(false);

  const isFiltered =
    filters.stages.size < 5 ||
    !filters.types.has("All") ||
    filters.region !== "All" ||
    filters.searchQuery !== "";

  return (
    <div className="mb-6">
      {/* Search + toggle row */}
      <div className="flex flex-wrap gap-3 items-center mb-3">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 pointer-events-none" />
          <input
            type="text"
            placeholder="Search country or currency…"
            value={filters.searchQuery}
            onChange={(e) => onSetSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-slate-800/60 border border-slate-700/50 rounded-xl text-sm text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/30 transition-colors"
          />
        </div>
        <button
          onClick={() => setOpen((v) => !v)}
          className={clsx(
            "flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium border transition-all",
            open || isFiltered
              ? "bg-blue-500/10 border-blue-500/30 text-blue-400"
              : "bg-slate-800/60 border-slate-700/50 text-slate-300 hover:border-slate-600"
          )}
        >
          <SlidersHorizontal className="w-4 h-4" />
          {open ? "Hide filters" : "Show filters"}
          {isFiltered && (
            <span className="w-2 h-2 rounded-full bg-blue-400" />
          )}
        </button>
        {isFiltered && (
          <button
            onClick={onClear}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm text-slate-400 hover:text-slate-200 border border-slate-700/50 hover:border-slate-600 bg-slate-800/40 transition-all"
          >
            <X className="w-3.5 h-3.5" />
            Clear
          </button>
        )}
        <span className="text-xs text-slate-500 ml-auto">
          {resultCount} {resultCount === 1 ? "result" : "results"}
        </span>
      </div>

      {/* Expandable filter panel */}
      {open && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-4 bg-slate-800/40 border border-slate-700/40 rounded-xl">
          {/* Type */}
          <div>
            <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
              Type
            </label>
            <div className="flex flex-wrap gap-2">
              {(["All", ...allTypes] as (Type | "All")[]).map((t) => (
                <button
                  key={t}
                  onClick={() => onSetType(t)}
                  className={clsx(
                    "px-3 py-1 rounded-full text-xs font-medium border transition-all",
                    filters.types.has(t)
                      ? "bg-blue-500/20 border-blue-500/40 text-blue-300"
                      : "bg-slate-800 border-slate-700/50 text-slate-400 hover:text-slate-200"
                  )}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          {/* Region */}
          <div>
            <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
              Region
            </label>
            <select
              value={filters.region}
              onChange={(e) => onSetRegion(e.target.value)}
              className="w-full bg-slate-800 border border-slate-700/50 rounded-lg px-3 py-1.5 text-sm text-slate-200 focus:outline-none focus:border-blue-500/50"
            >
              {regions.map((r) => (
                <option key={r} value={r}>
                  {r}
                </option>
              ))}
            </select>
          </div>

          {/* Stage quick-select */}
          <div>
            <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
              Stage
            </label>
            <div className="flex flex-wrap gap-2">
              {(["Launched", "Pilot", "Proof of Concept", "Research", "Cancelled"] as Stage[]).map(
                (stage) => {
                  const active = filters.stages.has(stage);
                  return (
                    <button
                      key={stage}
                      onClick={() => onToggleStage(stage)}
                      className={clsx(
                        "flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border transition-all",
                        active
                          ? "bg-slate-800/60 border-slate-600/50 text-slate-200"
                          : "bg-slate-900/40 border-slate-700/30 text-slate-500 opacity-50"
                      )}
                    >
                      <span
                        className="w-2 h-2 rounded-full"
                        style={{ backgroundColor: STAGE_COLORS[stage] }}
                      />
                      {stage}
                    </button>
                  );
                }
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
