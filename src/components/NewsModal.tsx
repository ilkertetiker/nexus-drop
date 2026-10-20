"use client";

import React, { useState } from "react";
import { NewsArticle } from "@/data/newsData";
import { 
  X, 
  Calendar, 
  Clock, 
  Eye, 
  Share2, 
  Bookmark, 
  Check, 
  MessageSquare, 
  ExternalLink,
  ThumbsUp,
  Tag
} from "lucide-react";

interface NewsModalProps {
  article: NewsArticle | null;
  onClose: () => void;
  isBookmarked: boolean;
  onToggleBookmark: (id: string) => void;
}

export default function NewsModal({
  article,
  onClose,
  isBookmarked,
  onToggleBookmark
}: NewsModalProps) {
  const [copied, setCopied] = useState(false);
  const [likes, setLikes] = useState(142);
  const [hasLiked, setHasLiked] = useState(false);

  if (!article) return null;

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleLike = () => {
    if (!hasLiked) {
      setLikes((prev) => prev + 1);
      setHasLiked(true);
    } else {
      setLikes((prev) => prev - 1);
      setHasLiked(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-4xl max-h-[90vh] bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl shadow-black overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header bar with actions */}
        <div className="flex items-center justify-between px-6 py-4 bg-slate-950/80 border-b border-slate-800 shrink-0">
          <div className="flex items-center gap-2.5">
            <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded bg-violet-500/20 text-violet-300 border border-violet-500/30">
              {article.category}
            </span>
            <span className="text-xs text-slate-400 flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              {article.readTime}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onToggleBookmark(article.id)}
              className={`p-2 rounded-lg text-xs font-medium border transition-colors flex items-center gap-1.5 ${
                isBookmarked 
                  ? "bg-amber-500/20 border-amber-500/40 text-amber-300" 
                  : "bg-slate-800 border-slate-700 text-slate-300 hover:text-white"
              }`}
              title={isBookmarked ? "Remove Bookmark" : "Save Article"}
            >
              <Bookmark className="w-4 h-4 fill-current" />
              <span className="hidden sm:inline">{isBookmarked ? "Saved" : "Save"}</span>
            </button>

            <button
              onClick={handleShare}
              className="p-2 rounded-lg bg-slate-800 border border-slate-700 text-slate-300 hover:text-white transition-colors flex items-center gap-1.5 text-xs"
              title="Share article"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Share2 className="w-4 h-4" />}
              <span className="hidden sm:inline">{copied ? "Copied!" : "Share"}</span>
            </button>

            <button
              onClick={onClose}
              className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
              aria-label="Close article modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Article Body */}
        <div className="overflow-y-auto p-6 md:p-8 space-y-6">
          {/* Cover Media */}
          <div className="relative w-full h-72 md:h-96 rounded-xl overflow-hidden shadow-lg border border-slate-800">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={article.coverImage}
              alt={article.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
            
            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs text-slate-300">
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-cyan-400" />
                  {article.publishedAt}
                </span>
                <span className="flex items-center gap-1">
                  <Eye className="w-3.5 h-3.5 text-violet-400" />
                  {article.views.toLocaleString()} reads
                </span>
              </div>
            </div>
          </div>

          {/* Title & Excerpt */}
          <div className="space-y-3">
            <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight leading-snug">
              {article.title}
            </h1>
            <p className="text-slate-300 text-base md:text-lg font-medium leading-relaxed italic border-l-2 border-cyan-400 pl-4 py-1">
              {article.excerpt}
            </p>
          </div>

          {/* Author Byline */}
          <div className="flex items-center justify-between py-3 border-y border-slate-800">
            <div className="flex items-center gap-3">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={article.author.avatar}
                alt={article.author.name}
                className="w-10 h-10 rounded-full border border-violet-500/40 object-cover"
              />
              <div>
                <p className="text-sm font-semibold text-white">{article.author.name}</p>
                <p className="text-xs text-slate-400">{article.author.role}</p>
              </div>
            </div>

            <button
              onClick={handleLike}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                hasLiked
                  ? "bg-rose-500/20 border-rose-500/40 text-rose-300"
                  : "bg-slate-800 border-slate-700 text-slate-300 hover:text-white"
              }`}
            >
              <ThumbsUp className="w-3.5 h-3.5" />
              <span>{likes}</span>
            </button>
          </div>

          {/* Article Full Paragraphs */}
          <div className="space-y-4 text-slate-200 text-sm md:text-base leading-relaxed">
            {article.content.map((para, index) => (
              <p key={index} className="tracking-wide">
                {para}
              </p>
            ))}
          </div>

          {/* Tags */}
          <div className="pt-4 border-t border-slate-800 flex flex-wrap items-center gap-2">
            <span className="text-xs font-medium text-slate-400 flex items-center gap-1 mr-1">
              <Tag className="w-3.5 h-3.5" /> Tags:
            </span>
            {article.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs px-2.5 py-1 rounded-md bg-slate-800/80 hover:bg-slate-700 text-slate-300 border border-slate-700/50 transition-colors"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
