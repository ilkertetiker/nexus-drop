"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { 
  Star, 
  X, 
  Calendar, 
  Newspaper, 
  ArrowRight, 
  Trash2, 
  Gamepad2,
  Sparkles,
  Flame,
  Zap
} from "lucide-react";
import { FavoriteGame, getFavoriteGames, toggleFavoriteGame } from "@/utils/favorites";

const QUICK_SUGGESTIONS: FavoriteGame[] = [
  {
    title: "Ghost of Yōtei",
    releaseDate: "2026-10-20",
    type: "drop",
    coverImage: "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=600&q=80",
  },
  {
    title: "Grand Theft Auto VI",
    releaseDate: "Fall 2026",
    type: "drop",
    coverImage: "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: "Elden Ring",
    releaseDate: "Patch 1.14 Live",
    type: "update",
    coverImage: "https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: "Metroid Prime 4: Beyond",
    releaseDate: "2026-10-25",
    type: "drop",
    coverImage: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=600&q=80",
  },
];

export default function FavoritesPopover() {
  const [isOpen, setIsOpen] = useState(false);
  const [favorites, setFavorites] = useState<FavoriteGame[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  const loadFavorites = () => {
    setFavorites(getFavoriteGames());
  };

  useEffect(() => {
    loadFavorites();
    const handleUpdate = () => loadFavorites();
    window.addEventListener("nexus_favorites_updated", handleUpdate);
    window.addEventListener("storage", handleUpdate);
    return () => {
      window.removeEventListener("nexus_favorites_updated", handleUpdate);
      window.removeEventListener("storage", handleUpdate);
    };
  }, []);

  // Close when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const handleRemove = (game: FavoriteGame, e: React.MouseEvent) => {
    e.stopPropagation();
    toggleFavoriteGame(game);
  };

  return (
    <div className="relative" ref={containerRef}>
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-bold transition-all border ${
          favorites.length > 0
            ? "bg-amber-500/15 border-amber-500/40 text-amber-300 hover:bg-amber-500/25 shadow-sm shadow-amber-950/30"
            : "bg-slate-900 hover:bg-slate-800 border-slate-800 text-slate-300 hover:text-white"
        }`}
        title="Followed Games & Updates"
      >
        <Star
          className={`w-3.5 h-3.5 ${
            favorites.length > 0 ? "text-amber-400 fill-amber-400" : "text-slate-400"
          }`}
        />
        <span>Followed Games</span>
        {favorites.length > 0 && (
          <span className="text-[10px] font-black px-1.5 py-0.2 rounded-full bg-amber-400 text-slate-950">
            {favorites.length}
          </span>
        )}
      </button>

      {/* Popover Card */}
      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-80 sm:w-96 bg-slate-900/98 backdrop-blur-2xl border border-slate-700/80 rounded-2xl shadow-2xl shadow-black z-50 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-150">
          {/* Header */}
          <div className="p-4 bg-slate-950/90 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
              <h3 className="text-xs font-black uppercase tracking-wider text-white">
                Followed Games Radar
              </h3>
              <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-slate-800 text-slate-300">
                {favorites.length} Tracked
              </span>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Body */}
          <div className="max-h-80 overflow-y-auto p-3 space-y-2">
            {favorites.length > 0 ? (
              favorites.map((fav) => (
                <div
                  key={fav.title}
                  className="group relative p-2.5 rounded-xl bg-slate-950/80 border border-slate-800/90 hover:border-slate-700 transition-all flex items-center justify-between gap-3"
                >
                  <div className="flex items-center gap-3 overflow-hidden">
                    {fav.coverImage ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={fav.coverImage}
                        alt={fav.title}
                        className="w-10 h-10 rounded-lg object-cover border border-slate-800 shrink-0"
                      />
                    ) : (
                      <div className="w-10 h-10 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center shrink-0">
                        <Gamepad2 className="w-4 h-4 text-cyan-400" />
                      </div>
                    )}

                    <div className="overflow-hidden">
                      <h4 className="text-xs font-bold text-white truncate group-hover:text-amber-300 transition-colors">
                        {fav.title}
                      </h4>
                      {fav.releaseDate && (
                        <p className="text-[10px] text-slate-400 flex items-center gap-1">
                          {fav.type === "drop" ? (
                            <Flame className="w-2.5 h-2.5 text-emerald-400" />
                          ) : (
                            <Zap className="w-2.5 h-2.5 text-cyan-400" />
                          )}
                          <span>{fav.releaseDate}</span>
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Actions for this game: Jump to News or Calendar */}
                  <div className="flex items-center gap-1 shrink-0">
                    <Link
                      href={`/?search=${encodeURIComponent(fav.title)}`}
                      onClick={() => setIsOpen(false)}
                      className="p-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-cyan-400 transition-colors"
                      title="See news about this game"
                    >
                      <Newspaper className="w-3.5 h-3.5" />
                    </Link>

                    <Link
                      href={`/calendar?search=${encodeURIComponent(fav.title)}`}
                      onClick={() => setIsOpen(false)}
                      className="p-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-emerald-400 transition-colors"
                      title="View release in calendar"
                    >
                      <Calendar className="w-3.5 h-3.5" />
                    </Link>

                    <button
                      onClick={(e) => handleRemove(fav, e)}
                      className="p-1.5 rounded-lg bg-slate-900 hover:bg-rose-950/50 text-slate-400 hover:text-rose-400 transition-colors"
                      title="Unfollow game"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-4 text-center space-y-3">
                <div className="w-10 h-10 rounded-full bg-slate-950 border border-slate-800 mx-auto flex items-center justify-center text-amber-400">
                  <Star className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-bold text-white">No games followed yet</p>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    Click the ⭐ star on any game card in the calendar or news to track its drops and news!
                  </p>
                </div>

                {/* Quick suggestions to follow */}
                <div className="pt-2 text-left">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block mb-1.5">
                    Popular to track:
                  </span>
                  <div className="space-y-1.5">
                    {QUICK_SUGGESTIONS.map((sug) => (
                      <div
                        key={sug.title}
                        onClick={() => toggleFavoriteGame(sug)}
                        className="flex items-center justify-between p-1.5 rounded-lg hover:bg-slate-950 transition-colors cursor-pointer text-xs group"
                      >
                        <span className="text-slate-300 font-medium group-hover:text-white truncate">
                          {sug.title}
                        </span>
                        <span className="text-[10px] text-amber-400 font-bold flex items-center gap-1 shrink-0">
                          <Star className="w-3 h-3" /> Follow
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Footer of popover */}
          {favorites.length > 0 && (
            <div className="p-3 bg-slate-950/80 border-t border-slate-800 flex items-center justify-between text-[11px]">
              <Link
                href="/?favorites=true"
                onClick={() => setIsOpen(false)}
                className="text-cyan-400 hover:underline flex items-center gap-1 font-semibold"
              >
                <span>Filter News to Followed</span>
                <ArrowRight className="w-3 h-3" />
              </Link>

              <Link
                href="/calendar?favorites=true"
                onClick={() => setIsOpen(false)}
                className="text-emerald-400 hover:underline flex items-center gap-1 font-semibold"
              >
                <span>Calendar Filter</span>
                <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
