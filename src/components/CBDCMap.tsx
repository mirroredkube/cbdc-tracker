"use client";

import { memo, useState, useEffect } from "react";
import { ComposableMap, Geographies, Geography, Marker } from "react-simple-maps";
import { cbdcProjects, CBDCProject } from "@/data/cbdcData";

const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

interface Props {
  onSelect: (project: CBDCProject) => void;
}

const CBDCMap = ({ onSelect }: Props) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="w-full glass-panel rounded-2xl md:p-8 mb-10 relative overflow-hidden flex items-center justify-center bg-slate-900/30 min-h-[400px]">
        <div className="animate-pulse w-12 h-12 rounded-full border-2 border-slate-700 border-t-blue-500 animate-spin" />
      </div>
    );
  }

  return (
    <div className="w-full glass-panel rounded-2xl md:p-8 mb-10 relative overflow-hidden flex items-center justify-center bg-slate-900/30 min-h-[400px]">
      
      {/* Map Legend Overlay */}
      <div className="absolute top-4 left-4 md:top-6 md:left-6 bg-slate-800/90 backdrop-blur-md p-4 rounded-xl border border-slate-700/50 shadow-2xl z-10 pointer-events-none">
        <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Project Status</h4>
        <div className="flex flex-col gap-3 text-sm">
          <div className="flex items-center gap-3">
            <span className="w-3.5 h-3.5 rounded-full bg-[#10b981] shadow-[0_0_10px_rgba(16,185,129,0.6)]"></span>
            <span className="text-slate-200 font-medium tracking-wide">Launched</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="w-3.5 h-3.5 rounded-full bg-[#60a5fa] shadow-[0_0_10px_rgba(96,165,250,0.6)]"></span>
            <span className="text-slate-200 font-medium tracking-wide">Research / Pilot</span>
          </div>
        </div>
      </div>

      <ComposableMap projection="geoMercator" projectionConfig={{ scale: 130 }} className="w-full h-auto max-h-[600px] outline-none">
        <Geographies geography={geoUrl}>
          {({ geographies }: { geographies: any[] }) =>
            geographies.map((geo: any) => (
              <Geography
                key={geo.rsmKey}
                geography={geo}
                fill="#1e293b"
                stroke="#334155"
                strokeWidth={0.5}
                style={{
                  default: { outline: "none" },
                  hover: { outline: "none", fill: "#334155" },
                  pressed: { outline: "none" },
                }}
              />
            ))
          }
        </Geographies>

        {cbdcProjects.map((project) => (
          <Marker 
            key={project.id} 
            coordinates={project.coordinates} 
          >
            <g
              transform="translate(-12, -24)"
              className="cursor-pointer group outline-none"
              onClick={() => onSelect(project)}
            >
              {/* Invisible expanding Hitbox for guaranteed accurate click registration */}
              <circle cx="12" cy="10" r="24" fill="transparent" onClick={() => onSelect(project)} style={{ cursor: "pointer", pointerEvents: "all" }} />
              
              <circle 
                onClick={() => onSelect(project)}
                cx="12" 
                cy="10" 
                r="4.5" 
                fill={project.stage === "Launched" ? "#10b981" : "#60a5fa"} 
                className="opacity-90 group-hover:scale-125 transition-transform origin-center drop-shadow-lg" 
                style={{ cursor: "pointer", pointerEvents: "all" }}
              />
              <path
                onClick={() => onSelect(project)}
                d="M12 21.7C17.3 17 20 13 20 10a8 8 0 1 0-16 0c0 3 2.7 7 8 11.7z"
                fill="none"
                stroke={project.stage === "Launched" ? "#10b981" : "#60a5fa"} 
                strokeWidth="2.5"
                className="group-hover:stroke-blue-400 transition-colors"
                style={{ cursor: "pointer", pointerEvents: "all" }}
              />
            </g>
          </Marker>
        ))}
      </ComposableMap>
    </div>
  );
};

export default memo(CBDCMap);
