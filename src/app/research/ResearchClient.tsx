"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { ExternalLink, Search, X, BookOpen, Filter, ChevronDown } from "lucide-react";
import { researchPapers, ResearchPaper, ResearchTag, Institution } from "@/data/researchData";
import { cbdcProjects } from "@/data/cbdcData";
import { FlagImage } from "@/components/FlagImage";
import clsx from "clsx";

// ─── Constants ────────────────────────────────────────────────────────────────

const ALL_INSTITUTIONS = Array.from(new Set(researchPapers.map((p) => p.institution))).sort() as Institution[];

const ALL_TAGS = Array.from(new Set(researchPapers.flatMap((p) => p.tags))).sort() as ResearchTag[];

const TAG_LABELS: Record<ResearchTag, string> = {
  architecture: "Architecture",
  adoption: "Adoption",
  privacy: "Privacy",
  "financial-stability": "Financial Stability",
  "cross-border": "Cross-Border",
  programmability: "Programmability",
  DLT: "DLT",
  "financial-inclusion": "Financial Inclusion",
  "monetary-policy": "Monetary Policy",
  interoperability: "Interoperability",
  risk: "Risk",
  "retail-CBDC": "Retail CBDC",
  "wholesale-CBDC": "Wholesale CBDC",
  "case-study": "Case Study",
  comparative: "Comparative",
  regulation: "Regulation",
  geopolitics: "Geopolitics",
  offline: "Offline",
  tokenization: "Tokenization",
};

const INSTITUTION_STYLE: Record<string, string> = {
  BIS: "bg-blue-500/15 border-blue-500/30 text-blue-400",
  IMF: "bg-purple-500/15 border-purple-500/30 text-purple-400",
  ECB: "bg-indigo-500/15 border-indigo-500/30 text-indigo-400",
  "Federal Reserve": "bg-emerald-500/15 border-emerald-500/30 text-emerald-400",
  "World Bank": "bg-cyan-500/15 border-cyan-500/30 text-cyan-400",
  NBER: "bg-orange-500/15 border-orange-500/30 text-orange-400",
  Academic: "bg-slate-500/15 border-slate-500/30 text-slate-300",
  "Think Tank": "bg-violet-500/15 border-violet-500/30 text-violet-400",
  "Central Bank": "bg-teal-500/15 border-teal-500/30 text-teal-400",
  OMFIF: "bg-pink-500/15 border-pink-500/30 text-pink-400",
};

// ─── Stat card ────────────────────────────────────────────────────────────────

function StatCard({ value, label }: { value: number | string; label: string }) {
  return (
    <div className="glass-panel rounded-xl px-5 py-3 text-center">
      <p className="text-2xl font-bold text-white">{value}</p>
      <p className="text-xs text-slate-500 mt-0.5">{label}</p>
    </div>
  );
}

// ─── Dropdown filter ──────────────────────────────────────────────────────────

