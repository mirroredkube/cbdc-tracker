"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import Link from "next/link";
import { ArrowRight, TrendingUp, Plus, Pencil, Trash2 } from "lucide-react";
import { timelineEvents, TimelineEvent, TimelineEventType } from "@/data/timelineData";
import { cbdcProjects } from "@/data/cbdcData";
import { STAGE_COLORS } from "@/components/CBDCMap";
import { FlagImage } from "@/components/FlagImage";

const BATCH_SIZE = 15;

const TYPE_CONFIG: Record<
  TimelineEventType,
  { label: string; icon: React.ReactNode; color: string; bg: string }
> = {
  status_updated: {
    label: "Status updated",
    icon: <TrendingUp className="w-3.5 h-3.5" />,
    color: "text-blue-400",
    bg: "bg-blue-500/10 border-blue-500/20",
  },
  added: {
    label: "Added",
    icon: <Plus className="w-3.5 h-3.5" />,
    color: "text-emerald-400",
    bg: "bg-emerald-500/10 border-emerald-500/20",
  },
  updated: {
    label: "Updated",
    icon: <Pencil className="w-3.5 h-3.5" />,
    color: "text-yellow-400",
    bg: "bg-yellow-500/10 border-yellow-500/20",
  },
  deleted: {
    label: "Deleted",
    icon: <Trash2 className="w-3.5 h-3.5" />,
    color: "text-red-400",
    bg: "bg-red-500/10 border-red-500/20",
  },
};

function EventCard({ event }: { event: TimelineEvent }) {
  const config = TYPE_CONFIG[event.type];
  const project = cbdcProjects.find((p) => p.id === event.currencyId);
  const stageColor =
    event.type === "status_updated" && event.newValue
      ? Object.entries(STAGE_COLORS).find(([k]) => k === event.newValue)?.[1]
      : undefined;

  return (
    <div className="flex gap-3 group">
      {/* Timeline dot */}
      <div className="flex flex-col items-center flex-shrink-0">
        <div
          className={`w-7 h-7 rounded-full border flex items-center justify-center ${config.bg} ${config.color} mt-0.5`}
        >
          {config.icon}
        </div>
        <div className="flex-1 w-px bg-slate-800 mt-1" />
      </div>

      {/* Content */}
      <div className="pb-5 flex-1 min-w-0">
        <div className="glass-panel rounded-xl p-4 hover:border-slate-600/50 transition-all">
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <span className={`text-xs font-semibold px-2 py-0.5 rounded-full border ${config.bg} ${config.color}`}>
              {config.label}
            </span>
            {event.field && (
              <span className="text-xs text-slate-500 font-mono bg-slate-800/60 px-2 py-0.5 rounded">
                {event.field}
              </span>
            )}
          </div>

          <p className="text-sm text-slate-200 mb-2">{event.description}</p>

          {event.type === "status_updated" && event.previousValue && event.newValue && (
            <div className="flex items-center gap-2 text-xs mb-2">
              <span className="text-slate-500 line-through">{event.previousValue}</span>
              <ArrowRight className="w-3 h-3 text-slate-600" />
              <span
                className="font-semibold px-2 py-0.5 rounded-full"
                style={
                  stageColor
                    ? { color: stageColor, backgroundColor: `${stageColor}15`, border: `1px solid ${stageColor}30` }
                    : {}
                }
              >
                {event.newValue}
              </span>
            </div>
          )}

          <div className="flex items-center gap-2 mt-2">
            {project?.flagUrl && (
              <FlagImage
                src={project.flagUrl}
                alt=""
                size={16}
                className="border border-slate-700"
              />
            )}
            <Link
              href={`/currency/${event.tag}`}
              className="text-xs text-blue-400 hover:text-blue-300 transition-colors font-medium"
              onClick={(e) => e.stopPropagation()}
            >
              {event.currencyName} · {event.country}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export function TimelineClient() {
  const [visible, setVisible] = useState(BATCH_SIZE);
  const sentinelRef = useRef<HTMLDivElement>(null);

  const sorted = useMemo(
    () => [...timelineEvents].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()),
    []
  );

  // Group by "Month Year"
  const groups = useMemo(() => {
    const map = new Map<string, TimelineEvent[]>();
    for (const ev of sorted.slice(0, visible)) {
      const key = new Intl.DateTimeFormat("en-US", { month: "long", year: "numeric" }).format(
        new Date(ev.date)
      );
      if (!map.has(key)) map.set(key, []);
      map.get(key)!.push(ev);
    }
    return Array.from(map.entries());
  }, [sorted, visible]);

  const hasMore = visible < sorted.length;

  // IntersectionObserver for infinite scroll
  useEffect(() => {
    if (!sentinelRef.current || !hasMore) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) setVisible((v) => v + BATCH_SIZE);
      },
      { rootMargin: "200px" }
    );
    observer.observe(sentinelRef.current);
    return () => observer.disconnect();
  }, [hasMore]);

  const lastUpdate = new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(sorted[0].date));

  return (
    <div className="max-w-3xl mx-auto px-4 md:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-1">Timeline</h1>
        <p className="text-slate-400 text-sm">Last update: {lastUpdate}</p>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-3 mb-8 p-4 glass-panel rounded-xl">
        {(Object.entries(TYPE_CONFIG) as [TimelineEventType, typeof TYPE_CONFIG[TimelineEventType]][]).map(
          ([key, cfg]) => (
            <div key={key} className={`flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full border ${cfg.bg} ${cfg.color}`}>
              {cfg.icon}
              {cfg.label}
            </div>
          )
        )}
      </div>

      {/* Events grouped by month */}
      {groups.map(([month, events]) => (
        <div key={month} className="mb-6">
          <h2 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4 pl-10">
            {month}
          </h2>
          <div>
            {events.map((ev) => (
              <EventCard key={ev.id} event={ev} />
            ))}
          </div>
        </div>
      ))}

      {/* Sentinel for infinite scroll */}
      <div ref={sentinelRef} />

      {hasMore && (
        <div className="flex justify-center py-6">
          <button
            onClick={() => setVisible((v) => v + BATCH_SIZE)}
            className="px-6 py-2.5 bg-slate-800/60 hover:bg-slate-700/60 border border-slate-700/50 rounded-xl text-sm font-medium text-slate-200 transition-all"
          >
            Show more events
          </button>
        </div>
      )}
    </div>
  );
}
