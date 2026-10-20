"use client";

import React, { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import { 
  NEWS_ARTICLES, 
  NewsArticle, 
  TRENDING_TOPICS 
} from "@/data/newsData";
import { GAME_RELEASES } from "@/data/releasesData";
import NewsCard from "@/components/NewsCard";
import NewsModal from "@/components/NewsModal";
import { 
  Flame, 
  Search, 
  SlidersHorizontal, 
  CalendarDays, 
  TrendingUp, 
  ArrowRight, 
  Vote, 
  BookmarkCheck,
  Star,
  Gamepad2,
  Sparkles
} from "lucide-react";
import { getFavoriteGames, toggleFavoriteGame, FavoriteGame } from "@/utils/favorites";

const POPULAR_SUGGESTIONS: FavoriteGame[] = [
  {
    title: "Grand Theft Auto VI",
    releaseDate: "Fall 2026",
    type: "drop",
    coverImage: "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: "Ghost of Yōtei",
    releaseDate: "2026-10-20",
    type: "drop",
    coverImage: "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=600&q=80",
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

export default function GamingNewsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [sortBy, setSortBy] = useState<"latest" | "popular" | "trending">("latest");
  const [activeArticle, setActiveArticle] = useState<NewsArticle | null>(null);
  const [bookmarkedIds, setBookmarkedIds] = useState<string[]>([]);
  const [followedOnly, setFollowedOnly] = useState<boolean>(false);
  const [followedTitles, setFollowedTitles] = useState<string[]>([]);

  // Community Poll state
  const [pollVoted, setPollVoted] = useState<number | null>(null);
  const [pollVotes, setPollVotes] = useState<number[]>([1420, 980, 2350, 410]);

  const pollOptions = [
    { title: "Ghost of Yōtei (PS5/PC)", count: pollVotes[0] },
    { title: "Metroid Prime 4: Beyond", count: pollVotes[1] },
    { title: "Grand Theft Auto VI", count: pollVotes[2] },
    { title: "DOOM: The Dark Ages", count: pollVotes[3] },
  ];

  const totalPollVotes = pollVotes.reduce((a, b) => a + b, 0);

  // Sync bookmarks with localStorage
  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem("nexus_saved_items") || "[]");
      setBookmarkedIds(saved);
    } catch {
      setBookmarkedIds([]);
    }
  }, []);

  // Sync followed games
  const refreshFollowed = () => {
    const favs = getFavoriteGames();
    setFollowedTitles(favs.map((f) => f.title.toLowerCase().trim()));
  };

  useEffect(() => {
    refreshFollowed();
    window.addEventListener("nexus_favorites_updated", refreshFollowed);
    window.addEventListener("storage", refreshFollowed);
    return () => {
      window.removeEventListener("nexus_favorites_updated", refreshFollowed);
      window.removeEventListener("storage", refreshFollowed);
    };
  }, []);

  // Parse URL query params
  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const cat = params.get("category");
      if (cat) {
        setSelectedCategory(cat);
      }
      const q = params.get("search");
      if (q) {
        setSearchQuery(q);
      }
      const favs = params.get("favorites");
      if (favs === "true") {
        setFollowedOnly(true);
      }
    }
  }, []);

  const handleToggleBookmark = (id: string) => {
    let updated: string[];
    if (bookmarkedIds.includes(id)) {
      updated = bookmarkedIds.filter((item) => item !== id);
    } else {
      updated = [...bookmarkedIds, id];
    }
    setBookmarkedIds(updated);
    localStorage.setItem("nexus_saved_items", JSON.stringify(updated));
    window.dispatchEvent(new Event("nexus_saved_updated"));
  };

  const handleVote = (index: number) => {
    if (pollVoted !== null) return;
    setPollVoted(index);
    setPollVotes((prev) => {
      const copy = [...prev];
      copy[index] += 1;
      return copy;
    });
  };

  const categories = [
    "All",
    "PC",
    "PlayStation",
    "Xbox",
    "Nintendo",
    "Esports",
    "Hardware"
  ];

  const isArticleAboutFollowedGame = (article: NewsArticle) => {
    if (followedTitles.length === 0) return false;
    const textToSearch = `${article.title} ${article.excerpt} ${article.tags.join(" ")}`.toLowerCase();
    return followedTitles.some((t) => textToSearch.includes(t) || t.split(" ").some((word) => word.length > 3 && textToSearch.includes(word)));
  };

  // Filter & Sort Articles
  const filteredArticles = useMemo(() => {
    return NEWS_ARTICLES.filter((article) => {
      // Followed games news filter
      if (followedOnly && !isArticleAboutFollowedGame(article)) {
        return false;
      }
      if (selectedCategory !== "All" && article.category !== selectedCategory) {
        return false;
      }
      if (searchQuery.trim() !== "") {
        const query = searchQuery.toLowerCase();
        const matchesTitle = article.title.toLowerCase().includes(query);
        const matchesExcerpt = article.excerpt.toLowerCase().includes(query);
        const matchesTag = article.tags.some((t) => t.toLowerCase().includes(query));
        if (!matchesTitle && !matchesExcerpt && !matchesTag) {
          return false;
        }
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === "popular") return b.views - a.views;
      if (sortBy === "trending") return b.commentsCount - a.commentsCount;
      return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
    });
  }, [selectedCategory, searchQuery, sortBy, followedOnly, followedTitles]);

  // Featured Hero Article
  const heroArticle = NEWS_ARTICLES.find((a) => a.featured) || NEWS_ARTICLES[0];

  // Nearest release for widget
  const nearestRelease = GAME_RELEASES.find((r) => r.type === "drop") || GAME_RELEASES[0];

  return (
    <div className="min-h-screen pb-20 cyber-grid">
      {/* Article Reader Modal */}
      <NewsModal
        article={activeArticle}
        onClose={() => setActiveArticle(null)}
        isBookmarked={activeArticle ? bookmarkedIds.includes(activeArticle.id) : false}
        onToggleBookmark={handleToggleBookmark}
      />

      <div className="max-w-7xl mx-auto px-6 pt-8 space-y-12">
        {/* ========================================================
            FEATURED BREAKING NEWS HERO
            ======================================================== */}
        <section className="relative rounded-3xl overflow-hidden border border-slate-800 bg-slate-900 shadow-2xl group">
          <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[440px]">
            {/* Visual media */}
            <div className="lg:col-span-7 relative h-72 lg:h-auto overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={heroArticle.coverImage}
                alt={heroArticle.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-slate-900" />
              
              <div className="absolute top-4 left-4 flex items-center gap-2">
                <span className="px-3 py-1 rounded-full text-xs font-black tracking-wider uppercase bg-rose-600 text-white shadow-lg shadow-rose-900/50 flex items-center gap-1.5 animate-pulse">
                  <Flame className="w-3.5 h-3.5 fill-current" />
                  Breaking Scoop
                </span>
                <span className="px-3 py-1 rounded-full text-xs font-bold uppercase bg-slate-900/80 backdrop-blur-md text-cyan-300 border border-cyan-500/30">
                  {heroArticle.category}
                </span>
              </div>
            </div>

            {/* Content & Action */}
            <div className="lg:col-span-5 p-6 lg:p-10 flex flex-col justify-between space-y-6 bg-slate-900/95 lg:bg-transparent">
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-xs text-slate-400">
                  <span>{heroArticle.publishedAt}</span>
                  <span>•</span>
                  <span>{heroArticle.readTime}</span>
                  <span>•</span>
                  <span className="text-cyan-400 font-semibold">{heroArticle.views.toLocaleString()} reads</span>
                </div>

                <h1 className="text-2xl lg:text-3xl font-black text-white tracking-tight leading-snug group-hover:text-cyan-300 transition-colors">
                  {heroArticle.title}
                </h1>

                <p className="text-sm text-slate-300 leading-relaxed line-clamp-3">
                  {heroArticle.excerpt}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={heroArticle.author.avatar}
                    alt={heroArticle.author.name}
                    className="w-9 h-9 rounded-full object-cover border border-violet-500/40"
                  />
                  <div>
                    <p className="text-xs font-bold text-white">{heroArticle.author.name}</p>
                    <p className="text-[11px] text-slate-400">{heroArticle.author.role}</p>
                  </div>
                </div>

                <button
                  onClick={() => setActiveArticle(heroArticle)}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold bg-gradient-to-r from-violet-600 to-cyan-600 hover:from-violet-500 hover:to-cyan-500 text-white shadow-lg shadow-violet-900/30 transition-all"
                >
                  <span>Read Full Scoop</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================
            CATEGORY FILTERS & SEARCH TOOLBAR + FOLLOWED GAMES TAB
            ======================================================== */}
        <div className="bg-slate-900/80 border border-slate-800 p-4 rounded-2xl backdrop-blur-xl flex flex-col lg:flex-row items-center justify-between gap-4">
          {/* Category Tabs + Followed Games Tab */}
          <div className="flex items-center gap-1.5 overflow-x-auto w-full lg:w-auto pb-2 lg:pb-0 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setSelectedCategory(cat);
                  setFollowedOnly(false);
                }}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                  selectedCategory === cat && !followedOnly
                    ? "bg-violet-600 text-white shadow-md shadow-violet-900/40"
                    : "text-slate-400 hover:text-white hover:bg-slate-800"
                }`}
              >
                {cat}
              </button>
            ))}

            {/* ⭐ Followed Games News Filter Tab */}
            <button
              onClick={() => setFollowedOnly(!followedOnly)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 border ${
                followedOnly
                  ? "bg-amber-500 text-slate-950 font-black border-amber-400 shadow-md shadow-amber-950/40"
                  : "text-amber-400 hover:text-amber-300 hover:bg-slate-800 border-amber-500/30"
              }`}
            >
              <Star className={`w-3.5 h-3.5 ${followedOnly ? "fill-slate-950" : "fill-amber-400"}`} />
              <span>⭐ Followed Games News</span>
              {followedTitles.length > 0 && (
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full font-black ${
                    followedOnly ? "bg-slate-950 text-amber-300" : "bg-amber-400/20 text-amber-300"
                  }`}
                >
                  {followedTitles.length}
                </span>
              )}
            </button>
          </div>

          {/* Search and Sort */}
          <div className="flex items-center gap-3 w-full lg:w-auto justify-end">
            <div className="relative flex-1 sm:w-64">
              <input
                type="text"
                placeholder="Search articles, games, topics..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 text-slate-200 placeholder-slate-500 text-xs rounded-xl pl-9 pr-4 py-2 focus:outline-none focus:border-cyan-500 transition-colors"
              />
              <Search className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
            </div>

            <div className="flex items-center gap-1.5 bg-slate-950 border border-slate-800 rounded-xl px-2 py-1">
              <SlidersHorizontal className="w-3.5 h-3.5 text-slate-400" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                aria-label="Sort articles by"
                className="bg-transparent text-slate-300 text-xs font-semibold focus:outline-none cursor-pointer"
              >
                <option value="latest" className="bg-slate-900">Latest First</option>
                <option value="popular" className="bg-slate-900">Most Popular</option>
                <option value="trending" className="bg-slate-900">Most Discussed</option>
              </select>
            </div>
          </div>
        </div>

        {/* ========================================================
            MAIN LAYOUT: NEWS GRID (LEFT) + RADAR SIDEBAR (RIGHT)
            ======================================================== */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main News Articles Grid */}
          <div className="lg:col-span-8 space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-black text-white tracking-tight flex items-center gap-2">
                <span>{followedOnly ? "News for Followed Games" : "Latest Headlines"}</span>
                <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-slate-800 text-slate-400">
                  {filteredArticles.length} Stories
                </span>
              </h2>

              {bookmarkedIds.length > 0 && (
                <span className="text-xs text-amber-400 flex items-center gap-1 font-semibold">
                  <BookmarkCheck className="w-3.5 h-3.5" />
                  {bookmarkedIds.length} Saved in Library
                </span>
              )}
            </div>

            {/* If Followed Only active but user follows 0 games */}
            {followedOnly && followedTitles.length === 0 ? (
              <div className="p-8 rounded-2xl bg-slate-900/90 border border-amber-500/30 text-center space-y-4">
                <div className="w-12 h-12 rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center mx-auto text-amber-400">
                  <Star className="w-6 h-6 fill-current" />
                </div>
                <div className="max-w-md mx-auto space-y-1">
                  <h3 className="text-base font-bold text-white">
                    You haven&apos;t followed any games yet
                  </h3>
                  <p className="text-xs text-slate-400">
                    Click the &quot;Follow Game&quot; button on release cards or follow popular titles below to curate your personalized gaming news feed:
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-lg mx-auto pt-2">
                  {POPULAR_SUGGESTIONS.map((sug) => (
                    <button
                      key={sug.title}
                      onClick={() => toggleFavoriteGame(sug)}
                      className="flex items-center justify-between p-3 rounded-xl bg-slate-950 border border-slate-800 hover:border-amber-500/50 transition-colors text-left group"
                    >
                      <span className="text-xs font-bold text-white truncate pr-2 group-hover:text-amber-300">
                        {sug.title}
                      </span>
                      <span className="text-[11px] text-amber-400 font-bold flex items-center gap-1 shrink-0">
                        <Star className="w-3.5 h-3.5" /> Follow
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            ) : filteredArticles.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {filteredArticles.map((article) => (
                  <NewsCard
                    key={article.id}
                    article={article}
                    onRead={(art) => setActiveArticle(art)}
                    isBookmarked={bookmarkedIds.includes(article.id)}
                    onToggleBookmark={handleToggleBookmark}
                  />
                ))}
              </div>
            ) : (
              <div className="p-12 text-center rounded-2xl bg-slate-900/60 border border-slate-800 space-y-3">
                <Search className="w-8 h-8 text-slate-600 mx-auto" />
                <p className="text-sm font-bold text-slate-300">No articles matched your criteria</p>
                <p className="text-xs text-slate-500">Try adjusting your search terms or category selection.</p>
                <button
                  onClick={() => {
                    setSelectedCategory("All");
                    setSearchQuery("");
                    setFollowedOnly(false);
                  }}
                  className="px-4 py-2 rounded-xl text-xs font-semibold bg-slate-800 text-slate-200 hover:text-white"
                >
                  Reset Filters
                </button>
              </div>
            )}
          </div>

          {/* Desktop Right Sidebar */}
          <aside className="lg:col-span-4 space-y-6">
            {/* Quick Drop Radar Widget */}
            <div className="bg-gradient-to-br from-slate-900 to-emerald-950/40 border border-emerald-500/30 rounded-3xl p-6 shadow-xl relative overflow-hidden">
              <div className="flex items-center justify-between mb-4">
                <span className="text-[11px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center gap-1">
                  <Flame className="w-3 h-3" /> Upcoming Drop Radar
                </span>
                <span className="text-xs font-semibold text-slate-400">Oct 2026</span>
              </div>

              <div className="relative aspect-[16/9] rounded-2xl overflow-hidden mb-4 border border-slate-800">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={nearestRelease.coverImage}
                  alt={nearestRelease.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
                <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between text-xs text-white">
                  <span className="font-bold">{nearestRelease.releaseDate}</span>
                  <span className="font-black text-amber-400">Hype: {nearestRelease.hypeScore}%</span>
                </div>
              </div>

              <div className="flex items-center justify-between gap-2">
                <h3 className="text-base font-black text-white line-clamp-1">
                  {nearestRelease.title}
                </h3>
                <button
                  onClick={() => toggleFavoriteGame({
                    title: nearestRelease.title,
                    coverImage: nearestRelease.coverImage,
                    releaseDate: nearestRelease.releaseDate,
                    type: nearestRelease.type
                  })}
                  className="p-1 rounded-lg bg-slate-950 border border-slate-800 text-amber-400 hover:text-amber-300"
                  title="Follow game"
                >
                  <Star className="w-3.5 h-3.5 fill-current" />
                </button>
              </div>

              <p className="text-xs text-slate-400 mt-1 line-clamp-2">
                {nearestRelease.summary}
              </p>

              <div className="mt-5 pt-4 border-t border-slate-800/80 flex items-center justify-between">
                <span className="text-xs text-emerald-400 font-bold">
                  {nearestRelease.dropDetails?.price || "Releasing Soon"}
                </span>

                <Link
                  href="/calendar"
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white transition-colors"
                >
                  <CalendarDays className="w-3.5 h-3.5" />
                  <span>View in Calendar</span>
                </Link>
              </div>
            </div>

            {/* Trending Topics Pill Box */}
            <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4">
              <h3 className="text-sm font-black uppercase tracking-wider text-slate-200 flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-cyan-400" />
                Trending Gaming Radar
              </h3>
              <div className="space-y-2.5">
                {TRENDING_TOPICS.map((topic, i) => (
                  <div
                    key={topic.tag}
                    onClick={() => {
                      setSearchQuery(topic.tag.replace("#", ""));
                      setFollowedOnly(false);
                    }}
                    className="flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-800 transition-colors cursor-pointer group"
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="text-xs font-bold text-slate-500 group-hover:text-cyan-400">
                        0{i + 1}
                      </span>
                      <span className="text-xs font-bold text-slate-200 group-hover:text-white">
                        {topic.tag}
                      </span>
                    </div>
                    <span className="text-[11px] text-slate-500">{topic.count}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Community Live Poll */}
            <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-black uppercase tracking-wider text-slate-200 flex items-center gap-2">
                  <Vote className="w-4 h-4 text-violet-400" />
                  Gamer Pulse Poll
                </h3>
                <span className="text-[11px] text-slate-500 font-medium">
                  {totalPollVotes.toLocaleString()} votes
                </span>
              </div>
              <p className="text-xs font-bold text-white">
                Which anticipated release will claim Game of the Season?
              </p>

              <div className="space-y-2.5">
                {pollOptions.map((opt, idx) => {
                  const percent = Math.round((opt.count / totalPollVotes) * 100);
                  const isSelected = pollVoted === idx;

                  return (
                    <button
                      key={opt.title}
                      onClick={() => handleVote(idx)}
                      disabled={pollVoted !== null}
                      className={`relative w-full text-left p-3 rounded-xl border transition-all overflow-hidden ${
                        isSelected
                          ? "bg-violet-950/80 border-violet-500 text-white"
                          : pollVoted !== null
                          ? "bg-slate-950/70 border-slate-800 text-slate-300"
                          : "bg-slate-950 hover:bg-slate-800 border-slate-800 text-slate-200"
                      }`}
                    >
                      {/* Percent Fill Bar */}
                      {pollVoted !== null && (
                        <div
                          className={`absolute top-0 bottom-0 left-0 transition-all duration-700 ${
                            isSelected ? "bg-violet-600/30" : "bg-slate-800/40"
                          }`}
                          style={{ width: `${percent}%` }}
                        />
                      )}

                      <div className="relative z-10 flex items-center justify-between text-xs font-medium">
                        <span className="truncate pr-2">{opt.title}</span>
                        {pollVoted !== null && (
                          <span className="font-bold text-cyan-400">{percent}%</span>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>

              {pollVoted !== null && (
                <p className="text-[11px] text-emerald-400 text-center font-medium">
                  ✓ Your vote was recorded in the live community telemetry.
                </p>
              )}
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
