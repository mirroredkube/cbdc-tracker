"use client";

import Link from "next/link";
import {
  ExternalLink, FileText, Server, ArrowLeft, Building2, Calendar,
  Database, Zap, ArrowRight, TrendingUp, Plus, Pencil, Shield,
  Wifi, WifiOff, Code2, Layers, Lock, CircleDollarSign,
  Globe, CheckCircle2, AlertCircle, BookOpen, BarChart3, Clock,
  ShieldAlert, Users, Cpu, Network, GitCompareArrows,
} from "lucide-react";
import type { CBDCProject, RiskProfile, Architecture, Confidence } from "@/data/cbdcData";
import { newsItems } from "@/data/newsData";
import { timelineEvents, TimelineEventType } from "@/data/timelineData";
import { researchPapers } from "@/data/researchData";
import { FlagImage } from "@/components/FlagImage";
import { StatusPill } from "@/components/StatusPill";
import { WatchFlag } from "@/components/WatchFlag";
import { STAGE_COLORS } from "@/components/CBDCMap";
import clsx from "clsx";

// ─── Timeline helpers ─────────────────────────────────────────────────────────

const TYPE_ICONS: Record<TimelineEventType, React.ReactNode> = {
  status_updated: <TrendingUp className="w-3 h-3" />,
  added: <Plus className="w-3 h-3" />,
  updated: <Pencil className="w-3 h-3" />,
  deleted: <ArrowRight className="w-3 h-3" />,
};

const TYPE_COLORS: Record<TimelineEventType, string> = {
  status_updated: "text-blue-400 bg-blue-500/10 border-blue-500/20",
  added: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
  updated: "text-yellow-400 bg-yellow-500/10 border-yellow-500/20",
  deleted: "text-red-400 bg-red-500/10 border-red-500/20",
};

// ─── Shared primitives ────────────────────────────────────────────────────────

function SectionHeading({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4 flex items-center gap-2">
      {icon}
      {label}
    </h2>
  );
}

function InfoRow({ icon, label, value }: { icon: React.ReactNode; label: string; value: React.ReactNode }) {
  return (
    <div className="flex items-start gap-3 py-3 border-b border-slate-700/30 last:border-0">
      <div className="text-slate-500 mt-0.5 flex-shrink-0">{icon}</div>
      <div className="flex-1 min-w-0">
        <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold mb-0.5">{label}</p>
        <div className="text-sm text-slate-200">{value}</div>
      </div>
    </div>
  );
}

// ─── Confidence badge ─────────────────────────────────────────────────────────

const CONFIDENCE_STYLE: Record<Confidence, string> = {
  High: "bg-emerald-500/10 border-emerald-500/30 text-emerald-400",
  Medium: "bg-yellow-500/10 border-yellow-500/30 text-yellow-400",
  Low: "bg-red-500/10 border-red-500/30 text-red-400",
};

function ConfidenceBadge({ confidence, lastVerifiedAt }: { confidence: Confidence; lastVerifiedAt: string }) {
  const formatted = new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", year: "numeric" }).format(
    new Date(lastVerifiedAt)
  );
  return (
    <div className={clsx("flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-medium", CONFIDENCE_STYLE[confidence])}>
      <CheckCircle2 className="w-3.5 h-3.5" />
      {confidence} confidence · Verified {formatted}
    </div>
  );
}

// ─── Architecture panel ───────────────────────────────────────────────────────

function ArchBadge({ ok, label }: { ok: boolean; label: string }) {
  return (
    <div className={clsx(
      "flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border text-xs font-medium",
      ok
        ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400"
        : "bg-slate-700/40 border-slate-600/30 text-slate-500"
    )}>
      {ok ? <CheckCircle2 className="w-3 h-3" /> : <AlertCircle className="w-3 h-3" />}
      {label}
    </div>
  );
}

const PRIVACY_COLOR: Record<string, string> = {
  Anonymous: "text-emerald-400",
  Pseudonymous: "text-yellow-400",
  Identified: "text-orange-400",
};

