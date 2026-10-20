"use client";

import React, { useState, useMemo } from "react";
import { 
  GameRelease, 
  ReleaseType, 
  GamingPlatform, 
  GAME_RELEASES 
} from "@/data/releasesData";
import { 
  ChevronLeft, 
  ChevronRight, 
  Calendar as CalendarIcon, 
  Flame, 
  Zap, 
  Sparkles, 
  Download, 
  Share2, 
  Check, 
  Monitor, 
  Gamepad, 
  Tag, 
  Clock, 
  CheckCircle2, 
  AlertCircle,
  Filter,
  Layers,
  ArrowRight
} from "lucide-react";
import { generateIcsFile } from "@/utils/calendarExport";

export default function CalendarView() {
  // Calendar View State: Year and Month (defaulting to October 2026)
  const [currentYear, setCurrentYear] = useState<number>(2026);
  const [currentMonth, setCurrentMonth] = useState<number>(9); // 0-indexed: 9 = October
  const [selectedDate, setSelectedDate] = useState<string>("2026-10-20");

  // Filters State
  const [typeFilter, setTypeFilter] = useState<"all" | ReleaseType>("all");
  const [platformFilter, setPlatformFilter] = useState<"all" | GamingPlatform>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Share notification state
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Month Names
  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const weekdayNames = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  // Navigation handlers
  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear((y) => y - 1);
    } else {
      setCurrentMonth((m) => m - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear((y) => y + 1);
    } else {
      setCurrentMonth((m) => m + 1);
    }
  };

  const handleJumpToToday = () => {
    setCurrentYear(2026);
    setCurrentMonth(9); // October
    setSelectedDate("2026-10-20");
  };

  // Filtered releases overall
  const filteredReleases = useMemo(() => {
    return GAME_RELEASES.filter((release) => {
      // Type filter (drop vs update)
      if (typeFilter !== "all" && release.type !== typeFilter) {
        return false;
      }
      // Platform filter
      if (platformFilter !== "all" && !release.platforms.includes(platformFilter)) {
        return false;
      }
      // Search query
      if (searchQuery.trim() !== "") {
        const query = searchQuery.toLowerCase();
        const matchesTitle = release.title.toLowerCase().includes(query);
        const matchesDev = release.developer.toLowerCase().includes(query);
        const matchesGenre = release.genre.some((g) => g.toLowerCase().includes(query));
        if (!matchesTitle && !matchesDev && !matchesGenre) {
          return false;
        }
      }
      return true;
    });
  }, [typeFilter, platformFilter, searchQuery]);

  // Releases mapped by date for fast calendar lookup
  const releasesByDate = useMemo(() => {
    const map = new Map<string, GameRelease[]>();
    filteredReleases.forEach((release) => {
      const existing = map.get(release.releaseDate) || [];
      existing.push(release);
      map.set(release.releaseDate, existing);
    });
    return map;
  }, [filteredReleases]);

  // Calendar Grid Calculation
  const calendarDays = useMemo(() => {
    // Days in current month
    const totalDaysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    // Day of the week for 1st of month (0 = Sun, 1 = Mon ... 6 = Sat)
    let firstDayIndex = new Date(currentYear, currentMonth, 1).getDay();
    // Shift so 0 = Monday, 6 = Sunday
    firstDayIndex = firstDayIndex === 0 ? 6 : firstDayIndex - 1;

    // Previous month filler days
    const totalDaysInPrevMonth = new Date(currentYear, currentMonth, 0).getDate();
    const prevMonthDays = [];
    for (let i = firstDayIndex - 1; i >= 0; i--) {
      prevMonthDays.push({
        dayNumber: totalDaysInPrevMonth - i,
        isCurrentMonth: false,
        dateString: ""
      });
    }

    // Current month days
    const currentMonthDays = [];
    for (let day = 1; day <= totalDaysInMonth; day++) {
      const monthStr = String(currentMonth + 1).padStart(2, "0");
      const dayStr = String(day).padStart(2, "0");
      const dateString = `${currentYear}-${monthStr}-${dayStr}`;

      currentMonthDays.push({
        dayNumber: day,
        isCurrentMonth: true,
        dateString,
        events: releasesByDate.get(dateString) || []
      });
    }

    // Next month padding to fill out 35 or 42 grid cells
    const totalFilled = prevMonthDays.length + currentMonthDays.length;
    const remaining = totalFilled <= 35 ? 35 - totalFilled : 42 - totalFilled;
    const nextMonthDays = [];
    for (let i = 1; i <= remaining; i++) {
      nextMonthDays.push({
        dayNumber: i,
        isCurrentMonth: false,
        dateString: ""
      });
    }

    return [...prevMonthDays, ...currentMonthDays, ...nextMonthDays];
  }, [currentYear, currentMonth, releasesByDate]);

  // Releases for the currently selected date
  const selectedDateReleases = useMemo(() => {
    return filteredReleases.filter((r) => r.releaseDate === selectedDate);
  }, [filteredReleases, selectedDate]);

  // Nearest upcoming drop if current selected date has no releases
  const nearestDrop = useMemo(() => {
    if (selectedDateReleases.length > 0) return null;
    const sorted = [...filteredReleases].sort(
      (a, b) => new Date(a.releaseDate).getTime() - new Date(b.releaseDate).getTime()
    );
    return sorted.find((r) => r.releaseDate >= selectedDate) || sorted[0] || null;
  }, [selectedDateReleases, filteredReleases, selectedDate]);

  // Format Selected Date for display
  const formattedSelectedDate = useMemo(() => {
    if (!selectedDate) return "";
    const parts = selectedDate.split("-");
    const d = new Date(Number(parts[0]), Number(parts[1]) - 1, Number(parts[2]));
    return d.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric"
    });
  }, [selectedDate]);

  const handleShareRelease = (release: GameRelease) => {
    navigator.clipboard.writeText(
      `${release.title} launches on ${release.releaseDate} (${release.platforms.join(", ")})! Tracked on NEXUS DROP.`
    );
    setCopiedId(release.id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  return (
    <div className="w-full space-y-10">
      {/* Top Banner / Calendar Controls Header */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 md:p-8 backdrop-blur-xl shadow-xl shadow-black/40">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 pb-6 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 flex items-center gap-1.5">
                <CalendarIcon className="w-3.5 h-3.5" /> Desktop Master Schedule
              </span>
              <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-slate-800 text-slate-300">
                {filteredReleases.length} tracked releases
              </span>
            </div>
            <h1 className="text-3xl font-black text-white tracking-tight">
              Game Release & Patch Calendar
            </h1>
            <p className="text-sm text-slate-400 mt-1">
              Select any date on the calendar to reveal all new game drops, major expansions, and patch notes scheduled for that day.
            </p>
          </div>

          {/* Month Navigation Buttons */}
          <div className="flex items-center gap-3">
            <button
              onClick={handleJumpToToday}
              className="px-3 py-2 rounded-xl text-xs font-bold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors"
            >
              Today (Oct 20)
            </button>

            <div className="flex items-center bg-slate-950 border border-slate-800 rounded-2xl p-1 shadow-inner">
              <button
                onClick={handlePrevMonth}
                className="p-2 rounded-xl hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
                title="Previous Month"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <div className="px-5 text-sm font-bold text-white tracking-wide text-center min-w-[160px]">
                {monthNames[currentMonth]} {currentYear}
              </div>
              <button
                onClick={handleNextMonth}
                className="p-2 rounded-xl hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
                title="Next Month"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Filter Controls: Toggle between Drops and Updates */}
        <div className="pt-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
          {/* Main Switcher: All vs Drops vs Updates */}
          <div className="flex items-center bg-slate-950 p-1.5 rounded-2xl border border-slate-800/90 shadow-inner">
            <button
              onClick={() => setTypeFilter("all")}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                typeFilter === "all"
                  ? "bg-slate-800 text-white shadow-md border border-slate-700"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              All Releases
            </button>

            <button
              onClick={() => setTypeFilter("drop")}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                typeFilter === "drop"
                  ? "bg-emerald-600 text-white shadow-lg shadow-emerald-900/50"
                  : "text-slate-400 hover:text-emerald-400"
              }`}
            >
              <Flame className="w-3.5 h-3.5 text-emerald-300" />
              🔥 New Game Drops
            </button>

            <button
              onClick={() => setTypeFilter("update")}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                typeFilter === "update"
                  ? "bg-cyan-600 text-white shadow-lg shadow-cyan-900/50"
                  : "text-slate-400 hover:text-cyan-400"
              }`}
            >
              <Zap className="w-3.5 h-3.5 text-cyan-300" />
              ⚡ Major Updates & Patches
            </button>
          </div>

          {/* Platform Filter & Search */}
          <div className="flex items-center gap-3">
            <div className="relative">
              <select
                value={platformFilter}
                onChange={(e) => setPlatformFilter(e.target.value as any)}
                aria-label="Filter by platform"
                className="bg-slate-950 border border-slate-800 text-slate-200 text-xs rounded-xl px-3 py-2 pr-8 font-semibold focus:outline-none focus:border-cyan-500 transition-colors cursor-pointer appearance-none"
              >
                <option value="all">🎮 All Platforms</option>
                <option value="PC">🖥️ PC</option>
                <option value="PS5">🎮 PlayStation 5</option>
                <option value="Xbox Series X/S">💚 Xbox Series X/S</option>
                <option value="Nintendo Switch">🔴 Nintendo Switch</option>
                <option value="Steam Deck">⚡ Steam Deck</option>
              </select>
              <Filter className="w-3 h-3 text-slate-500 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>

            <input
              type="text"
              placeholder="Search release..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-slate-950 border border-slate-800 text-slate-200 placeholder-slate-500 text-xs rounded-xl px-3 py-2 w-48 focus:outline-none focus:border-cyan-500 transition-colors"
            />
          </div>
        </div>
      </div>

      {/* Interactive Desktop Calendar Grid */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 md:p-8 backdrop-blur-xl shadow-2xl shadow-black/50 overflow-hidden">
        {/* Weekday Columns Header */}
        <div className="grid grid-cols-7 gap-2 mb-3">
          {weekdayNames.map((day) => (
            <div
              key={day}
              className="py-2 text-center text-xs font-bold uppercase tracking-wider text-slate-400 bg-slate-950/60 rounded-xl border border-slate-800/40"
            >
              {day}
            </div>
          ))}
        </div>

        {/* 7-column Calendar Cells */}
        <div className="grid grid-cols-7 gap-2">
          {calendarDays.map((cell, idx) => {
            if (!cell.isCurrentMonth) {
              return (
                <div
                  key={`empty-${idx}`}
                  className="min-h-[110px] p-2.5 rounded-2xl bg-slate-950/30 border border-slate-900/40 opacity-30 select-none"
                >
                  <span className="text-xs font-semibold text-slate-600">
                    {cell.dayNumber}
                  </span>
                </div>
              );
            }

            const isSelected = cell.dateString === selectedDate;
            const isToday = cell.dateString === "2026-10-20";
            const events = cell.events || [];
            const dropsCount = events.filter((e) => e.type === "drop").length;
            const updatesCount = events.filter((e) => e.type === "update").length;

            return (
              <div
                key={cell.dateString}
                onClick={() => {
                  setSelectedDate(cell.dateString);
                  // Smoothly scroll to the details below calendar
                  const el = document.getElementById("selected-date-details");
                  if (el) {
                    el.scrollIntoView({ behavior: "smooth", block: "start" });
                  }
                }}
                className={`group relative min-h-[110px] p-2.5 rounded-2xl border transition-all duration-200 cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? "bg-slate-850 border-cyan-400 ring-2 ring-cyan-400/30 shadow-xl shadow-cyan-950/40"
                    : events.length > 0
                    ? "bg-slate-900/90 border-slate-800 hover:border-slate-700 hover:bg-slate-850"
                    : "bg-slate-950/50 border-slate-900/80 hover:border-slate-800 hover:bg-slate-900/40"
                }`}
              >
                {/* Header inside day cell: date number & today indicator */}
                <div className="flex items-center justify-between">
                  <span
                    className={`text-sm font-bold ${
                      isSelected
                        ? "text-cyan-400"
                        : isToday
                        ? "text-emerald-400 font-extrabold"
                        : "text-slate-300"
                    }`}
                  >
                    {cell.dayNumber}
                  </span>

                  {isToday && (
                    <span className="text-[10px] font-extrabold px-1.5 py-0.2 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                      TODAY
                    </span>
                  )}

                  {events.length > 0 && !isToday && (
                    <span className="text-[10px] font-bold px-1.5 py-0.2 rounded-full bg-slate-800 text-slate-300">
                      {events.length}
                    </span>
                  )}
                </div>

                {/* Event Pills inside Day Cell */}
                <div className="space-y-1 my-1 overflow-hidden">
                  {events.slice(0, 2).map((ev) => (
                    <div
                      key={ev.id}
                      className={`text-[10px] font-bold truncate px-1.5 py-0.5 rounded-lg border flex items-center gap-1 ${
                        ev.type === "drop"
                          ? "bg-emerald-950/80 border-emerald-700/60 text-emerald-300"
                          : "bg-cyan-950/80 border-cyan-700/60 text-cyan-300"
                      }`}
                      title={`${ev.title} (${ev.type === "drop" ? "Drop" : "Update"})`}
                    >
                      {ev.type === "drop" ? (
                        <Flame className="w-2.5 h-2.5 text-emerald-400 shrink-0" />
                      ) : (
                        <Zap className="w-2.5 h-2.5 text-cyan-400 shrink-0" />
                      )}
                      <span className="truncate">{ev.title}</span>
                    </div>
                  ))}

                  {events.length > 2 && (
                    <div className="text-[9px] text-slate-400 font-semibold pl-1">
                      +{events.length - 2} more
                    </div>
                  )}
                </div>

                {/* Bottom subtle dot indicators */}
                <div className="flex items-center gap-1 pt-1">
                  {dropsCount > 0 && (
                    <span
                      className="w-1.5 h-1.5 rounded-full bg-emerald-400"
                      title={`${dropsCount} game drop(s)`}
                    />
                  )}
                  {updatesCount > 0 && (
                    <span
                      className="w-1.5 h-1.5 rounded-full bg-cyan-400"
                      title={`${updatesCount} update(s)`}
                    />
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Legend bar */}
        <div className="mt-6 pt-4 border-t border-slate-800/80 flex flex-wrap items-center justify-between text-xs text-slate-400 gap-4">
          <div className="flex items-center gap-5">
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-md bg-emerald-950 border border-emerald-500/60 inline-flex items-center justify-center">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              </span>
              <strong className="text-slate-300">New Game Drops</strong> (Full Releases)
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-md bg-cyan-950 border border-cyan-500/60 inline-flex items-center justify-center">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
              </span>
              <strong className="text-slate-300">Major Updates</strong> (Patches & DLC)
            </span>
          </div>

          <div className="text-xs text-slate-500">
            Click any calendar day to inspect full patch notes, pre-orders, and export to calendar.
          </div>
        </div>
      </div>

      {/* ========================================================
          CRITICAL FEATURE: DETAIL SECTION BELOW THE CALENDAR
          ======================================================== */}
      <section
        id="selected-date-details"
        className="scroll-mt-24 bg-slate-900/90 border border-slate-800 rounded-3xl p-6 md:p-8 backdrop-blur-xl shadow-2xl shadow-black/50 space-y-6"
      >
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-violet-500/10 text-violet-400 border border-violet-500/20">
                Scheduled Releases For Day
              </span>
              {selectedDate === "2026-10-20" && (
                <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  ⚡ Today
                </span>
              )}
            </div>
            <h2 className="text-2xl md:text-3xl font-black text-white tracking-tight mt-1">
              {formattedSelectedDate}
            </h2>
          </div>

          <div className="flex items-center gap-2 text-xs font-semibold text-slate-300">
            <span className="px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800">
              {selectedDateReleases.length}{" "}
              {selectedDateReleases.length === 1 ? "Event Found" : "Events Found"}
            </span>
          </div>
        </div>

        {/* If releases exist on this day */}
        {selectedDateReleases.length > 0 ? (
          <div className="grid grid-cols-1 gap-6">
            {selectedDateReleases.map((release) => {
              const isDrop = release.type === "drop";

              return (
                <div
                  key={release.id}
                  className={`relative rounded-3xl border overflow-hidden p-6 md:p-8 transition-all duration-300 ${
                    isDrop
                      ? "bg-gradient-to-br from-slate-900 via-slate-900 to-emerald-950/30 border-emerald-600/30 shadow-lg shadow-emerald-950/20"
                      : "bg-gradient-to-br from-slate-900 via-slate-900 to-cyan-950/30 border-cyan-600/30 shadow-lg shadow-cyan-950/20"
                  }`}
                >
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                    {/* Cover Artwork Column */}
                    <div className="lg:col-span-4 relative rounded-2xl overflow-hidden border border-slate-800 shadow-xl group">
                      <div className="relative aspect-[16/10] lg:aspect-[4/5] w-full">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={release.coverImage}
                          alt={release.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
                      </div>

                      {/* Type Badge on Image */}
                      <div className="absolute top-3 left-3">
                        <span
                          className={`text-xs font-black uppercase tracking-wider px-3 py-1 rounded-xl shadow-lg backdrop-blur-md border flex items-center gap-1.5 ${
                            isDrop
                              ? "bg-emerald-500/90 text-slate-950 border-emerald-400"
                              : "bg-cyan-500/90 text-slate-950 border-cyan-400"
                          }`}
                        >
                          {isDrop ? (
                            <>
                              <Flame className="w-3.5 h-3.5 fill-current" />
                              NEW GAME DROP
                            </>
                          ) : (
                            <>
                              <Zap className="w-3.5 h-3.5 fill-current" />
                              MAJOR UPDATE
                            </>
                          )}
                        </span>
                      </div>

                      {/* Hype Score Badge */}
                      <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-white backdrop-blur-md bg-black/60 px-3 py-1.5 rounded-xl border border-white/10">
                        <span className="font-semibold text-slate-300">Hype Meter</span>
                        <span className="font-black text-amber-400 flex items-center gap-1">
                          🔥 {release.hypeScore}/100
                        </span>
                      </div>
                    </div>

                    {/* Detailed Information Column */}
                    <div className="lg:col-span-8 flex flex-col justify-between space-y-6">
                      <div className="space-y-4">
                        {/* Tags and Platforms */}
                        <div className="flex flex-wrap items-center gap-2">
                          {release.platforms.map((p) => (
                            <span
                              key={p}
                              className="text-xs font-bold px-2.5 py-1 rounded-lg bg-slate-950 border border-slate-800 text-slate-200"
                            >
                              {p}
                            </span>
                          ))}
                          <span className="text-slate-600">•</span>
                          {release.genre.map((g) => (
                            <span
                              key={g}
                              className="text-xs font-medium text-slate-400"
                            >
                              {g}
                            </span>
                          ))}
                        </div>

                        {/* Title and Credits */}
                        <div>
                          <h3 className="text-2xl md:text-3xl font-black text-white tracking-tight">
                            {release.title}
                          </h3>
                          <p className="text-xs text-slate-400 mt-1">
                            Developed by <strong className="text-slate-200">{release.developer}</strong> • Published by{" "}
                            <strong className="text-slate-200">{release.publisher}</strong> • Rated{" "}
                            <span className="text-slate-300">{release.rating}</span>
                          </p>
                        </div>

                        {/* Summary description */}
                        <p className="text-sm text-slate-300 leading-relaxed">
                          {release.summary}
                        </p>

                        {/* DROP SPECIFIC DETAILS */}
                        {isDrop && release.dropDetails && (
                          <div className="p-4 rounded-2xl bg-slate-950/70 border border-emerald-950/60 space-y-3">
                            <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-slate-800">
                              <div className="flex items-center gap-3">
                                <span className="text-xs text-slate-400">Launch Price:</span>
                                <span className="text-sm font-extrabold text-white">
                                  {release.dropDetails.price}
                                </span>
                              </div>
                              {release.dropDetails.dayOneGamePass && (
                                <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center gap-1">
                                  <CheckCircle2 className="w-3.5 h-3.5" /> Day-One Xbox Game Pass
                                </span>
                              )}
                            </div>

                            {release.dropDetails.preOrderBonus && (
                              <p className="text-xs text-amber-300/90 flex items-start gap-1.5">
                                <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                                <span>
                                  <strong>Pre-order Bonus:</strong> {release.dropDetails.preOrderBonus}
                                </span>
                              </p>
                            )}

                            <div>
                              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                                Key Launch Highlights:
                              </h4>
                              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-300">
                                {release.dropDetails.keyFeatures.map((feat, i) => (
                                  <li key={i} className="flex items-start gap-2">
                                    <span className="text-emerald-400 mt-0.5 font-bold">✓</span>
                                    <span>{feat}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        )}

                        {/* UPDATE SPECIFIC DETAILS */}
                        {!isDrop && release.updateDetails && (
                          <div className="p-4 rounded-2xl bg-slate-950/70 border border-cyan-950/60 space-y-3">
                            <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-slate-800">
                              <div className="flex items-center gap-2">
                                <span className="text-xs text-slate-400">Version:</span>
                                <span className="text-xs font-bold px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-800">
                                  {release.updateDetails.version}
                                </span>
                              </div>
                              <div className="flex items-center gap-4 text-xs text-slate-400">
                                <span>Size: <strong className="text-slate-200">{release.updateDetails.downloadSize}</strong></span>
                                {release.updateDetails.serverDowntime && (
                                  <span>Downtime: <strong className="text-amber-400">{release.updateDetails.serverDowntime}</strong></span>
                                )}
                              </div>
                            </div>

                            <div>
                              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                                Major Patch Highlights:
                              </h4>
                              <ul className="space-y-1.5 text-xs text-slate-300">
                                {release.updateDetails.patchHighlights.map((hl, i) => (
                                  <li key={i} className="flex items-start gap-2">
                                    <span className="text-cyan-400 font-bold">•</span>
                                    <span>{hl}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Action buttons */}
                      <div className="pt-4 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => generateIcsFile(release)}
                            className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 transition-colors shadow-sm"
                          >
                            <Download className="w-3.5 h-3.5 text-cyan-400" />
                            <span>Add to Calendar (.ics)</span>
                          </button>

                          <button
                            onClick={() => handleShareRelease(release)}
                            className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold bg-slate-950 hover:bg-slate-800 text-slate-300 border border-slate-800 transition-colors"
                          >
                            {copiedId === release.id ? (
                              <>
                                <Check className="w-3.5 h-3.5 text-emerald-400" />
                                <span className="text-emerald-300">Copied!</span>
                              </>
                            ) : (
                              <>
                                <Share2 className="w-3.5 h-3.5" />
                                <span>Share</span>
                              </>
                            )}
                          </button>
                        </div>

                        <div className="text-xs text-slate-400 flex items-center gap-1.5">
                          <Clock className="w-3.5 h-3.5 text-slate-500" />
                          <span>Status: Confirmed Worldwide Launch</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          /* Empty state when clicking on a date with no drops */
          <div className="py-12 px-6 rounded-2xl bg-slate-950/60 border border-dashed border-slate-800 text-center space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-slate-900 border border-slate-800 mx-auto flex items-center justify-center text-slate-500">
              <CalendarIcon className="w-6 h-6" />
            </div>
            <div className="max-w-md mx-auto space-y-1">
              <h3 className="text-base font-bold text-white">
                No releases scheduled on {formattedSelectedDate}
              </h3>
              <p className="text-xs text-slate-400">
                Publishers haven&apos;t pinned an official launch or maintenance window for this specific date yet.
              </p>
            </div>

            {nearestDrop && (
              <div className="pt-4 max-w-lg mx-auto">
                <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 text-left flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={nearestDrop.coverImage}
                      alt={nearestDrop.title}
                      className="w-12 h-12 rounded-xl object-cover border border-slate-700 shrink-0"
                    />
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-cyan-400">
                        Nearest Scheduled Event
                      </span>
                      <h4 className="text-xs font-bold text-white line-clamp-1">
                        {nearestDrop.title}
                      </h4>
                      <p className="text-[11px] text-slate-400">
                        {nearestDrop.releaseDate} ({nearestDrop.type === "drop" ? "Drop" : "Update"})
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      setSelectedDate(nearestDrop.releaseDate);
                      const parts = nearestDrop.releaseDate.split("-");
                      setCurrentYear(Number(parts[0]));
                      setCurrentMonth(Number(parts[1]) - 1);
                    }}
                    className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold bg-cyan-600 hover:bg-cyan-500 text-white transition-colors shrink-0"
                  >
                    <span>View Date</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </section>
    </div>
  );
}
