"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { AnimatePresence } from "framer-motion";
import { CBDCProject } from "@/data/cbdcData";
import { CBDCGrid } from "@/components/CBDCGrid";
import { CurrenciesTable } from "@/components/CurrenciesTable";
import { DeepDiveDrawer } from "@/components/DeepDiveDrawer";
import { LearningInfographic } from "@/components/LearningInfographic";
import { FilterPanel } from "@/components/FilterPanel";
import { CoverageScope } from "@/components/CoverageScope";
import { useFilters } from "@/hooks/useFilters";

const CBDCMap = dynamic(() => import("@/components/CBDCMap"), { ssr: false });

export default function Dashboard() {
  const [selectedProject, setSelectedProject] = useState<CBDCProject | null>(null);
  const {
    filters,
    filteredProjects,
    toggleStage,
    setTypeFilter,
    setRegion,
    setSearch,
    clearFilters,
    allTypes,
    regions,
  } = useFilters();

  return (
    <div className="min-h-screen dark:bg-[#0f172a] bg-slate-100 dark:bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.15),rgba(255,255,255,0))] bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(99,102,241,0.06),rgba(255,255,255,0))] dark:text-slate-50 text-slate-900 selection:bg-purple-500/30 font-sans transition-colors duration-200">
      <main className="max-w-7xl mx-auto px-4 md:px-8 py-8 md:py-10">
        <LearningInfographic />

        <CoverageScope />

        <div className="mb-4 pl-1">
          <h2 className="text-2xl font-bold mb-1 text-white">Global Projects</h2>
          <p className="text-slate-400 text-sm">
            Select a country to explore its CBDC architecture, tech stack, and whitepapers.
          </p>
        </div>

        <FilterPanel
          filters={filters}
          regions={regions}
          allTypes={allTypes}
          onToggleStage={toggleStage}
          onSetType={setTypeFilter}
          onSetRegion={setRegion}
          onSetSearch={setSearch}
          onClear={clearFilters}
          resultCount={filteredProjects.length}
        />

        <CBDCMap
          onSelect={setSelectedProject}
          activeStages={filters.stages}
          onToggleStage={toggleStage}
        />

        <CBDCGrid projects={filteredProjects} onSelect={setSelectedProject} />

        <CurrenciesTable projects={filteredProjects} onSelect={setSelectedProject} />
      </main>

      <AnimatePresence>
        {selectedProject && (
          <DeepDiveDrawer
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
