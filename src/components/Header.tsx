"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Globe2, Sun, Moon, ChevronDown } from "lucide-react";
import clsx from "clsx";
import { useState, useRef } from "react";
import { DB_LAST_UPDATED } from "@/data/cbdcData";
import { NEWS_LAST_UPDATED } from "@/data/newsData";
import { useTheme } from "@/components/ThemeProvider";

const NAV_LINKS_BEFORE = [
  { href: "/", label: "Dashboard" },
  { href: "/news", label: "News" },
  { href: "/timeline", label: "Timeline" },
  { href: "/compare", label: "Compare" },
];

const NAV_LINKS_AFTER = [
  { href: "/research", label: "Research" },
  { href: "/watchlist", label: "Watchlist" },
];

const MARKETS_LINKS = [
  { href: "/institutional", label: "Institutional Adoption" },
  { href: "/settlement", label: "Settlement & Money" },
];

function MarketsDropdown() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const ref = useRef<HTMLDivElement>(null);

  const isActive = MARKETS_LINKS.some(({ href }) => pathname.startsWith(href));

  return (
    <div
      ref={ref}
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        onClick={() => setOpen((o) => !o)}
        className={clsx(
          "flex items-center gap-1 px-3 py-1.5 rounded-lg text-sm font-medium transition-all",
          isActive
            ? "bg-blue-500/15 dark:text-blue-400 text-blue-600 border border-blue-500/20"
            : "dark:text-slate-400 text-slate-600 dark:hover:text-slate-200 hover:text-slate-900 dark:hover:bg-slate-800/60 hover:bg-slate-100"
        )}
      >
        Markets
        <ChevronDown className={clsx("w-3 h-3 transition-transform", open && "rotate-180")} />
      </button>

      {open && (
        <div className="absolute top-full left-0 mt-1 w-52 rounded-lg border dark:border-slate-700 border-slate-200 dark:bg-slate-900 bg-white shadow-lg z-50 py-1">
          {MARKETS_LINKS.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={clsx(
                "block px-4 py-2 text-sm transition-colors",
                pathname.startsWith(href)
                  ? "dark:text-blue-400 text-blue-600 dark:bg-slate-800/60 bg-slate-100"
                  : "dark:text-slate-300 text-slate-700 dark:hover:bg-slate-800/60 hover:bg-slate-50"
              )}
              onClick={() => setOpen(false)}
            >
              {label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

const fmt = (d: string) =>
  new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", year: "numeric" }).format(new Date(d));
const dbDate = fmt(DB_LAST_UPDATED);
const newsDate = fmt(NEWS_LAST_UPDATED);

export function Header() {
  const pathname = usePathname();
  const { theme, toggle } = useTheme();

  return (
    <header className="border-b dark:border-slate-800/80 border-slate-200 dark:bg-slate-900/50 bg-white/80 backdrop-blur-md sticky top-0 z-30 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 md:px-8 h-16 flex items-center justify-between gap-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 flex-shrink-0 group">
          <div className="p-2.5 bg-blue-500/10 rounded-xl border border-blue-500/20 group-hover:bg-blue-500/20 transition-colors">
            <Globe2 className="w-5 h-5 text-blue-400" />
          </div>
          <div className="hidden sm:block">
            <h1 className="text-lg font-bold tracking-tight dark:text-white text-slate-900 leading-none">
              Global CBDC Tracker
            </h1>
            <p className="text-[9px] dark:text-slate-500 text-slate-400 font-medium mt-0.5 flex items-center gap-1.5">
              <span>Database: <span className="dark:text-slate-400 text-slate-500">{dbDate}</span></span>
              <span className="w-1 h-1 rounded-full dark:bg-slate-600 bg-slate-300 inline-block" />
              <span>News: <span className="dark:text-slate-400 text-slate-500">{newsDate}</span></span>
            </p>
          </div>
        </Link>

        {/* Nav + theme toggle */}
        <div className="flex items-center gap-1">
          <nav className="flex items-center gap-1">
            {NAV_LINKS_BEFORE.map(({ href, label }) => {
              const active = href === "/" ? pathname === "/" : pathname.startsWith(href);
              return (
                <Link
                  key={href}
                  href={href}
                  className={clsx(
                    "px-3 py-1.5 rounded-lg text-sm font-medium transition-all",
                    active
                      ? "bg-blue-500/15 dark:text-blue-400 text-blue-600 border border-blue-500/20"
                      : "dark:text-slate-400 text-slate-600 dark:hover:text-slate-200 hover:text-slate-900 dark:hover:bg-slate-800/60 hover:bg-slate-100"
                  )}
                >
                  {label}
                </Link>
              );
            })}
            <MarketsDropdown />
            {NAV_LINKS_AFTER.map(({ href, label }) => {
              const active = pathname.startsWith(href);
              return (
                <Link
                  key={href}
                  href={href}
                  className={clsx(
                    "px-3 py-1.5 rounded-lg text-sm font-medium transition-all",
                    active
                      ? "bg-blue-500/15 dark:text-blue-400 text-blue-600 border border-blue-500/20"
                      : "dark:text-slate-400 text-slate-600 dark:hover:text-slate-200 hover:text-slate-900 dark:hover:bg-slate-800/60 hover:bg-slate-100"
                  )}
                >
                  {label}
                </Link>
              );
            })}
          </nav>

          {/* Theme toggle */}
          <button
            onClick={toggle}
            title={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
            className="ml-2 p-2 rounded-lg border dark:border-slate-700 border-slate-200 dark:text-slate-400 text-slate-500 dark:hover:text-white hover:text-slate-900 dark:hover:bg-slate-800/60 hover:bg-slate-100 transition-all"
          >
            {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>
        </div>
      </div>
    </header>
  );
}