function DropdownFilter<T extends string>({
  label,
  options,
  selected,
  onToggle,
  renderOption,
}: {
  label: string;
  options: T[];
  selected: Set<T>;
  onToggle: (v: T) => void;
  renderOption?: (v: T) => React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const count = selected.size;

  return (
    <div className="relative">
      <button
        onClick={() => setOpen((o) => !o)}
        className={clsx(
          "flex items-center gap-2 px-3 py-2 rounded-xl border text-sm transition-all",
          count > 0
            ? "border-blue-500/40 bg-blue-500/10 text-blue-300"
            : "border-slate-700 text-slate-400 hover:border-slate-600 hover:text-slate-200"
        )}
      >
        <Filter className="w-3.5 h-3.5" />
        {label}
        {count > 0 && <span className="bg-blue-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center font-bold">{count}</span>}
        <ChevronDown className={clsx("w-3 h-3 transition-transform", open && "rotate-180")} />
      </button>

      {open && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
          <div className="absolute top-full mt-1 left-0 z-50 bg-slate-800 border border-slate-700 rounded-xl shadow-xl min-w-[200px] max-h-72 overflow-y-auto">
            {options.map((opt) => (
              <button
                key={opt}
                onClick={() => onToggle(opt)}
                className={clsx(
                  "flex items-center gap-2.5 w-full px-3 py-2 text-left transition-colors text-sm first:rounded-t-xl last:rounded-b-xl",
                  selected.has(opt)
                    ? "bg-blue-500/15 text-blue-300"
                    : "text-slate-300 hover:bg-slate-700/60"
                )}
              >
                <div className={clsx("w-3.5 h-3.5 rounded border flex-shrink-0 flex items-center justify-center",
                  selected.has(opt) ? "bg-blue-500 border-blue-500" : "border-slate-600"
                )}>
                  {selected.has(opt) && <span className="text-white text-[9px] font-bold leading-none">✓</span>}
                </div>
                {renderOption ? renderOption(opt) : opt}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

// ─── Tag chip ─────────────────────────────────────────────────────────────────

function TagChip({ tag, active, onClick }: { tag: ResearchTag; active?: boolean; onClick?: () => void }) {
  return (
    <button
      onClick={onClick}
      className={clsx(
        "px-2 py-0.5 rounded-full border text-xs font-medium transition-all",
        active
          ? "bg-blue-500/20 border-blue-500/40 text-blue-300"
          : "bg-slate-700/40 border-slate-600/30 text-slate-400 hover:border-slate-500 hover:text-slate-300"
      )}
    >
      {TAG_LABELS[tag]}
    </button>
  );
}

// ─── Paper card ───────────────────────────────────────────────────────────────

function PaperCard({
  paper,
  activeTags,
  onTagClick,
}: {
  paper: ResearchPaper;
  activeTags: Set<ResearchTag>;
  onTagClick: (tag: ResearchTag) => void;
}) {
  const [expanded, setExpanded] = useState(false);
  const year = paper.date.slice(0, 4);
  const relatedProjects = paper.relevantCbdcIds
    .map((id) => cbdcProjects.find((p) => p.id === id))
    .filter(Boolean) as typeof cbdcProjects;

  return (
    <div className="glass-panel rounded-2xl p-5 hover:border-slate-600/50 transition-all">
      {/* Header row */}
      <div className="flex items-start gap-3 mb-3">
        <BookOpen className="w-4 h-4 text-blue-400 flex-shrink-0 mt-1" />
        <div className="flex-1 min-w-0">
          <div className="flex items-start gap-2 flex-wrap mb-1.5">
            <span className={clsx("text-xs px-2.5 py-0.5 rounded-full border font-semibold flex-shrink-0", INSTITUTION_STYLE[paper.institution] ?? INSTITUTION_STYLE["Academic"])}>
              {paper.institution}
            </span>
            <span className="text-xs text-slate-500 mt-0.5">{year}</span>
          </div>
          <a
            href={paper.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-start gap-1.5"
          >
            <h3 className="text-base font-bold text-white group-hover:text-blue-300 transition-colors leading-snug">
              {paper.title}
            </h3>
            <ExternalLink className="w-3.5 h-3.5 text-slate-500 group-hover:text-blue-400 flex-shrink-0 mt-1 transition-colors" />
          </a>
          {paper.authors.length > 0 && (
            <p className="text-xs text-slate-500 mt-1">
              {paper.authors.slice(0, 3).join(", ")}{paper.authors.length > 3 ? ` +${paper.authors.length - 3} more` : ""}
            </p>
          )}
        </div>
      </div>

      {/* Abstract */}
      <p className={clsx("text-sm text-slate-400 leading-relaxed mb-3 ml-7", !expanded && "line-clamp-2")}>
        {paper.abstract}
      </p>

      {/* Key findings */}
      <div className="ml-7 mb-3">
        <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Key Findings</p>
        <ul className="space-y-1.5">
          {(expanded ? paper.keyFindings : paper.keyFindings.slice(0, 2)).map((f, i) => (
            <li key={i} className="text-sm text-slate-400 flex items-start gap-2">
              <span className="text-blue-500 mt-0.5 flex-shrink-0 font-bold">›</span>
              {f}
            </li>
          ))}
        </ul>
        {!expanded && paper.keyFindings.length > 2 && (
          <button
            onClick={() => setExpanded(true)}
            className="text-xs text-blue-400 hover:text-blue-300 mt-1.5 ml-4 transition-colors"
          >
            + {paper.keyFindings.length - 2} more findings
          </button>
        )}
        {expanded && (
          <button
            onClick={() => setExpanded(false)}
            className="text-xs text-slate-500 hover:text-slate-300 mt-1.5 ml-4 transition-colors"
          >
            Show less
          </button>
        )}
      </div>

      {/* Footer: tags + related CBDCs */}
      <div className="ml-7 flex items-center gap-3 flex-wrap">
        <div className="flex flex-wrap gap-1.5 flex-1">
          {paper.tags.map((tag) => (
            <TagChip key={tag} tag={tag} active={activeTags.has(tag)} onClick={() => onTagClick(tag)} />
          ))}
        </div>
        {relatedProjects.length > 0 && (
          <div className="flex items-center gap-1 flex-shrink-0">
            {relatedProjects.map((p) => (
              <Link key={p.id} href={`/currency/${p.tag}`} title={p.currencyName}>
                {p.flagUrl
                  ? <FlagImage src={p.flagUrl} alt={p.currencyName} size={18} className="hover:scale-110 transition-transform" />
                  : <span className="text-xs text-slate-500">{p.currencyName}</span>
                }
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

export function ResearchClient() {
  const [query, setQuery] = useState("");
  const [selectedInstitutions, setSelectedInstitutions] = useState<Set<Institution>>(new Set());
  const [selectedTags, setSelectedTags] = useState<Set<ResearchTag>>(new Set());
  const [selectedCbdc, setSelectedCbdc] = useState<Set<string>>(new Set());

  function toggleSet<T>(set: Set<T>, value: T): Set<T> {
    const next = new Set(set);
    next.has(value) ? next.delete(value) : next.add(value);
    return next;
  }

  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim();
    return researchPapers.filter((paper) => {
      if (q && !paper.title.toLowerCase().includes(q) &&
          !paper.abstract.toLowerCase().includes(q) &&
          !paper.authors.some((a) => a.toLowerCase().includes(q))) return false;
      if (selectedInstitutions.size > 0 && !selectedInstitutions.has(paper.institution)) return false;
      if (selectedTags.size > 0 && !paper.tags.some((t) => selectedTags.has(t))) return false;
      if (selectedCbdc.size > 0 && !paper.relevantCbdcIds.some((id) => selectedCbdc.has(id))) return false;
      return true;
    });
  }, [query, selectedInstitutions, selectedTags, selectedCbdc]);

  const hasFilters = query || selectedInstitutions.size > 0 || selectedTags.size > 0 || selectedCbdc.size > 0;

  function clearAll() {
    setQuery("");
    setSelectedInstitutions(new Set());
    setSelectedTags(new Set());
    setSelectedCbdc(new Set());
  }

  // Stats
  const institutionCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    researchPapers.forEach((p) => { counts[p.institution] = (counts[p.institution] ?? 0) + 1; });
    return counts;
  }, []);

  return (
    <div className="max-w-5xl mx-auto px-4 md:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Research Library</h1>
        <p className="text-slate-400 text-sm">
          Curated academic papers, central bank working papers, and policy research on CBDC design, risk, and adoption.
        </p>
        <div className="flex gap-3 mt-5 flex-wrap">
          <StatCard value={researchPapers.length} label="Papers" />
          <StatCard value={ALL_INSTITUTIONS.length} label="Institutions" />
          <StatCard value={ALL_TAGS.length} label="Topics" />
          <StatCard value={cbdcProjects.length} label="CBDCs covered" />
        </div>
      </div>

      {/* Institution breakdown */}
      <div className="glass-panel rounded-2xl p-4 mb-6">
        <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">Papers by institution</p>
        <div className="flex flex-wrap gap-2">
          {Object.entries(institutionCounts).sort((a, b) => b[1] - a[1]).map(([inst, count]) => (
            <button
              key={inst}
              onClick={() => setSelectedInstitutions(toggleSet(selectedInstitutions, inst as Institution))}
              className={clsx(
                "flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs font-medium transition-all",
                selectedInstitutions.has(inst as Institution)
                  ? INSTITUTION_STYLE[inst]?.replace("/15", "/30") + " ring-1 ring-current"
                  : (INSTITUTION_STYLE[inst] ?? INSTITUTION_STYLE["Academic"])
              )}
            >
              {inst}
              <span className="opacity-70">{count}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Search + filters */}
      <div className="flex gap-2 mb-4 flex-wrap items-center">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
          <input
            type="text"
            placeholder="Search title, abstract, or author…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-slate-800/60 border border-slate-700/50 rounded-xl text-sm text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/30"
          />
          {query && (
            <button onClick={() => setQuery("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300">
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        <DropdownFilter
          label="Topic"
          options={ALL_TAGS}
          selected={selectedTags}
          onToggle={(t) => setSelectedTags(toggleSet(selectedTags, t))}
          renderOption={(t) => TAG_LABELS[t]}
        />

        <DropdownFilter
          label="CBDC"
          options={cbdcProjects.map((p) => p.id)}
          selected={selectedCbdc}
          onToggle={(id) => setSelectedCbdc(toggleSet(selectedCbdc, id))}
          renderOption={(id) => {
            const p = cbdcProjects.find((x) => x.id === id);
            return p ? (
              <span className="flex items-center gap-2">
                {p.flagUrl && <FlagImage src={p.flagUrl} alt="" size={14} />}
                {p.currencyName}
              </span>
            ) : id;
          }}
        />

        {hasFilters && (
          <button
            onClick={clearAll}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-slate-700 text-slate-400 hover:text-slate-200 hover:border-slate-600 text-sm transition-all"
          >
            <X className="w-3.5 h-3.5" /> Clear
          </button>
        )}
      </div>

      {/* Result count */}
      <p className="text-xs text-slate-500 mb-4">
        {filtered.length === researchPapers.length
          ? `${researchPapers.length} papers`
          : `${filtered.length} of ${researchPapers.length} papers`}
        {selectedTags.size > 0 && (
          <span className="ml-2 text-blue-400">
            · filtered by: {Array.from(selectedTags).map((t) => TAG_LABELS[t]).join(", ")}
          </span>
        )}
      </p>

      {/* Papers */}
      {filtered.length === 0 ? (
        <div className="py-16 text-center">
          <p className="text-slate-400 font-medium mb-2">No papers match your filters</p>
          <button onClick={clearAll} className="text-sm text-blue-400 hover:text-blue-300 transition-colors">Clear all filters</button>
        </div>
      ) : (
        <div className="space-y-4">
          {filtered.map((paper) => (
            <PaperCard
              key={paper.id}
              paper={paper}
              activeTags={selectedTags}
              onTagClick={(tag) => setSelectedTags(toggleSet(selectedTags, tag))}
            />
          ))}
        </div>
      )}
    </div>
  );
}
