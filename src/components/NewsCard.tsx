"use client";

import React from "react";
import { NewsArticle } from "@/data/newsData";
import { Clock, Eye, MessageSquare, Bookmark, ArrowUpRight, Flame } from "lucide-react";

interface NewsCardProps {
  article: NewsArticle;
  onRead: (article: NewsArticle) => void;
  isBookmarked: boolean;
  onToggleBookmark: (id: string) => void;
}

export default function NewsCard({
  article,
  onRead,
  isBookmarked,
  onToggleBookmark
}: NewsCardProps) {
  const categoryColors: Record<string, string> = {
    PC: "from-blue-600/30 to-cyan-500/30 text-cyan-300 border-cyan-500/40",
    PlayStation: "from-indigo-600/30 to-blue-500/30 text-indigo-300 border-indigo-500/40",
    Xbox: "from-emerald-600/30 to-green-500/30 text-emerald-300 border-emerald-500/40",
    Nintendo: "from-rose-600/30 to-red-500/30 text-rose-300 border-rose-500/40",
    Esports: "from-amber-600/30 to-yellow-500/30 text-amber-300 border-amber-500/40",
    Hardware: "from-purple-600/30 to-fuchsia-500/30 text-fuchsia-300 border-fuchsia-500/40",
    Industry: "from-slate-600/30 to-slate-500/30 text-slate-300 border-slate-500/40"
  };

  const badgeStyle = categoryColors[article.category] || categoryColors.PC;

  return (
    <div
      onClick={() => onRead(article)}
      className="group relative flex flex-col bg-slate-900/90 hover:bg-slate-850 border border-slate-800/80 hover:border-slate-700 rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-cyan-950/20"
    >
      {/* Thumbnail */}
      <div className="relative w-full h-48 overflow-hidden bg-slate-950">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={article.coverImage}
          alt={article.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />

        {/* Category Badge */}
        <div className="absolute top-3 left-3 flex items-center gap-1.5">
          <span
            className={`text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-gradient-to-r border backdrop-blur-md shadow ${badgeStyle}`}
          >
            {article.category}
          </span>
          {article.trending && (
            <span className="flex items-center gap-1 text-[11px] font-bold text-amber-300 bg-amber-500/20 border border-amber-500/30 px-2 py-0.5 rounded-full backdrop-blur-md">
              <Flame className="w-3 h-3 text-amber-400" />
              Hot
            </span>
          )}
        </div>

        {/* Bookmark quick button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleBookmark(article.id);
          }}
          className={`absolute top-3 right-3 p-1.5 rounded-lg backdrop-blur-md border transition-all ${
            isBookmarked
              ? "bg-amber-500/30 border-amber-400 text-amber-300"
              : "bg-slate-900/60 border-slate-700/60 text-slate-400 hover:text-white hover:bg-slate-900"
          }`}
          aria-label="Bookmark"
        >
          <Bookmark className="w-4 h-4 fill-current" />
        </button>

        {/* Read Time */}
        <div className="absolute bottom-2.5 right-3 text-[11px] text-slate-300 flex items-center gap-1 backdrop-blur-sm bg-black/40 px-2 py-0.5 rounded">
          <Clock className="w-3 h-3 text-cyan-400" />
          {article.readTime}
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <span>{article.publishedAt}</span>
            <span>•</span>
            <span className="text-slate-300 font-medium">{article.author.name}</span>
          </div>

          <h3 className="text-base font-bold text-white group-hover:text-cyan-300 transition-colors line-clamp-2 leading-snug">
            {article.title}
          </h3>

          <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
            {article.excerpt}
          </p>
        </div>

        {/* Footer info */}
        <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1">
              <Eye className="w-3.5 h-3.5 text-slate-500" />
              {article.views.toLocaleString()}
            </span>
            <span className="flex items-center gap-1">
              <MessageSquare className="w-3.5 h-3.5 text-slate-500" />
              {article.commentsCount}
            </span>
          </div>

          <span className="inline-flex items-center gap-1 text-cyan-400 font-semibold group-hover:translate-x-0.5 transition-transform">
            Read story <ArrowUpRight className="w-3.5 h-3.5" />
          </span>
        </div>
      </div>
    </div>
  );
}
