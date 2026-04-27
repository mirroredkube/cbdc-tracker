"use client";

import { motion } from "framer-motion";
import { ChevronRight, GitCompareArrows } from "lucide-react";
import Link from "next/link";
import type { CBDCProject } from "@/data/cbdcData";
import { FlagImage } from "./FlagImage";
import { StatusPill } from "./StatusPill";
import { WatchFlag } from "./WatchFlag";

interface Props {
  projects: CBDCProject[];
  onSelect: (project: CBDCProject) => void;
}

export function CBDCGrid({ projects, onSelect }: Props) {
  if (projects.length === 0) {
    return (
      <div className="py-20 text-center text-slate-500">
        <p className="text-lg font-medium">No projects match the current filters.</p>
        <p className="text-sm mt-1">Try adjusting your search or clearing the filters.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {projects.map((project, index) => (
        <motion.div
          key={project.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: Math.min(index * 0.05, 0.4) }}
          onClick={() => onSelect(project)}
          className="glass-panel rounded-2xl p-6 cursor-pointer dark:hover:border-slate-600/50 hover:border-slate-300 dark:hover:bg-slate-800/80 hover:bg-white/95 transition-all group flex flex-col h-full"
        >
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-xl font-bold dark:text-white text-slate-900 flex items-center gap-3">
              {project.flagUrl && (
                <FlagImage
                  src={project.flagUrl}
                  alt={`${project.country} flag`}
                  size={32}
                  className="shadow-sm border border-slate-600"
                />
              )}
              <span className="truncate">{project.country}</span>
            </h3>
            <div className="flex items-center gap-1 flex-shrink-0">
              <WatchFlag id={project.id} />
              <Link
                href={`/compare?a=${project.tag}`}
                onClick={(e) => e.stopPropagation()}
                title="Compare"
                className="p-1.5 rounded-full text-slate-500 hover:text-blue-400 hover:bg-blue-500/10 transition-colors"
              >
                <GitCompareArrows className="w-4 h-4" />
              </Link>
              <div className="p-1.5 rounded-full dark:bg-slate-800 bg-slate-100 group-hover:bg-blue-500/20 transition-colors">
                <ChevronRight className="w-5 h-5 text-slate-500 group-hover:text-blue-400 transition-colors" />
              </div>
            </div>
          </div>

          <p className="text-xs dark:text-slate-500 text-slate-400 font-mono mb-3">{project.currencyName}</p>

          <div className="flex flex-wrap gap-2 mb-4">
            <StatusPill label={project.stage} variant={project.stage} />
            <StatusPill label={project.type} variant={project.type} />
          </div>

          <p className="text-sm dark:text-slate-400 text-slate-500 line-clamp-3 mt-auto leading-relaxed">
            {project.description}
          </p>
        </motion.div>
      ))}
    </div>
  );
}
