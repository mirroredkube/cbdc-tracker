"use client";

import { motion } from "framer-motion";
import { X, FileText, Server, Building2, Calendar, Database, Zap, ExternalLink } from "lucide-react";
import Link from "next/link";
import type { CBDCProject } from "@/data/cbdcData";
import { StatusPill } from "./StatusPill";
import { WatchFlag } from "./WatchFlag";

interface Props {
  project: CBDCProject;
  onClose: () => void;
}

function Row({ icon, label, children }: { icon: React.ReactNode; label: string; children: React.ReactNode }) {
  return (
    <div className="flex items-start gap-3 py-2.5 border-b border-slate-700/30 last:border-0">
      <div className="text-slate-500 mt-0.5 flex-shrink-0">{icon}</div>
      <div className="flex-1 min-w-0">
        <p className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold mb-0.5">{label}</p>
        <div className="text-sm text-slate-200">{children}</div>
      </div>
    </div>
  );
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
        className="fixed inset-y-0 right-0 w-full md:w-[480px] glass-panel z-50 flex flex-col shadow-2xl border-l border-slate-700/50"
      >
        {/* Header */}
        <div className="p-5 border-b border-slate-700/50 flex justify-between items-center bg-slate-800/80">
          <div className="flex items-center gap-3 min-w-0">
            {project.flagUrl && (
              <img
                src={project.flagUrl}
                alt={`${project.country} flag`}
                className="w-9 h-9 rounded-full object-cover border border-slate-600 shadow-sm flex-shrink-0"
              />
            )}
            <div className="min-w-0">
              <h2 className="text-lg font-bold text-white truncate">{project.currencyName}</h2>
              <p className="text-xs text-slate-400 truncate">{project.country}</p>
            </div>
          </div>
          <div className="flex items-center gap-1 flex-shrink-0">
            <WatchFlag id={project.id} />
            <Link
              href={`/currency/${project.tag}`}
              onClick={onClose}
              className="p-1.5 rounded-full text-slate-400 hover:text-blue-400 hover:bg-blue-500/10 transition-colors"
              aria-label="View full page"
            >
              <ExternalLink className="w-4 h-4" />
            </Link>
            <button onClick={onClose} className="p-1.5 hover:bg-slate-700 rounded-full transition-colors ml-1">
              <X className="w-5 h-5 text-slate-300" />
            </button>
          </div>
        </div>

        {/* Body */}
        <div className="p-5 flex-1 overflow-y-auto space-y-6">
          {/* Status */}
          <div>
            <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Status</h3>
            <div className="flex gap-2 flex-wrap">
              <StatusPill label={project.stage} variant={project.stage} />
              <StatusPill label={project.type} variant={project.type} />
            </div>
          </div>

          {/* Overview */}
          <div>
            <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Overview</h3>
            <p className="text-slate-300 leading-relaxed text-sm">{project.description}</p>
          </div>

          {/* Key facts */}
          <div>
            <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Details</h3>
            <div className="bg-slate-900/40 rounded-xl border border-slate-700/30 px-1">
              <Row icon={<Building2 className="w-4 h-4" />} label="Central Bank">
                {project.centralBank}
              </Row>
              <Row icon={<Calendar className="w-4 h-4" />} label="Announced">
                {project.announcementYear}
              </Row>
              <Row icon={<Server className="w-4 h-4" />} label="Tech Stack">
                <span className="font-mono text-emerald-400 text-xs">{project.techStack}</span>
              </Row>
              {project.technologyProvider && (
                <Row icon={<Zap className="w-4 h-4" />} label="Provider">
                  {project.technologyProvider}
                </Row>
              )}
              <Row icon={<Database className="w-4 h-4" />} label="Uses DLT">
                <span className={project.usesDLT ? "text-emerald-400" : "text-red-400"}>
                  {project.usesDLT ? "Yes" : "No"}
                </span>
              </Row>
              <Row icon={<Zap className="w-4 h-4" />} label="Interoperable">
                <span className={project.interoperable ? "text-emerald-400" : "text-slate-400"}>
                  {project.interoperable ? "Yes" : "No"}
                </span>
              </Row>
            </div>
          </div>

          {/* Whitepapers */}
          <div>
            <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-2">
              <FileText className="w-4 h-4" /> Whitepapers
            </h3>
            <ul className="space-y-2">
              {project.whitepapers.map((wp, idx) => (
                <li key={idx}>
                  <a
                    href={wp.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-3 rounded-lg bg-slate-700/30 hover:bg-slate-700/50 border border-slate-600/30 hover:border-slate-500 transition-all text-sm group"
                  >
                    <FileText className="w-4 h-4 text-blue-400 flex-shrink-0" />
                    <span className="text-slate-200 group-hover:text-white transition-colors flex-1 line-clamp-2">
                      {wp.title}
                    </span>
                    <ExternalLink className="w-3.5 h-3.5 text-slate-500 flex-shrink-0" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Full page link */}
          <Link
            href={`/currency/${project.tag}`}
            onClick={onClose}
            className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl border border-blue-500/30 text-blue-400 hover:bg-blue-500/10 transition-colors text-sm font-medium"
          >
            View full page
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>
        </div>
      </motion.div>
    </>
  );
}
