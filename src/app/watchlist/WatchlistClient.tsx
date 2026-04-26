"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { Bookmark, ExternalLink, Mail, CheckCircle, Loader2 } from "lucide-react";
import { cbdcProjects, CBDCProject } from "@/data/cbdcData";
import { useWatchlist } from "@/hooks/useWatchlist";
import { StatusPill } from "@/components/StatusPill";
import { WatchFlag } from "@/components/WatchFlag";

// Lazy-load map to avoid SSR issues
const CBDCMap = dynamic(() => import("@/components/CBDCMap"), { ssr: false });

function EmptyState() {
  return (
    <div className="py-20 flex flex-col items-center text-center gap-4">
      <div className="w-16 h-16 rounded-full bg-slate-800/60 border border-slate-700/50 flex items-center justify-center">
        <Bookmark className="w-7 h-7 text-slate-600" />
      </div>
      <div>
        <p className="text-lg font-semibold text-slate-300">Your watchlist is empty</p>
        <p className="text-sm text-slate-500 mt-1">
          Click the bookmark icon on any CBDC card to add it here.
        </p>
      </div>
      <Link
        href="/"
        className="px-5 py-2 bg-blue-500/10 border border-blue-500/30 text-blue-400 rounded-xl text-sm font-medium hover:bg-blue-500/20 transition-colors"
      >
        Browse CBDCs →
      </Link>
    </div>
  );
}

function WatchlistRow({ project }: { project: CBDCProject }) {
  return (
    <div className="flex items-center gap-4 p-4 glass-panel rounded-xl hover:border-slate-600/50 hover:bg-slate-800/80 transition-all">
      <div className="flex items-center gap-3 flex-1 min-w-0">
        {project.flagUrl && (
          <img
            src={project.flagUrl}
            alt=""
            className="w-8 h-8 rounded-full object-cover border border-slate-600 flex-shrink-0"
          />
        )}
        <div className="min-w-0">
          <Link
            href={`/currency/${project.tag}`}
            className="text-sm font-semibold text-white hover:text-blue-300 transition-colors truncate block"
          >
            {project.currencyName}
          </Link>
          <p className="text-xs text-slate-500 truncate">{project.country}</p>
        </div>
      </div>
      <div className="hidden sm:flex gap-2 flex-shrink-0">
        <StatusPill label={project.stage} variant={project.stage} />
        <StatusPill label={project.type} variant={project.type} />
      </div>
      <div className="flex items-center gap-2 flex-shrink-0">
        <Link
          href={`/currency/${project.tag}`}
          className="p-1.5 rounded-lg text-slate-500 hover:text-blue-400 hover:bg-blue-500/10 transition-colors"
          aria-label="View details"
        >
          <ExternalLink className="w-4 h-4" />
        </Link>
        <WatchFlag id={project.id} />
      </div>
    </div>
  );
}

function SubscriptionForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setStatus("loading");
    // Simulated async — no real backend
    setTimeout(() => setStatus("success"), 1200);
  };

  return (
    <div className="glass-panel rounded-2xl p-6 mt-8">
      <h2 className="text-lg font-bold text-white mb-1 flex items-center gap-2">
        <Mail className="w-5 h-5 text-blue-400" />
        Subscription settings
      </h2>
      <p className="text-sm text-slate-400 mb-4">
        Enter your email to receive updates for your watched currencies. We&apos;ll notify you when their status changes.
      </p>

      {status === "success" ? (
        <div className="flex items-center gap-2 text-emerald-400 text-sm font-medium">
          <CheckCircle className="w-5 h-5" />
          Subscribed! Check your email to confirm.
        </div>
      ) : (
        <form onSubmit={handleSubscribe} className="flex gap-3 flex-wrap">
          <input
            type="email"
            required
            placeholder="your@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="flex-1 min-w-[200px] px-4 py-2 bg-slate-800/60 border border-slate-700/50 rounded-xl text-sm text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/30"
          />
          <button
            type="submit"
            disabled={status === "loading"}
            className="flex items-center gap-2 px-5 py-2 bg-blue-500/15 hover:bg-blue-500/25 border border-blue-500/30 text-blue-400 rounded-xl text-sm font-medium transition-all disabled:opacity-50"
          >
            {status === "loading" && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
            Subscribe
          </button>
        </form>
      )}
    </div>
  );
}

export function WatchlistClient() {
  const { watchlist } = useWatchlist();
  const watched = cbdcProjects.filter((p) => watchlist.has(p.id));

  return (
    <div className="max-w-4xl mx-auto px-4 md:px-8 py-8">
      <div className="mb-6 flex items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white mb-1">Watchlist</h1>
          <p className="text-slate-400 text-sm">
            {watched.length} {watched.length === 1 ? "currency" : "currencies"} saved
          </p>
        </div>
        <Link
          href="/"
          className="text-sm text-slate-400 hover:text-slate-200 transition-colors flex items-center gap-1"
        >
          ← Back to all currencies
        </Link>
      </div>

      {watched.length === 0 ? (
        <EmptyState />
      ) : (
        <>
          {/* Mini map showing only watched countries */}
          <div className="mb-6 rounded-2xl overflow-hidden" style={{ maxHeight: 320 }}>
            <CBDCMap
              onSelect={() => {}}
              activeStages={
                new Set(watched.map((p) => p.stage))
              }
            />
          </div>

          {/* Watchlist rows */}
          <div className="space-y-3 mb-4">
            {watched.map((p) => (
              <WatchlistRow key={p.id} project={p} />
            ))}
          </div>
        </>
      )}

      <SubscriptionForm />
    </div>
  );
}
