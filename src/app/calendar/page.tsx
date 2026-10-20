import React from "react";
import CalendarView from "@/components/CalendarView";
import { Gamepad2, Flame, Zap, ShieldCheck, Sparkles, Trophy } from "lucide-react";

export const metadata = {
  title: "Gaming Release & Patch Calendar // NEXUS DROP",
  description: "Browse day-one video game drops, expansions, and major patch notes on our interactive desktop calendar.",
};

export default function CalendarPage() {
  return (
    <div className="min-h-screen pb-24 cyber-grid">
      <div className="max-w-7xl mx-auto px-6 pt-8 space-y-10">
        {/* Quick Highlights Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center shrink-0">
              <Flame className="w-5 h-5 text-emerald-400" />
            </div>
            <div>
              <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                New Game Drops
              </p>
              <p className="text-base font-black text-white">Full Worldwide Launches</p>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center shrink-0">
              <Zap className="w-5 h-5 text-cyan-400" />
            </div>
            <div>
              <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                Major Patches & DLC
              </p>
              <p className="text-base font-black text-white">Season Overhauls</p>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-violet-500/10 border border-violet-500/30 flex items-center justify-center shrink-0">
              <Sparkles className="w-5 h-5 text-violet-400" />
            </div>
            <div>
              <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                Calendar Export (.ics)
              </p>
              <p className="text-base font-black text-white">Google & Apple Sync</p>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center shrink-0">
              <Trophy className="w-5 h-5 text-amber-400" />
            </div>
            <div>
              <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                Day-One Game Pass
              </p>
              <p className="text-base font-black text-white">Verified Day-One</p>
            </div>
          </div>
        </div>

        {/* Master Interactive Calendar Component */}
        <CalendarView />
      </div>
    </div>
  );
}
