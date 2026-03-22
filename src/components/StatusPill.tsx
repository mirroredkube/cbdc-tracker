import clsx from "clsx";

interface PillProps {
  label: string;
  variant: "Research" | "Pilot" | "Launched" | "Cancelled" | "Retail" | "Wholesale" | "Both";
}

export function StatusPill({ label, variant }: PillProps) {
  const styles = {
    Research: "bg-blue-500/10 text-blue-400 border-blue-500/30",
    Pilot: "bg-yellow-500/10 text-yellow-400 border-yellow-500/30",
    Launched: "bg-emerald-500/10 text-emerald-400 border-emerald-500/30",
    Cancelled: "bg-red-500/10 text-red-400 border-red-500/30",
    Retail: "bg-purple-500/10 text-purple-400 border-purple-500/30",
    Wholesale: "bg-orange-500/10 text-orange-400 border-orange-500/30",
    Both: "bg-indigo-500/10 text-indigo-400 border-indigo-500/30",
  };

  return (
    <span 
      className={clsx(
        "px-2.5 py-1 rounded-full text-xs font-semibold tracking-wider border backdrop-blur-sm", 
        styles[variant]
      )}
    >
      {label}
    </span>
  );
}
