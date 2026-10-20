"use client";

import React from "react";
import Link from "next/link";
import { Gamepad2, Code2, ExternalLink, Calendar, Newspaper, Rss, Heart, Sparkles } from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full bg-slate-950 border-t border-slate-800/80 pt-16 pb-12 text-slate-400">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-slate-800/60">
          {/* Brand Col */}
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-violet-600 to-cyan-500 p-[1.5px]">
                <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                  <Gamepad2 className="w-4 h-4 text-cyan-400" />
                </div>
              </div>
              <span className="font-black text-lg tracking-tight text-white">
                NEXUS <span className="text-cyan-400">DROP</span>
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              The high-velocity video game news portal and interactive release calendar. Built for passionate desktop gamers tracking day-one drops and major patch updates.
            </p>
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              All systems operational • Vercel Edge Ready
            </div>
          </div>

          {/* Quick Nav Col */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-4 flex items-center gap-2">
              <Newspaper className="w-3.5 h-3.5 text-violet-400" />
              Editorial News
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link href="/" className="hover:text-cyan-400 transition-colors">
                  Breaking Scoops & Leaks
                </Link>
              </li>
              <li>
                <Link href="/" className="hover:text-cyan-400 transition-colors">
                  PC & Hardware Reviews
                </Link>
              </li>
              <li>
                <Link href="/" className="hover:text-cyan-400 transition-colors">
                  PlayStation & Xbox Exclusives
                </Link>
              </li>
              <li>
                <Link href="/" className="hover:text-cyan-400 transition-colors">
                  Esports Tournaments & Meta
                </Link>
              </li>
            </ul>
          </div>

          {/* Calendar Col */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-4 flex items-center gap-2">
              <Calendar className="w-3.5 h-3.5 text-emerald-400" />
              Release Calendar
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link href="/calendar" className="hover:text-emerald-400 transition-colors">
                  🔥 New Game Drops
                </Link>
              </li>
              <li>
                <Link href="/calendar" className="hover:text-cyan-400 transition-colors">
                  ⚡ Major Patches & Expansions
                </Link>
              </li>
              <li>
                <Link href="/calendar" className="hover:text-violet-400 transition-colors">
                  🎮 Day-One Game Pass Releases
                </Link>
              </li>
              <li>
                <Link href="/calendar" className="hover:text-amber-400 transition-colors">
                  📅 Export to Google / Apple Calendar (.ics)
                </Link>
              </li>
            </ul>
          </div>

          {/* Deployment & Info Col */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-4 flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              Deployment & Stack
            </h4>
            <p className="text-xs text-slate-400">
              Configured for automated continuous deployment via GitHub Actions & Vercel.
            </p>
            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs space-y-1.5">
              <div className="flex justify-between items-center text-slate-300">
                <span>Framework</span>
                <span className="font-semibold text-white">Next.js 16 (App Router)</span>
              </div>
              <div className="flex justify-between items-center text-slate-300">
                <span>Styling</span>
                <span className="font-semibold text-cyan-400">Tailwind CSS v4</span>
              </div>
              <div className="flex justify-between items-center text-slate-300">
                <span>Hosting</span>
                <span className="font-semibold text-violet-400">Vercel Edge</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© 2026 NEXUS DROP. Built with Next.js & Tailwind CSS.</p>
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5 text-slate-400">
              Desktop Optimized Experience
            </span>
            <span className="text-slate-700">•</span>
            <span className="flex items-center gap-1 text-slate-400">
              GitHub & Vercel Ready
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
