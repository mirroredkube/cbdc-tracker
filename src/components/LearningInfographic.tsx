import { Users, Building2, ShieldCheck, Zap } from "lucide-react";

export function LearningInfographic() {
  return (
    <div className="glass-panel p-6 rounded-2xl mb-12">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-white mb-2 flex items-center gap-2">
          <Zap className="w-6 h-6 text-yellow-500" />
          CBDC Fundamentals
        </h2>
        <p className="text-slate-400 text-sm">Understanding the architectural differences between Retail and Wholesale Central Bank Digital Currencies.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-slate-800/50 rounded-xl p-5 border border-purple-500/20 hover:border-purple-500/40 transition-colors shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-purple-500/20 rounded-lg text-purple-400">
              <Users className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-purple-100">Retail CBDC (rCBDC)</h3>
          </div>
          <ul className="space-y-3 text-sm text-slate-300">
            <li className="flex items-start gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
              <span>Available to the general public and essential businesses for daily transactions.</span>
            </li>
            <li className="flex items-start gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
              <span>Acts as a digital replacement for physical cash.</span>
            </li>
            <li className="flex items-start gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
              <span>Focuses on high volume, low value payments.</span>
            </li>
          </ul>
        </div>

        <div className="bg-slate-800/50 rounded-xl p-5 border border-orange-500/20 hover:border-orange-500/40 transition-colors shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-orange-500/20 rounded-lg text-orange-400">
              <Building2 className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-orange-100">Wholesale CBDC (wCBDC)</h3>
          </div>
          <ul className="space-y-3 text-sm text-slate-300">
            <li className="flex items-start gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
              <span>Restricted to commercial banks and clearing houses.</span>
            </li>
            <li className="flex items-start gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
              <span>Used for interbank settlements and cross-border transactions.</span>
            </li>
            <li className="flex items-start gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
              <span>Focuses on low volume, extremely high value secure transfers.</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
