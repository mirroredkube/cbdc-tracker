"use client";

import { useRouter } from "next/navigation";
import React, { useState, useCallback } from "react";
import Link from "next/link";
import { X, Plus, ArrowLeft, Copy, Check, ChevronDown } from "lucide-react";
import type { CBDCProject } from "@/data/cbdcData";
import { researchPapers } from "@/data/researchData";
import { FlagImage } from "@/components/FlagImage";
import { StatusPill } from "@/components/StatusPill";
import clsx from "clsx";

const MAX_CBDCS = 4;

// ─── URL helpers ──────────────────────────────────────────────────────────────

const PARAM_KEYS = ["a", "b", "c", "d"] as const;

function buildUrl(tags: string[]) {
  if (tags.length === 0) return "/compare";
  const params = tags.map((t, i) => `${PARAM_KEYS[i]}=${encodeURIComponent(t)}`).join("&");
  return `/compare?${params}`;
}

// ─── Diff detection ───────────────────────────────────────────────────────────

function isDiffCell(values: string[], index: number) {
  const unique = new Set(values.filter(Boolean));
  return unique.size > 1 && values[index] !== undefined;
}

// ─── Risk bar ─────────────────────────────────────────────────────────────────

const RISK_LABEL = ["", "Very Low", "Low", "Moderate", "High", "Very High"];
const RISK_COLOR = ["", "bg-emerald-500", "bg-emerald-500", "bg-yellow-500", "bg-red-400", "bg-red-500"];
const RISK_TEXT = ["", "text-emerald-400", "text-emerald-400", "text-yellow-400", "text-red-400", "text-red-400"];

function MiniRiskBar({ score }: { score: number }) {
  return (
    <div className="flex items-center gap-2 min-w-0">
      <div className="flex gap-0.5 flex-shrink-0">
        {[1, 2, 3, 4, 5].map((n) => (
          <div
            key={n}
            className={clsx("w-2.5 h-2 rounded-sm", n <= score ? RISK_COLOR[score] : "bg-slate-700")}
          />
        ))}
      </div>
      <span className={clsx("text-xs font-medium whitespace-nowrap", RISK_TEXT[score])}>
        {RISK_LABEL[score]}
      </span>
    </div>
  );
}

// ─── Row/section types ────────────────────────────────────────────────────────

type CellValue = string | boolean | number | null;

interface RowDef {
  label: string;
  getValue: (p: CBDCProject) => CellValue;
  render?: (v: CellValue, p: CBDCProject) => React.ReactNode;
  diffable?: boolean;
}

interface SectionDef {
  title: string;
  rows: RowDef[];
}

function boolCell(v: CellValue) {
  const yes = v === true || v === "Yes";
  return (
    <span className={clsx("font-medium", yes ? "text-emerald-400" : "text-slate-500")}>
      {yes ? "Yes" : "No"}
    </span>
  );
}

