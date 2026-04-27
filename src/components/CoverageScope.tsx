"use client";

import { ExternalLink, Info } from "lucide-react";
import {
  cbdcProjects,
  DB_CBDC_COUNT_EXTERNAL_ESTIMATE,
  DB_LAUNCHED_EXTERNAL,
  DB_PILOT_EXTERNAL,
  DB_POC_EXTERNAL,
  DB_RESEARCH_EXTERNAL,
} from "@/data/cbdcData";

const STAGE_ORDER = ["Launched", "Pilot", "Proof of Concept", "Research"] as const;

const STAGE_STYLE: Record<string, { dot: string; label: string }> = {
  Launched:          { dot: "bg-emerald-400", label: "Launched" },
  Pilot:             { dot: "bg-blue-400",    label: "Pilot" },
  "Proof of Concept":{ dot: "bg-amber-400",   label: "PoC" },
  Research:          { dot: "bg-slate-400",   label: "Research" },
};

function stageCounts() {
  const map: Record<string, number> = {};
  for (const p of cbdcProjects) {
    map[p.stage] = (map[p.stage] ?? 0) + 1;
  }
  return map;
}

export function CoverageScope() {
  const counts = stageCounts();
  const total = cbdcProjects.length;
  const ext = DB_CBDC_COUNT_EXTERNAL_ESTIMATE;
  const coverage = Math.round((total / ext) * 100);

  return (
    <div className="mb-6 rounded-xl border border-slate-700/60 bg-slate-800/40 p-4 text-sm">
      {/* Header row */}
      <div className="flex flex-wrap items-start gap-2 justify-between mb-3">
        <div className="flex items-center gap-2">
          <Info className="w-4 h-4 text-slate-400 flex-shrink-0 mt-0.5" />
          <span className="font-semibold text-slate-200">Database coverage</span>
        </div>
        <div className="flex flex-wrap gap-2 text-xs">
          <a
            href="https://kiffmeister.blogspot.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-slate-400 hover:text-blue-400 transition-colors"
          >
            Kiffmeister CBDC tracker <ExternalLink className="w-3 h-3" />
          </a>
          <span className="text-slate-600">·</span>
          <a
            href="https://www.atlanticcouncil.org/cbdctracker/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-slate-400 hover:text-blue-400 transition-colors"
          >
            Atlantic Council tracker <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-3">
        {STAGE_ORDER.map((stage) => {
          const our = counts[stage] ?? 0;
          const ref =
            stage === "Launched"          ? DB_LAUNCHED_EXTERNAL :
            stage === "Pilot"             ? DB_PILOT_EXTERNAL :
            stage === "Proof of Concept"  ? DB_POC_EXTERNAL :
                                            DB_RESEARCH_EXTERNAL;
          const { dot, label } = STAGE_STYLE[stage];
          return (
            <div key={stage} className="rounded-lg bg-slate-900/50 border border-slate-700/40 p-3">
              <div className="flex items-center gap-1.5 mb-1">
                <span className={`w-2 h-2 rounded-full ${dot}`} />
                <span className="text-slate-400 text-xs">{label}</span>
              </div>
              <div className="text-white font-bold text-xl leading-none">{our}</div>
              <div className="text-slate-500 text-xs mt-0.5">of ~{ref} tracked</div>
            </div>
          );
        })}
      </div>

      {/* Coverage bar */}
      <div className="flex items-center gap-3">
        <div className="flex-1 h-1.5 rounded-full bg-slate-700 overflow-hidden">
          <div
            className="h-full rounded-full bg-gradient-to-r from-blue-500 to-blue-400"
            style={{ width: `${Math.min(coverage, 100)}%` }}
          />
        </div>
        <span className="text-slate-400 text-xs whitespace-nowrap">
          {total} of ~{ext} jurisdictions ({coverage}% of Kiffmeister estimate, Apr 2026)
        </span>
      </div>

      {/* Why the gap */}
      <div className="mt-3 rounded-lg border border-slate-700/40 bg-slate-900/40 p-3 space-y-1.5">
        <p className="text-slate-300 text-xs font-medium">Why is our coverage lower?</p>
        <ul className="text-slate-500 text-xs space-y-1 list-none">
          <li className="flex gap-2">
            <span className="text-slate-600 flex-shrink-0">—</span>
            <span><span className="text-slate-400">Depth over breadth.</span> Every entry here requires verified architecture data, tech stack, risk profile, and sourced documents. Projects without enough public detail are excluded.</span>
          </li>
          <li className="flex gap-2">
            <span className="text-slate-600 flex-shrink-0">—</span>
            <span><span className="text-slate-400">The ~{ext} figure counts any exploration.</span> Kiffmeister tallies every jurisdiction that ever published a discussion paper, including cancelled programs (e.g. Ecuador's dinero electrónico, shut down 2018) and "we are studying this" announcements with no follow-up.</span>
          </li>
          <li className="flex gap-2">
            <span className="text-slate-600 flex-shrink-0">—</span>
            <span><span className="text-slate-400">~80 jurisdictions have no researchable detail yet.</span> Adding them would mean mostly empty rows — they have not published technical whitepapers, architecture specs, or pilot results.</span>
          </li>
        </ul>
      </div>
    </div>
  );
}
