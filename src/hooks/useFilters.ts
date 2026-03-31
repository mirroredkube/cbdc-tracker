"use client";

import { useState, useCallback, useMemo } from "react";
import { cbdcProjects, CBDCProject, Stage, Type } from "@/data/cbdcData";

export interface Filters {
  stages: Set<Stage>;
  types: Set<Type | "All">;
  region: string;
  searchQuery: string;
}

const ALL_STAGES: Stage[] = ["Launched", "Pilot", "Proof of Concept", "Research", "Cancelled"];
const ALL_TYPES: Type[] = ["Retail", "Wholesale", "Both"];

function defaultFilters(): Filters {
  return {
    stages: new Set(ALL_STAGES),
    types: new Set(["All"] as (Type | "All")[]),
    region: "All",
    searchQuery: "",
  };
}

export function useFilters() {
  const [filters, setFilters] = useState<Filters>(defaultFilters);

  const toggleStage = useCallback((stage: Stage) => {
    setFilters((prev) => {
      const next = new Set(prev.stages);
      if (next.has(stage)) {
        if (next.size === 1) return prev; // keep at least one
        next.delete(stage);
      } else {
        next.add(stage);
      }
      return { ...prev, stages: next };
    });
  }, []);

  const setTypeFilter = useCallback((type: Type | "All") => {
    setFilters((prev) => ({ ...prev, types: new Set([type]) }));
  }, []);

  const setRegion = useCallback((region: string) => {
    setFilters((prev) => ({ ...prev, region }));
  }, []);

  const setSearch = useCallback((q: string) => {
    setFilters((prev) => ({ ...prev, searchQuery: q }));
  }, []);

  const clearFilters = useCallback(() => setFilters(defaultFilters()), []);

  const filteredProjects = useMemo<CBDCProject[]>(() => {
    return cbdcProjects.filter((p) => {
      if (!filters.stages.has(p.stage)) return false;
      if (!filters.types.has("All") && !filters.types.has(p.type)) return false;
      if (filters.region !== "All" && p.region !== filters.region) return false;
      if (filters.searchQuery) {
        const q = filters.searchQuery.toLowerCase();
        if (
          !p.country.toLowerCase().includes(q) &&
          !p.currencyName.toLowerCase().includes(q) &&
          !(p.technologyProvider?.toLowerCase().includes(q))
        )
          return false;
      }
      return true;
    });
  }, [filters]);

  const regions = useMemo(
    () => ["All", ...Array.from(new Set(cbdcProjects.map((p) => p.region))).sort()],
    []
  );

  return {
    filters,
    filteredProjects,
    toggleStage,
    setTypeFilter,
    setRegion,
    setSearch,
    clearFilters,
    allStages: ALL_STAGES,
    allTypes: ALL_TYPES,
    regions,
  };
}