function ArchitecturePanel({ arch }: { arch: Architecture }) {
  return (
    <div className="glass-panel rounded-2xl p-5">
      <SectionHeading icon={<Cpu className="w-4 h-4" />} label="Architecture" />

      <div className="grid grid-cols-2 gap-x-4 mb-4">
        <InfoRow icon={<Layers className="w-4 h-4" />} label="Distribution" value={arch.tier} />
        <InfoRow icon={<Database className="w-4 h-4" />} label="Model" value={arch.accountModel} />
        <InfoRow
          icon={<Lock className="w-4 h-4" />}
          label="Privacy"
          value={<span className={PRIVACY_COLOR[arch.privacyModel] ?? "text-slate-200"}>{arch.privacyModel}</span>}
        />
        {arch.holdingLimit && (
          <InfoRow icon={<CircleDollarSign className="w-4 h-4" />} label="Holding Limit" value={arch.holdingLimit} />
        )}
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        <ArchBadge ok={arch.offlineCapable} label="Offline capable" />
        <ArchBadge ok={arch.programmable} label="Programmable" />
        <ArchBadge ok={arch.interestBearing} label="Interest-bearing" />
      </div>

      {arch.notes && (
        <p className="text-xs text-slate-400 leading-relaxed border-t border-slate-700/30 pt-3">{arch.notes}</p>
      )}
    </div>
  );
}

// ─── Risk profile panel ───────────────────────────────────────────────────────

const RISK_META: { key: keyof Omit<RiskProfile, "notes">; label: string; icon: React.ReactNode; description: string }[] = [
  { key: "financial", label: "Financial Stability", icon: <BarChart3 className="w-3.5 h-3.5" />, description: "Bank disintermediation & systemic risk" },
  { key: "privacy", label: "Privacy", icon: <Lock className="w-3.5 h-3.5" />, description: "Surveillance & data exposure" },
  { key: "cyber", label: "Cybersecurity", icon: <ShieldAlert className="w-3.5 h-3.5" />, description: "Attack surface & infrastructure risk" },
  { key: "adoption", label: "Adoption", icon: <Users className="w-3.5 h-3.5" />, description: "Uptake failure risk" },
  { key: "geopolitical", label: "Geopolitical", icon: <Globe className="w-3.5 h-3.5" />, description: "Sanctions, fragmentation, political risk" },
];

function riskColor(score: number) {
  if (score <= 2) return "bg-emerald-500";
  if (score === 3) return "bg-yellow-500";
  return "bg-red-500";
}

function riskLabel(score: number) {
  if (score === 1) return "Very Low";
  if (score === 2) return "Low";
  if (score === 3) return "Moderate";
  if (score === 4) return "High";
  return "Very High";
}

function RiskRow({ meta, score }: { meta: typeof RISK_META[number]; score: number }) {
  return (
    <div className="py-2.5 border-b border-slate-700/30 last:border-0">
      <div className="flex items-center justify-between mb-1.5">
        <div className="flex items-center gap-1.5 text-slate-300 text-xs font-semibold">
          <span className="text-slate-500">{meta.icon}</span>
          {meta.label}
        </div>
        <span className={clsx("text-xs font-bold", score >= 4 ? "text-red-400" : score === 3 ? "text-yellow-400" : "text-emerald-400")}>
          {riskLabel(score)}
        </span>
      </div>
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((n) => (
          <div
            key={n}
            className={clsx("h-1.5 flex-1 rounded-full transition-all", n <= score ? riskColor(score) : "bg-slate-700/60")}
          />
        ))}
      </div>
      <p className="text-xs text-slate-600 mt-1">{meta.description}</p>
    </div>
  );
}

function RiskProfilePanel({ risk }: { risk: RiskProfile }) {
  return (
    <div className="glass-panel rounded-2xl p-5">
      <SectionHeading icon={<Shield className="w-4 h-4" />} label="Risk Profile" />
      {RISK_META.map((m) => (
        <RiskRow key={m.key} meta={m} score={risk[m.key]} />
      ))}
      {risk.notes && (
        <p className="text-xs text-slate-400 leading-relaxed border-t border-slate-700/30 pt-3 mt-1">{risk.notes}</p>
      )}
    </div>
  );
}

// ─── Pilot metrics panel ──────────────────────────────────────────────────────

