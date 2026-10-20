"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  Gamepad2, 
  CalendarDays, 
  Newspaper, 
  Flame, 
  Sparkles
} from "lucide-react";
import FavoritesPopover from "@/components/FavoritesPopover";

export default function Navbar() {
  const pathname = usePathname();

  const navLinks = [
    {
      name: "Video Game News",
      href: "/",
      icon: Newspaper,
      description: "Breaking scoops, patches & hardware"
    },
    {
      name: "Drop & Update Calendar",
      href: "/calendar",
      icon: CalendarDays,
      badge: "Interactive",
      description: "New drops vs. major updates"
    }
  ];

  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-xl bg-slate-950/85 border-b border-slate-800/80 shadow-2xl shadow-black/40">
      {/* Top Desktop Ticker without Vercel/Desktop text */}
      <div className="bg-gradient-to-r from-violet-950/60 via-slate-900/90 to-cyan-950/60 border-b border-slate-800/50 py-1.5 px-6 text-xs text-slate-300">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3 overflow-hidden">
            <span className="flex items-center gap-1.5 text-emerald-400 font-semibold uppercase tracking-wider text-[11px] bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20 shrink-0">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              Live Radar
            </span>
            <div className="flex items-center gap-6 text-slate-300 text-xs overflow-hidden whitespace-nowrap">
              <span className="inline-flex items-center gap-1.5">
                <Flame className="w-3.5 h-3.5 text-amber-400" />
                <strong className="text-white">Ghost of Yōtei</strong> launches today worldwide on PS5 & PC!
              </span>
              <span className="text-slate-600">•</span>
              <span className="inline-flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-violet-400" />
                Helldivers 2 Patch 2.4.0 Automaton Siege now live
              </span>
              <span className="text-slate-600">•</span>
              <span className="inline-flex items-center gap-1.5 text-slate-400">
                Next-Gen Switch 2 backwards compatibility officially confirmed
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-6 h-18 flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-violet-600 via-indigo-600 to-cyan-400 p-[1.5px] shadow-lg shadow-violet-600/30 group-hover:shadow-violet-500/50 transition-all duration-300">
            <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
              <Gamepad2 className="w-5 h-5 text-cyan-400 group-hover:rotate-12 transition-transform duration-300" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-black text-xl tracking-tight bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
                NEXUS
              </span>
              <span className="font-extrabold text-xl tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-cyan-400">
                DROP
              </span>
              <span className="text-[10px] uppercase font-bold tracking-widest px-1.5 py-0.5 rounded bg-violet-950 text-violet-300 border border-violet-800/60 ml-1">
                v2.6
              </span>
            </div>
            <p className="text-[10px] text-slate-400 tracking-wider uppercase font-medium">
              Gaming News & Release Radar
            </p>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="flex items-center gap-2">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href;

            return (
              <Link
                key={link.href}
                href={link.href}
                className={`relative px-4 py-2 rounded-xl flex items-center gap-2.5 text-sm font-semibold transition-all duration-200 ${
                  isActive
                    ? "bg-slate-800 text-white shadow-inner border border-slate-700/80"
                    : "text-slate-300 hover:text-white hover:bg-slate-900 border border-transparent"
                }`}
              >
                <Icon
                  className={`w-4 h-4 transition-colors ${
                    isActive ? "text-cyan-400" : "text-slate-400 group-hover:text-slate-200"
                  }`}
                />
                <span>{link.name}</span>
                {link.badge && (
                  <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 text-emerald-300 border border-emerald-500/30">
                    {link.badge}
                  </span>
                )}
                {isActive && (
                  <span className="absolute bottom-0 left-4 right-4 h-0.5 bg-gradient-to-r from-violet-500 via-cyan-400 to-emerald-400 rounded-full" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Right Actions: Followed Games Popover (Removed 'Browse Drop Calendar') */}
        <div className="flex items-center gap-3">
          <FavoritesPopover />
        </div>
      </div>
    </header>
  );
}
