"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { ChevronUp, ChevronDown, ChevronsUpDown, Settings2, ExternalLink } from "lucide-react";
import type { CBDCProject } from "@/data/cbdcData";
import { FlagImage } from "./FlagImage";
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
    if (sortKey !== col) return <ChevronsUpDown className="w-3.5 h-3.5 dark:text-slate-600 text-slate-400" />;
    return sortDir === "asc"
      ? <ChevronUp className="w-3.5 h-3.5 text-blue-400" />
      : <ChevronDown className="w-3.5 h-3.5 text-blue-400" />;
  }

  const activeColumns = COLUMNS.filter((c) => visibleCols.has(c.key));

  return (
    <div className="glass-panel rounded-2xl overflow-hidden mt-8">
      {/* Table header row */}
      <div className="flex items-center justify-between px-4 py-3 border-b dark:border-slate-700/50 border-slate-200">
        <span className="text-sm font-semibold dark:text-white text-slate-900">
          All Currencies
          <span className="ml-2 text-xs font-normal text-slate-500">{projects.length} total</span>
        </span>
        <div className="relative">
          <button
            onClick={() => setColPickerOpen((v) => !v)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium dark:text-slate-400 text-slate-500 dark:hover:text-slate-200 hover:text-slate-700 border dark:border-slate-700/50 border-slate-200 dark:hover:border-slate-600 hover:border-slate-300 dark:bg-slate-800/40 bg-white transition-all"
          >
            <Settings2 className="w-3.5 h-3.5" />
            Edit columns
          </button>
          {colPickerOpen && (
            <div className="absolute right-0 top-9 z-20 dark:bg-slate-800 bg-white border dark:border-slate-700/50 border-slate-200 rounded-xl shadow-2xl p-3 w-48">
              <p className="text-xs font-bold dark:text-slate-400 text-slate-500 uppercase tracking-wider mb-2">Columns</p>
              {COLUMNS.map((col) => (
                <label key={col.key} className="flex items-center gap-2 py-1 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={visibleCols.has(col.key)}
                    onChange={() => toggleCol(col.key)}
                    className="accent-blue-500"
                  />
                  <span className="text-sm dark:text-slate-200 text-slate-700">{col.label}</span>
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
            <tr className="border-b dark:border-slate-700/50 border-slate-200">
              {activeColumns.map((col) => (
                <th
                  key={col.key}
                  onClick={() => handleSort(col.key)}
                  className="px-4 py-3 text-left text-xs font-semibold dark:text-slate-400 text-slate-500 uppercase tracking-wider cursor-pointer dark:hover:text-slate-200 hover:text-slate-700 whitespace-nowrap select-none"
                >
                  <span className="flex items-center gap-1">
                    {col.label}
                    <SortIcon col={col.key} />
                  </span>
                </th>
              ))}
              <th className="px-4 py-3 text-left text-xs font-semibold dark:text-slate-400 text-slate-500 uppercase tracking-wider w-20">
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
                  "border-b dark:border-slate-700/20 border-slate-100 last:border-0 dark:hover:bg-slate-800/50 hover:bg-slate-50 cursor-pointer transition-colors",
                  i % 2 === 0 ? "bg-transparent" : "dark:bg-slate-800/20 bg-slate-50/60"
                )}
              >
                {activeColumns.map((col) => {
                  return (
                    <td key={col.key} className="px-4 py-3 whitespace-nowrap">
                      {col.key === "currencyName" && (
                        <div className="flex items-center gap-2">
                          {project.flagUrl && (
                            <FlagImage
                              src={project.flagUrl}
                              alt=""
                              size={20}
                              className="border dark:border-slate-700 border-slate-200"
                            />
                          )}
                          <span className="font-medium dark:text-white text-slate-900">{project.currencyName}</span>
                        </div>
                      )}
                      {col.key === "country" && <span className="dark:text-slate-300 text-slate-600">{project.country}</span>}
                      {col.key === "stage" && <StatusPill label={project.stage} variant={project.stage} />}
                      {col.key === "announcementYear" && <span className="dark:text-slate-300 text-slate-600">{project.announcementYear}</span>}
                      {col.key === "techStack" && (
                        <span className="text-xs font-mono text-emerald-600 dark:text-emerald-400 truncate max-w-[160px] block">
                          {project.techStack}
                        </span>
                      )}
                      {col.key === "usesDLT" && (
                        <span className={project.usesDLT ? "text-emerald-500 dark:text-emerald-400" : "text-red-500 dark:text-red-400"}>
                          {project.usesDLT ? "Yes" : "No"}
                        </span>
                      )}
                      {col.key === "interoperable" && (
                        <span className={project.interoperable ? "text-emerald-500 dark:text-emerald-400" : "dark:text-slate-400 text-slate-500"}>
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
                      className="p-1 rounded dark:text-slate-500 text-slate-400 hover:text-blue-400 transition-colors"
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
        <div className="flex items-center justify-between px-4 py-3 border-t dark:border-slate-700/50 border-slate-200">
          <span className="text-xs dark:text-slate-500 text-slate-400">
            Page {page} of {totalPages}
          </span>
          <div className="flex gap-1">
            <button
              disabled={page === 1}
              onClick={() => setPage((p) => p - 1)}
              className="px-3 py-1 text-xs rounded-lg border dark:border-slate-700/50 border-slate-200 dark:text-slate-400 text-slate-500 dark:hover:text-slate-200 hover:text-slate-700 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
            >
              Previous
            </button>
            <button
              disabled={page === totalPages}
              onClick={() => setPage((p) => p + 1)}
              className="px-3 py-1 text-xs rounded-lg border dark:border-slate-700/50 border-slate-200 dark:text-slate-400 text-slate-500 dark:hover:text-slate-200 hover:text-slate-700 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
