"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { ChevronUp, ChevronDown, ChevronsUpDown, Settings2, ExternalLink } from "lucide-react";
import type { CBDCProject } from "@/data/cbdcData";
import { StatusPill } from "./StatusPill";
import { WatchFlag } from "./WatchFlag";
import clsx from "clsx";

type SortKey = "currencyName" | "country" | "stage" | "announcementYear" | "techStack" | "usesDLT" | "interoperable";

interface ColumnDef {
  key: SortKey;
  label: string;
  defaultVisible: boolean;
}

const COLUMNS: ColumnDef[] = [
  { key: "currencyName", label: "Currency", defaultVisible: true },
  { key: "country", label: "Country", defaultVisible: true },
  { key: "stage", label: "Status", defaultVisible: true },
  { key: "announcementYear", label: "Year", defaultVisible: true },
  { key: "techStack", label: "Technology", defaultVisible: true },
  { key: "usesDLT", label: "DLT", defaultVisible: true },
  { key: "interoperable", label: "Interoperable", defaultVisible: false },
];

const PAGE_SIZE = 10;

interface Props {
  projects: CBDCProject[];
  onSelect: (project: CBDCProject) => void;
}

export function CurrenciesTable({ projects, onSelect }: Props) {
  const [sortKey, setSortKey] = useState<SortKey>("currencyName");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("asc");
  const [page, setPage] = useState(1);
  const [visibleCols, setVisibleCols] = useState<Set<SortKey>>(
    new Set(COLUMNS.filter((c) => c.defaultVisible).map((c) => c.key))
  );
  const [colPickerOpen, setColPickerOpen] = useState(false);

  const sorted = useMemo(() => {
    return [...projects].sort((a, b) => {
      const av = a[sortKey];
      const bv = b[sortKey];
      const cmp =
        typeof av === "boolean"
          ? Number(av) - Number(bv)
          : typeof av === "number"
          ? av - (bv as number)
          : String(av).localeCompare(String(bv));
      return sortDir === "asc" ? cmp : -cmp;
    });
  }, [projects, sortKey, sortDir]);

  const totalPages = Math.max(1, Math.ceil(sorted.length / PAGE_SIZE));
  const pageData = sorted.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortDir("asc");
    }
    setPage(1);
  };

  const toggleCol = (key: SortKey) => {
    setVisibleCols((prev) => {
      const next = new Set(prev);
      if (next.has(key)) {
        if (next.size === 1) return prev;
        next.delete(key);
      } else {
        next.add(key);
      }
      return next;
    });
  };

  function SortIcon({ col }: { col: SortKey }) {
    if (sortKey !== col) return <ChevronsUpDown className="w-3.5 h-3.5 text-slate-600" />;
    return sortDir === "asc"
      ? <ChevronUp className="w-3.5 h-3.5 text-blue-400" />
      : <ChevronDown className="w-3.5 h-3.5 text-blue-400" />;
  }

  const activeColumns = COLUMNS.filter((c) => visibleCols.has(c.key));

  return (
    <div className="glass-panel rounded-2xl overflow-hidden mt-8">
      {/* Table header row */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-slate-700/50">
        <span className="text-sm font-semibold text-white">
          All Currencies
          <span className="ml-2 text-xs font-normal text-slate-500">{projects.length} total</span>
        </span>
        <div className="relative">
          <button
            onClick={() => setColPickerOpen((v) => !v)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-400 hover:text-slate-200 border border-slate-700/50 hover:border-slate-600 bg-slate-800/40 transition-all"
          >
            <Settings2 className="w-3.5 h-3.5" />
            Edit columns
          </button>
          {colPickerOpen && (
            <div className="absolute right-0 top-9 z-20 bg-slate-800 border border-slate-700/50 rounded-xl shadow-2xl p-3 w-48">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Columns</p>
              {COLUMNS.map((col) => (
                <label key={col.key} className="flex items-center gap-2 py-1 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={visibleCols.has(col.key)}
                    onChange={() => toggleCol(col.key)}
                    className="accent-blue-500"
                  />
                  <span className="text-sm text-slate-200">{col.label}</span>
                </label>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-700/50">
              {activeColumns.map((col) => (
                <th
                  key={col.key}
                  onClick={() => handleSort(col.key)}
                  className="px-4 py-3 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider cursor-pointer hover:text-slate-200 whitespace-nowrap select-none"
                >
                  <span className="flex items-center gap-1">
                    {col.label}
                    <SortIcon col={col.key} />
                  </span>
                </th>
              ))}
              <th className="px-4 py-3 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider w-20">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {pageData.map((project, i) => (
              <tr
                key={project.id}
                onClick={() => onSelect(project)}
                className={clsx(
                  "border-b border-slate-700/20 last:border-0 hover:bg-slate-800/50 cursor-pointer transition-colors",
                  i % 2 === 0 ? "bg-transparent" : "bg-slate-800/20"
                )}
              >
                {activeColumns.map((col) => {
                  return (
                    <td key={col.key} className="px-4 py-3 whitespace-nowrap">
                      {col.key === "currencyName" && (
                        <div className="flex items-center gap-2">
                          {project.flagUrl && (
                            <img src={project.flagUrl} alt="" className="w-5 h-5 rounded-full object-cover border border-slate-700" />
                          )}
                          <span className="font-medium text-white">{project.currencyName}</span>
                        </div>
                      )}
                      {col.key === "country" && <span className="text-slate-300">{project.country}</span>}
                      {col.key === "stage" && <StatusPill label={project.stage} variant={project.stage} />}
                      {col.key === "announcementYear" && <span className="text-slate-300">{project.announcementYear}</span>}
                      {col.key === "techStack" && (
                        <span className="text-xs font-mono text-emerald-400 truncate max-w-[160px] block">
                          {project.techStack}
                        </span>
                      )}
                      {col.key === "usesDLT" && (
                        <span className={project.usesDLT ? "text-emerald-400" : "text-red-400"}>
                          {project.usesDLT ? "Yes" : "No"}
                        </span>
                      )}
                      {col.key === "interoperable" && (
                        <span className={project.interoperable ? "text-emerald-400" : "text-slate-400"}>
                          {project.interoperable ? "Yes" : "No"}
                        </span>
                      )}
                    </td>
                  );
                })}
                <td className="px-4 py-3" onClick={(e) => e.stopPropagation()}>
                  <div className="flex items-center gap-1">
                    <WatchFlag id={project.id} />
                    <Link
                      href={`/currency/${project.tag}`}
                      className="p-1 rounded text-slate-500 hover:text-blue-400 transition-colors"
                      aria-label="View details"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between px-4 py-3 border-t border-slate-700/50">
          <span className="text-xs text-slate-500">
            Page {page} of {totalPages}
          </span>
          <div className="flex gap-1">
            <button
              disabled={page === 1}
              onClick={() => setPage((p) => p - 1)}
              className="px-3 py-1 text-xs rounded-lg border border-slate-700/50 text-slate-400 hover:text-slate-200 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
            >
              Previous
            </button>
            <button
              disabled={page === totalPages}
              onClick={() => setPage((p) => p + 1)}
              className="px-3 py-1 text-xs rounded-lg border border-slate-700/50 text-slate-400 hover:text-slate-200 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
