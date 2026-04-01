import { notFound } from "next/navigation";
import { cbdcProjects } from "@/data/cbdcData";
import { CurrencyDetailClient } from "./CurrencyDetailClient";

export async function generateStaticParams() {
  return cbdcProjects.map((p) => ({ tag: p.tag }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ tag: string }>;
}) {
  const { tag } = await params;
  const project = cbdcProjects.find((p) => p.tag === tag);
  if (!project) return {};
  return {
    title: `${project.currencyName} · Global CBDC Tracker`,
    description: project.description.slice(0, 160),
  };
}

export default async function CurrencyPage({
  params,
}: {
  params: Promise<{ tag: string }>;
}) {
  const { tag } = await params;
  const project = cbdcProjects.find((p) => p.tag === tag);
  if (!project) notFound();
  return <CurrencyDetailClient project={project} />;
}
