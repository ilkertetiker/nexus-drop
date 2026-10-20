"use client";

import React from "react";
import Link from "next/link";
import { Gamepad2, Calendar, Newspaper, Flame, Zap } from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full bg-slate-950 border-t border-slate-800/80 pt-14 pb-10 text-slate-400">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-10 border-b border-slate-800/60">
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
              Video game news and interactive release calendar for tracking day-one drops and major patch updates.
            </p>
          </div>

          {/* Site Navigation */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-4 flex items-center gap-2">
              <Newspaper className="w-3.5 h-3.5 text-violet-400" />
              Pages
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link href="/" className="hover:text-cyan-400 transition-colors">
                  Video Game News
                </Link>
              </li>
              <li>
                <Link href="/calendar" className="hover:text-cyan-400 transition-colors">
                  Drop & Update Calendar
                </Link>
              </li>
            </ul>
          </div>

          {/* News Categories (Direct Working Filters) */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-4 flex items-center gap-2">
              <Gamepad2 className="w-3.5 h-3.5 text-cyan-400" />
              News Categories
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link href="/?category=PC" className="hover:text-cyan-400 transition-colors">
                  PC Gaming
                </Link>
              </li>
              <li>
                <Link href="/?category=PlayStation" className="hover:text-indigo-400 transition-colors">
                  PlayStation
                </Link>
              </li>
              <li>
                <Link href="/?category=Xbox" className="hover:text-emerald-400 transition-colors">
                  Xbox
                </Link>
              </li>
              <li>
                <Link href="/?category=Nintendo" className="hover:text-rose-400 transition-colors">
                  Nintendo
                </Link>
              </li>
              <li>
                <Link href="/?category=Hardware" className="hover:text-fuchsia-400 transition-colors">
                  Hardware & GPUs
                </Link>
              </li>
            </ul>
          </div>

          {/* Release Schedule Filters */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-4 flex items-center gap-2">
              <Calendar className="w-3.5 h-3.5 text-emerald-400" />
              Release Schedule
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link href="/calendar?type=drop" className="hover:text-emerald-400 transition-colors flex items-center gap-1.5">
                  <Flame className="w-3 h-3 text-emerald-400" />
                  <span>New Game Drops</span>
                </Link>
              </li>
              <li>
                <Link href="/calendar?type=update" className="hover:text-cyan-400 transition-colors flex items-center gap-1.5">
                  <Zap className="w-3 h-3 text-cyan-400" />
                  <span>Major Patches & DLC</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-6 flex flex-col md:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© 2026 NEXUS DROP. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
