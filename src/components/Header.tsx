"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Globe2 } from "lucide-react";
import clsx from "clsx";
import { DB_LAST_UPDATED } from "@/data/cbdcData";
import { NEWS_LAST_UPDATED } from "@/data/newsData";

const NAV_LINKS = [
  { href: "/", label: "Dashboard" },
  { href: "/news", label: "News" },
  { href: "/timeline", label: "Timeline" },
  { href: "/compare", label: "Compare" },
  { href: "/watchlist", label: "Watchlist" },
];

const fmt = (d: string) =>
  new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", year: "numeric" }).format(new Date(d));
const dbDate = fmt(DB_LAST_UPDATED);
const newsDate = fmt(NEWS_LAST_UPDATED);

export function Header() {
  const pathname = usePathname();

  return (
    <header className="border-b border-slate-800/80 bg-slate-900/50 backdrop-blur-md sticky top-0 z-30">
      <div className="max-w-7xl mx-auto px-4 md:px-8 h-16 flex items-center justify-between gap-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 flex-shrink-0 group">
          <div className="p-2.5 bg-blue-500/10 rounded-xl border border-blue-500/20 group-hover:bg-blue-500/20 transition-colors">
            <Globe2 className="w-5 h-5 text-blue-400" />
          </div>
          <div className="hidden sm:block">
            <h1 className="text-lg font-bold tracking-tight text-white leading-none">
              Global CBDC Tracker
            </h1>
            <p className="text-[9px] text-slate-500 font-medium mt-0.5 flex items-center gap-1.5">
              <span>Database: <span className="text-slate-400">{dbDate}</span></span>
              <span className="w-1 h-1 rounded-full bg-slate-600 inline-block" />
              <span>News: <span className="text-slate-400">{newsDate}</span></span>
            </p>
          </div>
        </Link>

        {/* Nav */}
        <nav className="flex items-center gap-1">
          {NAV_LINKS.map(({ href, label }) => {
            const active = href === "/" ? pathname === "/" : pathname.startsWith(href);
            return (
              <Link
                key={href}
                href={href}
                className={clsx(
                  "px-3 py-1.5 rounded-lg text-sm font-medium transition-all",
                  active
                    ? "bg-blue-500/15 text-blue-400 border border-blue-500/20"
                    : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/60"
                )}
              >
                {label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
