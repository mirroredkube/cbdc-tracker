import { cbdcProjects } from "@/data/cbdcData";
import { CompareClient } from "./CompareClient";

export const metadata = {
  title: "Compare CBDCs · Global CBDC Tracker",
  description: "Side-by-side comparison of CBDC architecture, risk profiles, and design choices",
};

const PARAM_KEYS = ["a", "b", "c", "d"] as const;

export default async function ComparePage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string>>;
}) {
  const params = await searchParams;
  const tags = PARAM_KEYS.map((k) => params[k]).filter(Boolean);
  const projects = tags
    .map((tag) => cbdcProjects.find((p) => p.tag === tag))
    .filter(Boolean) as typeof cbdcProjects;

  return <CompareClient initialProjects={projects} allProjects={cbdcProjects} />;
}