function fmt(n: number) {
  if (n >= 1_000_000_000) return `${(n / 1_000_000_000).toFixed(1)}B`;
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(0)}K`;
  return n.toLocaleString();
}

function MetricCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-slate-700/30 border border-slate-600/20 rounded-xl p-3 text-center">
      <p className="text-lg font-bold text-white">{value}</p>
      <p className="text-xs text-slate-500 mt-0.5">{label}</p>
    </div>
  );
}

function PilotMetricsPanel({ metrics }: { metrics: NonNullable<CBDCProject["pilotMetrics"]> }) {
  const asOf = new Intl.DateTimeFormat("en-US", { month: "short", year: "numeric" }).format(new Date(metrics.asOf));
  const hasMetrics = metrics.wallets || metrics.transactions || metrics.volume || metrics.merchants;
  if (!hasMetrics) return null;

  return (
    <div className="glass-panel rounded-2xl p-5">
      <div className="flex items-center justify-between mb-4">
        <SectionHeading icon={<BarChart3 className="w-4 h-4" />} label="Pilot Metrics" />
        <span className="text-xs text-slate-500 flex items-center gap-1"><Clock className="w-3 h-3" /> As of {asOf}</span>
      </div>
      <div className="grid grid-cols-2 gap-3">
        {metrics.wallets && <MetricCard label="Wallets" value={fmt(metrics.wallets)} />}
        {metrics.transactions && <MetricCard label="Transactions" value={fmt(metrics.transactions)} />}
        {metrics.merchants && <MetricCard label="Merchants" value={fmt(metrics.merchants)} />}
        {metrics.volume && <MetricCard label="Volume" value={metrics.volume} />}
      </div>
    </div>
  );
}

// ─── Research papers panel ────────────────────────────────────────────────────

const INSTITUTION_STYLE: Record<string, string> = {
  BIS: "bg-blue-500/10 border-blue-500/20 text-blue-400",
  IMF: "bg-purple-500/10 border-purple-500/20 text-purple-400",
  ECB: "bg-indigo-500/10 border-indigo-500/20 text-indigo-400",
  "Federal Reserve": "bg-emerald-500/10 border-emerald-500/20 text-emerald-400",
  "World Bank": "bg-cyan-500/10 border-cyan-500/20 text-cyan-400",
  NBER: "bg-orange-500/10 border-orange-500/20 text-orange-400",
  Academic: "bg-slate-500/10 border-slate-500/20 text-slate-400",
  "Think Tank": "bg-violet-500/10 border-violet-500/20 text-violet-400",
  "Central Bank": "bg-teal-500/10 border-teal-500/20 text-teal-400",
  OMFIF: "bg-pink-500/10 border-pink-500/20 text-pink-400",
};

function ResearchCard({ paper }: { paper: (typeof researchPapers)[number] }) {
  const year = paper.date.slice(0, 4);
  return (
    <div className="border border-slate-700/40 rounded-xl p-4 bg-slate-800/40 hover:border-slate-600/60 hover:bg-slate-800/60 transition-all">
      <div className="flex items-start gap-3 mb-2">
        <BookOpen className="w-4 h-4 text-blue-400 flex-shrink-0 mt-0.5" />
        <div className="flex-1 min-w-0">
          <a
            href={paper.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-semibold text-white hover:text-blue-300 transition-colors leading-snug flex items-start gap-1 group"
          >
            <span>{paper.title}</span>
            <ExternalLink className="w-3 h-3 mt-0.5 flex-shrink-0 text-slate-500 group-hover:text-blue-400" />
          </a>
          <div className="flex items-center gap-2 mt-1 flex-wrap">
            <span className={clsx("text-xs px-2 py-0.5 rounded-full border font-medium", INSTITUTION_STYLE[paper.institution] ?? INSTITUTION_STYLE["Academic"])}>
              {paper.institution}
            </span>
            <span className="text-xs text-slate-500">{year}</span>
            {paper.authors.length > 0 && (
              <span className="text-xs text-slate-500">· {paper.authors.slice(0, 2).join(", ")}{paper.authors.length > 2 ? " et al." : ""}</span>
            )}
          </div>
        </div>
      </div>
      <p className="text-xs text-slate-400 leading-relaxed mb-3 ml-7 line-clamp-2">{paper.abstract}</p>
      <ul className="ml-7 space-y-1">
        {paper.keyFindings.slice(0, 2).map((f, i) => (
          <li key={i} className="text-xs text-slate-500 flex items-start gap-1.5">
            <span className="text-blue-500 mt-0.5 flex-shrink-0">›</span>
            {f}
          </li>
        ))}
      </ul>
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

export function CurrencyDetailClient({ project }: { project: CBDCProject }) {
  const relatedNews = newsItems
    .filter((n) => n.currencyIds.includes(project.id))
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const relatedTimeline = timelineEvents
    .filter((e) => e.currencyId === project.id)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const relatedResearch = researchPapers
    .filter((p) => p.relevantCbdcIds.includes(project.id))
    .sort((a, b) => b.date.localeCompare(a.date));

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-8">
      {/* Back */}
      <Link
        href="/"
        className="inline-flex items-center gap-1.5 text-sm text-slate-400 hover:text-slate-200 transition-colors mb-6"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to dashboard
      </Link>

      {/* Header */}
      <div className="flex items-start gap-4 mb-8 flex-wrap">
        {project.flagUrl && (
          <FlagImage
            src={project.flagUrl}
            alt={`${project.country} flag`}
            size={64}
            className="border-2 border-slate-600 shadow-lg flex-shrink-0"
          />
        )}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3 flex-wrap mb-1">
            <h1 className="text-3xl font-bold text-white">{project.currencyName}</h1>
            <WatchFlag id={project.id} className="scale-125" />
            <Link
              href={`/compare?a=${project.tag}`}
              className="flex items-center gap-1.5 px-3 py-1 rounded-full border border-slate-600 text-slate-400 hover:border-blue-500/50 hover:text-blue-400 transition-colors text-xs font-medium"
            >
              <GitCompareArrows className="w-3.5 h-3.5" />
              Compare
            </Link>
          </div>
          <p className="text-slate-400 mb-3">{project.country} · {project.centralBank}</p>
          <div className="flex flex-wrap gap-2 items-center">
            <StatusPill label={project.stage} variant={project.stage} />
            <StatusPill label={project.type} variant={project.type} />
            <ConfidenceBadge confidence={project.confidence} lastVerifiedAt={project.lastVerifiedAt} />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* ── Left column ── */}
        <div className="lg:col-span-1 space-y-6">

          {/* Overview */}
          <div className="glass-panel rounded-2xl p-5">
            <SectionHeading icon={<FileText className="w-4 h-4" />} label="Overview" />
            <p className="text-sm text-slate-300 leading-relaxed">{project.description}</p>
          </div>

          {/* Core details */}
          <div className="glass-panel rounded-2xl p-5">
            <SectionHeading icon={<Server className="w-4 h-4" />} label="Details" />
            <InfoRow icon={<Building2 className="w-4 h-4" />} label="Central Bank" value={project.centralBank} />
            <InfoRow icon={<Calendar className="w-4 h-4" />} label="Announced" value={project.announcementYear} />
            <InfoRow icon={<Server className="w-4 h-4" />} label="Tech Stack" value={<span className="font-mono text-emerald-400">{project.techStack}</span>} />
            {project.technologyProvider && (
              <InfoRow icon={<Zap className="w-4 h-4" />} label="Provider" value={project.technologyProvider} />
            )}
            <InfoRow
              icon={<Database className="w-4 h-4" />}
              label="Uses DLT"
              value={<span className={project.usesDLT ? "text-emerald-400" : "text-red-400"}>{project.usesDLT ? "Yes" : "No"}</span>}
            />
            <InfoRow
              icon={project.interoperable ? <Wifi className="w-4 h-4" /> : <WifiOff className="w-4 h-4" />}
              label="Interoperable"
              value={<span className={project.interoperable ? "text-emerald-400" : "text-slate-400"}>{project.interoperable ? "Yes" : "No"}</span>}
            />
            <InfoRow icon={<Clock className="w-4 h-4" />} label="Update Rate" value={project.updateRate} />
          </div>

          {/* Architecture */}
          <ArchitecturePanel arch={project.architecture} />

          {/* Risk Profile */}
          <RiskProfilePanel risk={project.riskProfile} />

          {/* Whitepapers */}
          <div className="glass-panel rounded-2xl p-5">
            <SectionHeading icon={<FileText className="w-4 h-4" />} label="Official Documents" />
            <ul className="space-y-2">
              {project.whitepapers.map((wp, i) => (
                <li key={i}>
                  <a
                    href={wp.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 p-3 rounded-lg bg-slate-700/30 hover:bg-slate-700/50 border border-slate-600/30 hover:border-slate-500 transition-all text-sm group"
                  >
                    <FileText className="w-4 h-4 text-blue-400 flex-shrink-0" />
                    <span className="text-slate-200 group-hover:text-white transition-colors flex-1 line-clamp-2">{wp.title}</span>
                    <ExternalLink className="w-3.5 h-3.5 text-slate-500 flex-shrink-0" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* ── Right columns ── */}
        <div className="lg:col-span-2 space-y-6">

          {/* Design Rationale */}
          <div className="glass-panel rounded-2xl p-5">
            <SectionHeading icon={<Code2 className="w-4 h-4" />} label="Design Rationale" />
            <p className="text-sm text-slate-300 leading-relaxed">{project.designRationale}</p>
          </div>

          {/* Pilot metrics */}
          {project.pilotMetrics && <PilotMetricsPanel metrics={project.pilotMetrics} />}

          {/* Interoperability */}
          <div className="glass-panel rounded-2xl p-5">
            <SectionHeading icon={<Network className="w-4 h-4" />} label="Interoperability & Cross-Border" />
            <p className="text-sm text-slate-300 leading-relaxed">{project.interoperabilityDetails}</p>
          </div>

          {/* Research & Studies */}
          {relatedResearch.length > 0 && (
            <div className="glass-panel rounded-2xl p-5">
              <div className="flex items-center justify-between mb-4">
                <SectionHeading icon={<BookOpen className="w-4 h-4" />} label={`Research & Studies (${relatedResearch.length})`} />
                <Link href="/research" className="text-xs text-blue-400 hover:text-blue-300 transition-colors">
                  View all →
                </Link>
              </div>
              <div className="space-y-3">
                {relatedResearch.map((paper) => (
                  <ResearchCard key={paper.id} paper={paper} />
                ))}
              </div>
            </div>
          )}

          {/* Related News */}
          <div className="glass-panel rounded-2xl p-5">
            <h2 className="text-lg font-bold text-white mb-4">Related News</h2>
            {relatedNews.length === 0 ? (
              <p className="text-sm text-slate-500">No news articles found for this currency.</p>
            ) : (
              <div className="space-y-4">
                {relatedNews.map((item) => (
                  <div key={item.id} className="border-b border-slate-700/30 last:border-0 pb-4 last:pb-0">
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-semibold text-white hover:text-blue-300 transition-colors flex items-start gap-1.5 group mb-1"
                    >
                      {item.title}
                      <ExternalLink className="w-3 h-3 mt-0.5 flex-shrink-0 text-slate-500 group-hover:text-blue-400" />
                    </a>
                    <p className="text-xs text-slate-400 line-clamp-2 mb-2">{item.summary}</p>
                    <div className="flex items-center gap-2 text-xs text-slate-500">
                      <span>{new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", year: "numeric" }).format(new Date(item.date))}</span>
                      <span>·</span>
                      <span>{item.source}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Timeline */}
          <div className="glass-panel rounded-2xl p-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-white">Timeline</h2>
              <Link href="/timeline" className="text-xs text-blue-400 hover:text-blue-300 transition-colors">
                View all →
              </Link>
            </div>
            {relatedTimeline.length === 0 ? (
              <p className="text-sm text-slate-500">No timeline events for this currency.</p>
            ) : (
              <div className="space-y-3">
                {relatedTimeline.map((ev) => {
                  const stageColor =
                    ev.type === "status_updated" && ev.newValue
                      ? Object.entries(STAGE_COLORS).find(([k]) => k === ev.newValue)?.[1]
                      : undefined;
                  return (
                    <div key={ev.id} className="flex gap-3">
                      <div className={`w-6 h-6 rounded-full border flex items-center justify-center flex-shrink-0 mt-0.5 ${TYPE_COLORS[ev.type]}`}>
                        {TYPE_ICONS[ev.type]}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-slate-200 leading-snug">{ev.description}</p>
                        {ev.type === "status_updated" && ev.previousValue && ev.newValue && (
                          <div className="flex items-center gap-1.5 text-xs mt-1">
                            <span className="text-slate-500 line-through">{ev.previousValue}</span>
                            <ArrowRight className="w-3 h-3 text-slate-600" />
                            <span style={stageColor ? { color: stageColor } : {}} className="font-semibold">{ev.newValue}</span>
                          </div>
                        )}
                        <p className="text-xs text-slate-500 mt-0.5">
                          {new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", year: "numeric" }).format(new Date(ev.date))}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