const SECTIONS: SectionDef[] = [
  {
    title: "Status",
    rows: [
      {
        label: "Stage",
        getValue: (p) => p.stage,
        render: (v) => <StatusPill label={v as string} variant={v as CBDCProject["stage"]} />,
        diffable: true,
      },
      { label: "Type", getValue: (p) => p.type, render: (v) => <StatusPill label={v as string} variant={v as CBDCProject["type"]} />, diffable: true },
      { label: "Region", getValue: (p) => p.region, diffable: true },
      { label: "Announced", getValue: (p) => String(p.announcementYear), diffable: false },
      { label: "Central Bank", getValue: (p) => p.centralBank, diffable: false },
    ],
  },
  {
    title: "Technology",
    rows: [
      { label: "Tech Stack", getValue: (p) => p.techStack, render: (v) => <span className="font-mono text-emerald-400 text-xs">{v as string}</span>, diffable: true },
      { label: "Provider", getValue: (p) => p.technologyProvider ?? "—", diffable: true },
      { label: "Uses DLT", getValue: (p) => p.usesDLT ? "Yes" : "No", render: boolCell, diffable: true },
      { label: "Interoperable", getValue: (p) => p.interoperable ? "Yes" : "No", render: boolCell, diffable: true },
      { label: "Update Rate", getValue: (p) => p.updateRate, diffable: true },
    ],
  },
  {
    title: "Architecture",
    rows: [
      { label: "Tier", getValue: (p) => p.architecture.tier, diffable: true },
      { label: "Account Model", getValue: (p) => p.architecture.accountModel, diffable: true },
      {
        label: "Privacy Model",
        getValue: (p) => p.architecture.privacyModel,
        render: (v) => {
          const color = v === "Anonymous" ? "text-emerald-400" : v === "Pseudonymous" ? "text-yellow-400" : "text-orange-400";
          return <span className={clsx("font-medium", color)}>{v as string}</span>;
        },
        diffable: true,
      },
      { label: "Offline Capable", getValue: (p) => p.architecture.offlineCapable ? "Yes" : "No", render: boolCell, diffable: true },
      { label: "Programmable", getValue: (p) => p.architecture.programmable ? "Yes" : "No", render: boolCell, diffable: true },
      { label: "Interest-Bearing", getValue: (p) => p.architecture.interestBearing ? "Yes" : "No", render: boolCell, diffable: true },
      { label: "Holding Limit", getValue: (p) => p.architecture.holdingLimit ?? "—", diffable: true },
    ],
  },
  {
    title: "Risk Profile",
    rows: [
      { label: "Financial Stability", getValue: (p) => p.riskProfile.financial, render: (v) => <MiniRiskBar score={v as number} />, diffable: true },
      { label: "Privacy Risk", getValue: (p) => p.riskProfile.privacy, render: (v) => <MiniRiskBar score={v as number} />, diffable: true },
      { label: "Cybersecurity", getValue: (p) => p.riskProfile.cyber, render: (v) => <MiniRiskBar score={v as number} />, diffable: true },
      { label: "Adoption Risk", getValue: (p) => p.riskProfile.adoption, render: (v) => <MiniRiskBar score={v as number} />, diffable: true },
      { label: "Geopolitical", getValue: (p) => p.riskProfile.geopolitical, render: (v) => <MiniRiskBar score={v as number} />, diffable: true },
    ],
  },
  {
    title: "Pilot Metrics",
    rows: [
      {
        label: "Wallets",
        getValue: (p) => p.pilotMetrics?.wallets ? `${(p.pilotMetrics.wallets / 1_000_000).toFixed(1)}M` : "—",
        diffable: false,
      },
      {
        label: "Transactions",
        getValue: (p) => p.pilotMetrics?.transactions ? `${(p.pilotMetrics.transactions / 1_000_000).toFixed(0)}M` : "—",
        diffable: false,
      },
      { label: "Volume", getValue: (p) => p.pilotMetrics?.volume ?? "—", diffable: false },
      { label: "Metrics As Of", getValue: (p) => p.pilotMetrics?.asOf ?? "—", diffable: false },
    ],
  },
  {
    title: "Verification",
    rows: [
      { label: "Confidence", getValue: (p) => p.confidence, diffable: true },
      { label: "Last Verified", getValue: (p) => new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", year: "numeric" }).format(new Date(p.lastVerifiedAt)), diffable: false },
      {
        label: "Research Papers",
        getValue: (p) => String(researchPapers.filter((r) => r.relevantCbdcIds.includes(p.id)).length),
        diffable: false,
      },
    ],
  },
];

// ─── CBDC column header ───────────────────────────────────────────────────────

function CBDCHeader({ project, onRemove }: { project: CBDCProject; onRemove: () => void }) {
  return (
    <div className="flex flex-col items-center gap-2 p-3 min-w-[160px]">
      <div className="relative">
        {project.flagUrl && <FlagImage src={project.flagUrl} alt="" size={40} className="border border-slate-600" />}
        <button
          onClick={onRemove}
          className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-slate-700 border border-slate-600 flex items-center justify-center hover:bg-red-500/30 hover:border-red-500/50 transition-colors"
          aria-label={`Remove ${project.currencyName}`}
        >
          <X className="w-2.5 h-2.5 text-slate-400" />
        </button>
      </div>
      <div className="text-center">
        <Link
          href={`/currency/${project.tag}`}
          className="text-sm font-bold dark:text-white text-slate-900 dark:hover:text-blue-300 hover:text-blue-600 transition-colors block leading-tight"
        >
          {project.currencyName}
        </Link>
        <p className="text-xs text-slate-500 mt-0.5">{project.country}</p>
      </div>
    </div>
  );
}

// ─── Add CBDC picker ──────────────────────────────────────────────────────────

function AddCBDCPicker({
  allProjects,
  selectedTags,
  onAdd,
}: {
  allProjects: CBDCProject[];
  selectedTags: string[];
  onAdd: (tag: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const available = allProjects.filter((p) => !selectedTags.includes(p.tag));

  if (available.length === 0) return null;

  return (
    <div className="relative min-w-[160px]">
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-2 px-3 py-2 rounded-xl border border-dashed border-slate-600 text-slate-400 hover:border-blue-500/50 hover:text-blue-400 transition-colors text-sm w-full justify-center"
      >
        <Plus className="w-3.5 h-3.5" />
        Add CBDC
        <ChevronDown className={clsx("w-3 h-3 transition-transform", open && "rotate-180")} />
      </button>
      {open && (
        <div className="absolute top-full mt-1 left-0 z-50 bg-slate-800 border border-slate-700 rounded-xl shadow-xl min-w-[200px] max-h-72 overflow-y-auto">
          {available.map((p) => (
            <button
              key={p.tag}
              onClick={() => { onAdd(p.tag); setOpen(false); }}
              className="flex items-center gap-2.5 w-full px-3 py-2.5 text-left hover:bg-slate-700/60 transition-colors text-sm text-slate-200 first:rounded-t-xl last:rounded-b-xl"
            >
              {p.flagUrl && <FlagImage src={p.flagUrl} alt="" size={16} />}
              <span className="font-medium">{p.currencyName}</span>
              <span className="text-xs text-slate-500 ml-auto">{p.country}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Empty state ──────────────────────────────────────────────────────────────

function EmptyState({ allProjects, onAdd }: { allProjects: CBDCProject[]; onAdd: (tag: string) => void }) {
  const suggested = ["e-cny", "digital-euro", "drex", "digital-rupee"];
  const suggestedProjects = suggested.map((t) => allProjects.find((p) => p.tag === t)).filter(Boolean) as CBDCProject[];

  return (
    <div className="flex flex-col items-center py-20 text-center gap-6">
      <p className="text-slate-400 text-lg font-medium">Select CBDCs to compare</p>
      <p className="text-slate-500 text-sm">Pick up to 4 CBDCs to see them side-by-side</p>
      <div className="flex flex-wrap gap-2 justify-center">
        {suggestedProjects.map((p) => (
          <button
            key={p.tag}
            onClick={() => onAdd(p.tag)}
            className="flex items-center gap-2 px-3 py-2 rounded-xl border border-slate-700 text-slate-300 hover:border-blue-500/40 hover:text-blue-300 hover:bg-blue-500/5 transition-all text-sm"
          >
            {p.flagUrl && <FlagImage src={p.flagUrl} alt="" size={16} />}
            {p.currencyName}
          </button>
        ))}
      </div>
      <p className="text-xs text-slate-600">Or use "Add CBDC" above to choose any</p>
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

export function CompareClient({
  initialProjects,
  allProjects,
}: {
  initialProjects: CBDCProject[];
  allProjects: CBDCProject[];
}) {
  const router = useRouter();
  const [projects, setProjects] = useState<CBDCProject[]>(initialProjects);
  const [copied, setCopied] = useState(false);

  const updateUrl = useCallback((updated: CBDCProject[]) => {
    router.replace(buildUrl(updated.map((p) => p.tag)), { scroll: false });
  }, [router]);

  const handleAdd = useCallback((tag: string) => {
    if (projects.length >= MAX_CBDCS) return;
    const p = allProjects.find((x) => x.tag === tag);
    if (!p || projects.find((x) => x.tag === tag)) return;
    const updated = [...projects, p];
    setProjects(updated);
    updateUrl(updated);
  }, [projects, allProjects, updateUrl]);

  const handleRemove = useCallback((tag: string) => {
    const updated = projects.filter((p) => p.tag !== tag);
    setProjects(updated);
    updateUrl(updated);
  }, [projects, updateUrl]);

  const handleCopy = () => {
    navigator.clipboard.writeText(window.location.href).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const tags = projects.map((p) => p.tag);
  const colCount = projects.length;

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-8">
      {/* Page header */}
      <div className="flex items-center justify-between mb-6 gap-4 flex-wrap">
        <div className="flex items-center gap-3">
          <Link href="/" className="inline-flex items-center gap-1.5 text-sm text-slate-400 hover:text-slate-200 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Dashboard
          </Link>
          <span className="text-slate-700">/</span>
          <h1 className="text-xl font-bold dark:text-white text-slate-900">Compare CBDCs</h1>
        </div>
        {colCount > 0 && (
          <button
            onClick={handleCopy}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-slate-700 text-slate-400 hover:text-slate-200 hover:border-slate-600 transition-colors text-sm"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            {copied ? "Copied!" : "Share"}
          </button>
        )}
      </div>

      {/* CBDC selector row */}
      <div className="glass-panel rounded-2xl p-4 mb-6 relative z-20">
        <div className="flex gap-3 flex-wrap items-start">
          {projects.map((p) => (
            <CBDCHeader key={p.tag} project={p} onRemove={() => handleRemove(p.tag)} />
          ))}
          {colCount < MAX_CBDCS && (
            <div className="flex items-center pt-3">
              <AddCBDCPicker allProjects={allProjects} selectedTags={tags} onAdd={handleAdd} />
            </div>
          )}
        </div>
      </div>

      {/* Comparison table or empty state */}
      {colCount === 0 ? (
        <EmptyState allProjects={allProjects} onAdd={handleAdd} />
      ) : (
        <div className="overflow-x-auto rounded-2xl border border-slate-700/50">
          <table className="w-full border-collapse min-w-[600px]">
            <thead className="sticky top-0 z-10">
              <tr className="bg-slate-900 border-b border-slate-700/50">
                <th className="text-left px-4 py-3 text-xs font-bold text-slate-500 uppercase tracking-wider w-44 min-w-[140px]">
                  Field
                </th>
                {projects.map((p) => (
                  <th key={p.tag} className="px-4 py-3 text-center min-w-[160px]">
                    <div className="flex flex-col items-center gap-1">
                      {p.flagUrl && <FlagImage src={p.flagUrl} alt="" size={24} className="border border-slate-600" />}
                      <Link href={`/currency/${p.tag}`} className="text-sm font-bold dark:text-white text-slate-900 dark:hover:text-blue-300 hover:text-blue-600 transition-colors leading-tight">
                        {p.currencyName}
                      </Link>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {SECTIONS.map((section) => (
                <React.Fragment key={section.title}>
                  <tr className="bg-slate-800/60">
                    <td
                      colSpan={colCount + 1}
                      className="px-4 py-2 text-xs font-bold text-slate-400 uppercase tracking-widest"
                    >
                      {section.title}
                    </td>
                  </tr>
                  {section.rows.map((row) => {
                    const values = projects.map((p) => row.getValue(p));
                    const strValues = values.map(String);

                    return (
                      <tr
                        key={`${section.title}-${row.label}`}
                        className="border-t border-slate-700/30 hover:bg-slate-800/30 transition-colors"
                      >
                        <td className="px-4 py-3 text-xs text-slate-500 font-medium whitespace-nowrap align-middle">
                          {row.label}
                        </td>
                        {projects.map((p, i) => {
                          const val = row.getValue(p);
                          const diff = row.diffable && isDiffCell(strValues, i);
                          return (
                            <td
                              key={p.tag}
                              className={clsx(
                                "px-4 py-3 text-sm align-middle text-center",
                                diff && "bg-amber-500/5 border-x border-amber-500/10"
                              )}
                            >
                              <div className="flex justify-center">
                                {row.render ? row.render(val, p) : (
                                  <span className={clsx("text-slate-200", diff && "font-semibold")}>
                                    {val === null || val === undefined ? "—" : String(val)}
                                  </span>
                                )}
                              </div>
                            </td>
                          );
                        })}
                      </tr>
                    );
                  })}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
