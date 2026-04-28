"use client";

import { useState, useMemo } from "react";
import { ExternalLink, Search, X } from "lucide-react";
import { newsItems, NewsItem } from "@/data/newsData";
import { cbdcProjects } from "@/data/cbdcData";
import { FlagImage } from "@/components/FlagImage";

const PAGE_SIZE = 8;

function NewsCard({ item }: { item: NewsItem }) {
  const date = new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(item.date));

  const relatedCurrencies = cbdcProjects.filter((p) =>
    item.currencyIds.includes(p.id)
  );

  return (
    <div className="glass-panel rounded-2xl p-5 flex flex-col gap-3 dark:hover:border-slate-600/50 hover:border-slate-300 dark:hover:bg-slate-800/80 hover:bg-white/95 transition-all">
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <a
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-base font-semibold dark:text-white text-slate-900 dark:hover:text-blue-300 hover:text-blue-600 transition-colors leading-snug line-clamp-2 flex items-start gap-1.5 group"
          >
            {item.title}
            <ExternalLink className="w-3.5 h-3.5 mt-0.5 flex-shrink-0 text-slate-500 group-hover:text-blue-400 transition-colors" />
          </a>
        </div>
      </div>

      <p className="text-sm dark:text-slate-400 text-slate-600 leading-relaxed line-clamp-2">{item.summary}</p>

      <div className="flex flex-wrap items-center gap-2 mt-auto pt-1">
        <span className="text-xs dark:text-slate-500 text-slate-400">{date}</span>
        <span className="w-1 h-1 rounded-full dark:bg-slate-600 bg-slate-300" />
        <span className="text-xs font-medium dark:text-slate-400 text-slate-600 dark:bg-slate-700/50 bg-slate-100 px-2 py-0.5 rounded-full">
          {item.source}
        </span>
        {relatedCurrencies.map((p) => (
          <span
            key={p.id}
            className="text-xs text-blue-400 bg-blue-500/10 border border-blue-500/20 px-2 py-0.5 rounded-full flex items-center gap-1"
          >
            {p.flagUrl && (
              <FlagImage src={p.flagUrl} alt="" size={12} />
            )}
            {p.currencyName}
          </span>
        ))}
      </div>
    </div>
  );
}

export function NewsClient() {
  const [search, setSearch] = useState("");
  const [filterCurrency, setFilterCurrency] = useState("all");
  const [page, setPage] = useState(1);

  const currencies = useMemo(
    () => [
      { id: "all", label: "All Currencies" },
      ...cbdcProjects.map((p) => ({ id: p.id, label: p.currencyName })),
    ],
    []
  );

  const filtered = useMemo<NewsItem[]>(() => {
    let items = [...newsItems].sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );
    if (filterCurrency !== "all") {
      items = items.filter((i) => i.currencyIds.includes(filterCurrency));
    }
    if (search.trim()) {
      const q = search.toLowerCase();
      items = items.filter(
        (i) =>
          i.title.toLowerCase().includes(q) ||
          i.summary.toLowerCase().includes(q) ||
          i.source.toLowerCase().includes(q)
      );
    }
    return items;
  }, [search, filterCurrency]);

  const visible = filtered.slice(0, page * PAGE_SIZE);
  const hasMore = page * PAGE_SIZE < filtered.length;

  const clearFilters = () => {
    setSearch("");
    setFilterCurrency("all");
    setPage(1);
  };

  const isFiltered = search !== "" || filterCurrency !== "all";

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-8">
      {/* Page header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold dark:text-white text-slate-900 mb-1">News</h1>
        <p className="text-slate-400 text-sm">Latest updates on Central Bank Digital Currencies worldwide · sorted by date</p>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 mb-6">
        <div className="relative flex-1 min-w-[200px] max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 pointer-events-none" />
          <input
            type="text"
            placeholder="Search news…"
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1); }}
            className="w-full pl-9 pr-4 py-2 dark:bg-slate-800/60 bg-white border dark:border-slate-700/50 border-slate-200 rounded-xl text-sm dark:text-slate-200 text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/30 transition-colors"
          />
        </div>

        <select
          value={filterCurrency}
          onChange={(e) => { setFilterCurrency(e.target.value); setPage(1); }}
          className="dark:bg-slate-800/60 bg-white border dark:border-slate-700/50 border-slate-200 rounded-xl px-3 py-2 text-sm dark:text-slate-200 text-slate-800 focus:outline-none focus:border-blue-500/50"
        >
          {currencies.map((c) => (
            <option key={c.id} value={c.id}>{c.label}</option>
          ))}
        </select>

        {isFiltered && (
          <button
            onClick={clearFilters}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm dark:text-slate-400 text-slate-500 dark:hover:text-slate-200 hover:text-slate-700 border dark:border-slate-700/50 border-slate-200 dark:hover:border-slate-600 hover:border-slate-300 dark:bg-slate-800/40 bg-white transition-all"
          >
            <X className="w-3.5 h-3.5" /> Clear
          </button>
        )}

        <span className="ml-auto self-center text-xs text-slate-500">
          {filtered.length} {filtered.length === 1 ? "article" : "articles"}
        </span>
      </div>

      {/* News grid */}
      {visible.length === 0 ? (
        <div className="py-20 text-center text-slate-500">
          <p className="text-lg font-medium">No news matches your filters.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8">
          {visible.map((item) => (
            <NewsCard key={item.id} item={item} />
          ))}
        </div>
      )}

      {hasMore && (
        <div className="flex justify-center">
          <button
            onClick={() => setPage((p) => p + 1)}
            className="px-6 py-2.5 dark:bg-slate-800/60 bg-white dark:hover:bg-slate-700/60 hover:bg-slate-50 border dark:border-slate-700/50 border-slate-200 dark:hover:border-slate-600 hover:border-slate-300 rounded-xl text-sm font-medium dark:text-slate-200 text-slate-700 transition-all"
          >
            Show more news
          </button>
        </div>
      )}
    </div>
  );
}
