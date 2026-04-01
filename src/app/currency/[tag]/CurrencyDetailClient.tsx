"use client";

import Link from "next/link";
import { ExternalLink, FileText, Server, ArrowLeft, Building2, Calendar, Database, Zap, ArrowRight, TrendingUp, Plus, Pencil } from "lucide-react";
import type { CBDCProject } from "@/data/cbdcData";
import { newsItems } from "@/data/newsData";
import { timelineEvents, TimelineEventType } from "@/data/timelineData";
import { StatusPill } from "@/components/StatusPill";
import { WatchFlag } from "@/components/WatchFlag";
import { STAGE_COLORS } from "@/components/CBDCMap";

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

interface InfoRowProps {
  icon: React.ReactNode;
  label: string;
  value: React.ReactNode;
}
function InfoRow({ icon, label, value }: InfoRowProps) {
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

export function CurrencyDetailClient({ project }: { project: CBDCProject }) {
  const relatedNews = newsItems
    .filter((n) => n.currencyIds.includes(project.id))
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const relatedTimeline = timelineEvents
    .filter((e) => e.currencyId === project.id)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-8">
      {/* Back link */}
      <Link
        href="/"
        className="inline-flex items-center gap-1.5 text-sm text-slate-400 hover:text-slate-200 transition-colors mb-6"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to dashboard
      </Link>

      {/* Page header */}
      <div className="flex items-start gap-4 mb-8">
        {project.flagUrl && (
          <img
            src={project.flagUrl}
            alt={`${project.country} flag`}
            className="w-14 h-14 rounded-full object-cover border-2 border-slate-600 shadow-lg flex-shrink-0"
          />
        )}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3 flex-wrap mb-1">
            <h1 className="text-3xl font-bold text-white">{project.currencyName}</h1>
            <WatchFlag id={project.id} className="scale-125" />
          </div>
          <p className="text-slate-400">{project.country} · {project.centralBank}</p>
          <div className="flex flex-wrap gap-2 mt-3">
            <StatusPill label={project.stage} variant={project.stage} />
            <StatusPill label={project.type} variant={project.type} />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left column — Info card */}
        <div className="lg:col-span-1 space-y-6">
          <div className="glass-panel rounded-2xl p-5">
            <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">Overview</h2>
            <p className="text-sm text-slate-300 leading-relaxed">{project.description}</p>
          </div>

          <div className="glass-panel rounded-2xl p-5">
            <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Details</h2>
            <InfoRow icon={<Building2 className="w-4 h-4" />} label="Central Bank" value={project.centralBank} />
            <InfoRow icon={<Calendar className="w-4 h-4" />} label="Announced" value={project.announcementYear} />
            <InfoRow icon={<Server className="w-4 h-4" />} label="Tech Stack" value={<span className="font-mono text-emerald-400">{project.techStack}</span>} />
            {project.technologyProvider && (
              <InfoRow icon={<Zap className="w-4 h-4" />} label="Provider" value={project.technologyProvider} />
            )}
            <InfoRow
              icon={<Database className="w-4 h-4" />}
              label="Uses DLT"
              value={
                <span className={project.usesDLT ? "text-emerald-400" : "text-red-400"}>
                  {project.usesDLT ? "Yes" : "No"}
                </span>
              }
            />
            <InfoRow
              icon={<Zap className="w-4 h-4" />}
              label="Interoperable"
              value={
                <span className={project.interoperable ? "text-emerald-400" : "text-slate-400"}>
                  {project.interoperable ? "Yes" : "No"}
                </span>
              }
            />
            <InfoRow icon={<ArrowRight className="w-4 h-4" />} label="Update Rate" value={project.updateRate} />
          </div>

          {/* Whitepapers */}
          <div className="glass-panel rounded-2xl p-5">
            <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 flex items-center gap-2">
              <FileText className="w-4 h-4" /> Whitepapers
            </h2>
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

        {/* Right columns — News + Timeline */}
        <div className="lg:col-span-2 space-y-6">
          {/* News */}
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
                            <span style={stageColor ? { color: stageColor } : {}} className="font-semibold">
                              {ev.newValue}
                            </span>
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
