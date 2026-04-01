import { Users, Building2, ShieldCheck, Zap, ArrowRight, XCircle } from "lucide-react";
import { STAGE_COLORS } from "@/components/CBDCMap";

const STAGES = [
  { label: "Research", color: STAGE_COLORS["Research"], desc: "Conceptual study & policy design" },
  { label: "Proof of Concept", color: STAGE_COLORS["Proof of Concept"], desc: "Technical experiments, limited scope" },
  { label: "Pilot", color: STAGE_COLORS["Pilot"], desc: "Controlled rollout with real users" },
  { label: "Launched", color: STAGE_COLORS["Launched"], desc: "Live national or multi-country deployment" },
];

export function LearningInfographic() {
  return (
    <div className="glass-panel p-6 rounded-2xl mb-10 space-y-8">
      {/* Stage progression */}
      <div>
        <h2 className="text-lg font-bold text-white mb-1 flex items-center gap-2">
          <Zap className="w-5 h-5 text-yellow-400" />
          CBDC Development Stages
        </h2>
        <p className="text-slate-400 text-xs mb-4">
          How a Central Bank Digital Currency progresses from idea to national launch.
        </p>
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 overflow-x-auto pb-2">
          {STAGES.map((stage, i) => (
            <div key={stage.label} className="flex items-center gap-2 flex-shrink-0">
              <div className="flex flex-col items-center sm:items-start gap-1">
                <div
                  className="flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold border"
                  style={{
                    color: stage.color,
                    backgroundColor: `${stage.color}18`,
                    borderColor: `${stage.color}40`,
                  }}
                >
                  <span
                    className="w-2 h-2 rounded-full flex-shrink-0"
                    style={{ backgroundColor: stage.color }}
                  />
                  {stage.label}
                </div>
                <p className="text-[10px] text-slate-500 max-w-[120px] leading-tight hidden sm:block">
                  {stage.desc}
                </p>
              </div>
              {i < STAGES.length - 1 && (
                <ArrowRight className="w-4 h-4 text-slate-600 flex-shrink-0 mx-1" />
              )}
            </div>
          ))}
          {/* Cancelled branch */}
          <div className="flex items-center gap-2 ml-0 sm:ml-4 flex-shrink-0">
            <span className="text-slate-600 text-xs hidden sm:block">or</span>
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border"
              style={{
                color: STAGE_COLORS["Cancelled"],
                backgroundColor: `${STAGE_COLORS["Cancelled"]}18`,
                borderColor: `${STAGE_COLORS["Cancelled"]}40`,
              }}
            >
              <XCircle className="w-3 h-3" />
              Cancelled
            </div>
          </div>
        </div>
      </div>

      {/* Retail vs Wholesale */}
      <div>
        <h2 className="text-lg font-bold text-white mb-3">Retail vs Wholesale</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-slate-800/50 rounded-xl p-4 border border-purple-500/20 hover:border-purple-500/40 transition-colors">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-purple-500/20 rounded-lg text-purple-400">
                <Users className="w-4 h-4" />
              </div>
              <h3 className="font-bold text-purple-100">Retail CBDC (rCBDC)</h3>
            </div>
            <ul className="space-y-2 text-sm text-slate-300">
              <li className="flex items-start gap-2">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 mt-0.5 flex-shrink-0" />
                Available to the general public and businesses for daily transactions.
              </li>
              <li className="flex items-start gap-2">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 mt-0.5 flex-shrink-0" />
                Acts as a digital replacement for physical cash.
              </li>
              <li className="flex items-start gap-2">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 mt-0.5 flex-shrink-0" />
                High volume, low value payments.
              </li>
            </ul>
          </div>

          <div className="bg-slate-800/50 rounded-xl p-4 border border-orange-500/20 hover:border-orange-500/40 transition-colors">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-orange-500/20 rounded-lg text-orange-400">
                <Building2 className="w-4 h-4" />
              </div>
              <h3 className="font-bold text-orange-100">Wholesale CBDC (wCBDC)</h3>
            </div>
            <ul className="space-y-2 text-sm text-slate-300">
              <li className="flex items-start gap-2">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 mt-0.5 flex-shrink-0" />
                Restricted to commercial banks and clearing houses.
              </li>
              <li className="flex items-start gap-2">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 mt-0.5 flex-shrink-0" />
                Used for interbank settlements and cross-border transactions.
              </li>
              <li className="flex items-start gap-2">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 mt-0.5 flex-shrink-0" />
                Low volume, extremely high value secure transfers.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
