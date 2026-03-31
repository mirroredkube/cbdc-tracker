"use client";

import { memo, useState, useEffect, useRef, useCallback } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  ZoomableGroup,
  Marker,
} from "react-simple-maps";
import { Plus, Minus } from "lucide-react";
import { cbdcProjects, EU_MEMBER_ISO_NUMERICS, CBDCProject, Stage } from "@/data/cbdcData";

// Use 50m for better small-country coverage (includes Singapore)
const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-50m.json";

export const STAGE_COLORS: Record<Stage, string> = {
  Launched: "#10b981",
  Pilot: "#60a5fa",
  "Proof of Concept": "#f59e0b",
  Research: "#94a3b8",
  Cancelled: "#f87171",
};

const STAGE_ORDER: Stage[] = ["Launched", "Pilot", "Proof of Concept", "Research", "Cancelled"];

interface TooltipData {
  project: CBDCProject;
  x: number;
  y: number;
}

interface Props {
  onSelect: (project: CBDCProject) => void;
  activeStages?: Set<Stage>;
  onToggleStage?: (stage: Stage) => void;
}

const CBDCMap = ({ onSelect, activeStages, onToggleStage }: Props) => {
  const [mounted, setMounted] = useState(false);
  const [zoom, setZoom] = useState(1);
  const [center, setCenter] = useState<[number, number]>([0, 20]);
  const [tooltip, setTooltip] = useState<TooltipData | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => { setMounted(true); }, []);

  // Build lookup maps from project data
  const isoToProject = new Map<string, CBDCProject>();
  for (const p of cbdcProjects) {
    if (p.isoNumeric) isoToProject.set(p.isoNumeric, p);
  }
  const euProject = cbdcProjects.find((p) => p.euMemberFill);
  const euSet = new Set(EU_MEMBER_ISO_NUMERICS);

  const isActive = useCallback(
    (stage: Stage) => !activeStages || activeStages.has(stage),
    [activeStages]
  );

  const getFill = (geoId: string): string => {
    const project = isoToProject.get(geoId);
    if (project && isActive(project.stage)) return STAGE_COLORS[project.stage];
    if (euSet.has(geoId) && euProject && isActive(euProject.stage)) return STAGE_COLORS[euProject.stage];
    return "#1e293b";
  };

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>, project: CBDCProject) => {
      const rect = containerRef.current?.getBoundingClientRect();
      if (!rect) return;
      setTooltip({ project, x: e.clientX - rect.left, y: e.clientY - rect.top });
    },
    []
  );

  if (!mounted) {
    return (
      <div className="w-full glass-panel rounded-2xl p-4 md:p-8 mb-10 min-h-[420px] flex items-center justify-center">
        <div className="w-10 h-10 rounded-full border-2 border-slate-700 border-t-blue-500 animate-spin" />
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className="w-full glass-panel rounded-2xl p-4 md:p-6 mb-10 relative overflow-hidden"
      onMouseLeave={() => setTooltip(null)}
    >
      {/* Interactive legend */}
      <div className="flex flex-wrap gap-2 mb-4">
        {STAGE_ORDER.map((stage) => {
          const active = isActive(stage);
          return (
            <button
              key={stage}
              onClick={() => onToggleStage?.(stage)}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold border transition-all ${
                active
                  ? "border-slate-600/50 bg-slate-800/60 text-slate-200"
                  : "border-slate-700/30 bg-slate-900/40 text-slate-500 opacity-50"
              }`}
            >
              <span
                className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                style={{ backgroundColor: STAGE_COLORS[stage], opacity: active ? 1 : 0.4 }}
              />
              {stage}
            </button>
          );
        })}
        {onToggleStage && (
          <button
            onClick={() => STAGE_ORDER.forEach((s) => !isActive(s) && onToggleStage(s))}
            className="px-3 py-1.5 rounded-full text-xs font-semibold border border-slate-600/50 text-blue-400 hover:text-blue-300 transition-colors"
          >
            Show all
          </button>
        )}
      </div>

      {/* Zoom controls */}
      <div className="absolute top-16 right-4 z-20 flex flex-col gap-1">
        <button
          onClick={() => setZoom((z) => Math.min(z * 1.6, 12))}
          className="w-8 h-8 flex items-center justify-center bg-slate-800 hover:bg-slate-700 border border-slate-600/50 rounded-md transition-colors text-slate-300"
          aria-label="Zoom in"
        >
          <Plus className="w-4 h-4" />
        </button>
        <button
          onClick={() => setZoom((z) => Math.max(z / 1.6, 1))}
          className="w-8 h-8 flex items-center justify-center bg-slate-800 hover:bg-slate-700 border border-slate-600/50 rounded-md transition-colors text-slate-300"
          aria-label="Zoom out"
        >
          <Minus className="w-4 h-4" />
        </button>
      </div>

      <ComposableMap
        projection="geoMercator"
        projectionConfig={{ scale: 130 }}
        className="w-full h-auto max-h-[560px] outline-none"
      >
        <ZoomableGroup
          zoom={zoom}
          center={center}
          onMoveEnd={({ zoom: z, coordinates }) => {
            setZoom(z);
            setCenter(coordinates as [number, number]);
          }}
        >
          <Geographies geography={geoUrl}>
            {({ geographies }: { geographies: any[] }) =>
              geographies.map((geo: any) => {
                const project = isoToProject.get(geo.id) ?? (euSet.has(geo.id) ? euProject : undefined);
                const fill = getFill(geo.id);
                const hasData = !!project && isActive(project.stage);
                return (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    fill={fill}
                    stroke="#0f172a"
                    strokeWidth={0.4}
                    style={{
                      default: { outline: "none" },
                      hover: { outline: "none", fill: hasData ? fill : "#334155", cursor: hasData ? "pointer" : "default" },
                      pressed: { outline: "none" },
                    }}
                    onMouseMove={hasData && project ? (e: React.MouseEvent<SVGPathElement>) => {
                      const rect = containerRef.current?.getBoundingClientRect();
                      if (!rect) return;
                      setTooltip({ project: project!, x: e.clientX - rect.left, y: e.clientY - rect.top });
                    } : undefined}
                    onMouseLeave={hasData ? () => setTooltip(null) : undefined}
                    onClick={hasData && project ? () => onSelect(project!) : undefined}
                  />
                );
              })
            }
          </Geographies>

          {/* Dot markers for small countries / multi-country entries with no isoNumeric */}
          {cbdcProjects
            .filter((p) => !p.isoNumeric && !p.euMemberFill && isActive(p.stage))
            .map((project) => (
              <Marker key={project.id} coordinates={project.coordinates}>
                <circle
                  r={5}
                  fill={STAGE_COLORS[project.stage]}
                  stroke="#0f172a"
                  strokeWidth={1.5}
                  style={{ cursor: "pointer" }}
                  onClick={() => onSelect(project)}
                  onMouseMove={(e: React.MouseEvent<SVGCircleElement>) => {
                    const rect = containerRef.current?.getBoundingClientRect();
                    if (!rect) return;
                    setTooltip({ project, x: e.clientX - rect.left, y: e.clientY - rect.top });
                  }}
                  onMouseLeave={() => setTooltip(null)}
                />
              </Marker>
            ))}
        </ZoomableGroup>
      </ComposableMap>

      {/* Hover tooltip */}
      {tooltip && (
        <div
          className="pointer-events-none absolute z-30 bg-slate-800 border border-slate-600/50 rounded-xl shadow-2xl p-3 w-52"
          style={{
            left: Math.min(tooltip.x + 12, (containerRef.current?.offsetWidth ?? 400) - 224),
            top: tooltip.y - 10,
          }}
        >
          <div className="flex items-center gap-2 mb-1.5">
            {tooltip.project.flagUrl && (
              <img
                src={tooltip.project.flagUrl}
                alt=""
                className="w-5 h-5 rounded-full object-cover border border-slate-600"
              />
            )}
            <span className="text-sm font-bold text-white truncate">{tooltip.project.country}</span>
          </div>
          <p className="text-xs text-slate-400 mb-1">{tooltip.project.currencyName}</p>
          <span
            className="inline-block px-2 py-0.5 rounded-full text-xs font-semibold"
            style={{
              backgroundColor: `${STAGE_COLORS[tooltip.project.stage]}20`,
              color: STAGE_COLORS[tooltip.project.stage],
              border: `1px solid ${STAGE_COLORS[tooltip.project.stage]}40`,
            }}
          >
            {tooltip.project.stage}
          </span>
        </div>
      )}
    </div>
  );
};

export default memo(CBDCMap);
