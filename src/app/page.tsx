"use client";

import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { Globe2 } from "lucide-react";
import { cbdcProjects, CBDCProject } from "@/data/cbdcData";
import { CBDCGrid } from "@/components/CBDCGrid";
import { DeepDiveDrawer } from "@/components/DeepDiveDrawer";
import { LearningInfographic } from "@/components/LearningInfographic";
import CBDCMap from "@/components/CBDCMap";

export default function Dashboard() {
  const [selectedProject, setSelectedProject] = useState<CBDCProject | null>(null);

  const handleSelect = (project: CBDCProject) => setSelectedProject(project);
  const handleClose = () => setSelectedProject(null);

  return (
    <div className="min-h-screen bg-[#0f172a] bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.15),rgba(255,255,255,0))] text-slate-50 selection:bg-purple-500/30 font-sans">
      
      {/* Header */}
      <header className="border-b border-slate-800/80 bg-slate-900/50 backdrop-blur-md sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 md:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-blue-500/10 rounded-xl border border-blue-500/20 shadow-inner">
              <Globe2 className="w-6 h-6 text-blue-400" />
            </div>
            <div>
              <h1 className="text-xl md:text-2xl font-bold tracking-tight text-white">Global CBDC Tracker</h1>
              <p className="text-[10px] md:text-xs text-slate-400 font-semibold tracking-widest mt-0.5">REAL-TIME CENTRAL BANK DIGITAL CURRENCY INSIGHTS</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 md:px-8 py-10 md:py-12">
        <LearningInfographic />
        
        <div className="mb-8 pl-1">
           <h2 className="text-2xl font-bold flex items-center gap-2 mb-2 text-white">
             Global Projects
           </h2>
           <p className="text-slate-400 text-sm">Select a specific country to explore its primary architecture phase and whitepapers.</p>
        </div>
        
        <CBDCMap onSelect={handleSelect} />

        <CBDCGrid projects={cbdcProjects} onSelect={handleSelect} />
      </main>

      {/* Deep Dive Drawer Wrapper */}
      <AnimatePresence>
        {selectedProject && (
          <DeepDiveDrawer project={selectedProject} onClose={handleClose} />
        )}
      </AnimatePresence>

    </div>
  );
}
