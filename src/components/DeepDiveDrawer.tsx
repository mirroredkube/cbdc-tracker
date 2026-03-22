"use client";

import { motion } from "framer-motion";
import { X, FileText, Server } from "lucide-react";
import type { CBDCProject } from "@/data/cbdcData";
import { StatusPill } from "./StatusPill";

interface Props {
  project: CBDCProject;
  onClose: () => void;
}

export function DeepDiveDrawer({ project, onClose }: Props) {
  return (
    <>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm z-40"
      />
      <motion.div 
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ type: "spring", damping: 25, stiffness: 200 }}
        className="fixed inset-y-0 right-0 w-full md:w-[450px] glass-panel z-50 flex flex-col shadow-2xl border-l border-slate-700/50"
      >
        <div className="p-6 border-b border-slate-700/50 flex justify-between items-center bg-slate-800/80">
          <h2 className="text-xl font-bold text-white flex items-center gap-3">
            {project.flagUrl && (
              <img src={project.flagUrl} alt={`${project.country} flag`} className="w-8 h-8 rounded-full object-cover border border-slate-600 shadow-sm" />
            )}
            {project.country}
          </h2>
          <button onClick={onClose} className="p-2 hover:bg-slate-700 rounded-full transition-colors">
            <X className="w-5 h-5 text-slate-300" />
          </button>
        </div>

        <div className="p-6 flex-1 overflow-y-auto space-y-8 custom-scrollbar">
          <div>
            <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-3">Status</h3>
            <div className="flex gap-2">
              <StatusPill label={project.stage} variant={project.stage} />
              <StatusPill label={project.type as any} variant={project.type as any} />
            </div>
          </div>

          <div>
             <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-2">Overview</h3>
             <p className="text-slate-300 leading-relaxed text-sm">{project.description}</p>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-3 flex items-center gap-2">
              <Server className="w-4 h-4" /> Tech Stack
            </h3>
            <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700/50 shadow-inner">
              <span className="text-emerald-400 font-mono text-sm">{project.techStack}</span>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-3 flex items-center gap-2">
              <FileText className="w-4 h-4" /> Whitepaper Vault
            </h3>
            <ul className="space-y-3">
              {project.whitepapers.map((wp, idx) => (
                <li key={idx}>
                  <a href={wp.url} target="_blank" rel="noopener noreferrer" className="block p-3 rounded-lg bg-slate-700/30 hover:bg-slate-700/50 border border-slate-600/30 hover:border-slate-500 transition-all text-sm group">
                     <div className="flex items-center gap-3">
                       <FileText className="w-5 h-5 text-blue-400 group-hover:text-blue-300 flex-shrink-0" />
                       <span className="text-slate-200 group-hover:text-white transition-colors">{wp.title}</span>
                     </div>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </motion.div>
    </>
  );
}
