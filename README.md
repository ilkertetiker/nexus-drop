# NEXUS DROP 🎮 // Video Game News & Release Calendar

> A high-performance, desktop-optimized web application featuring breaking gaming editorial news, upcoming game drops, and major patch update schedules.

Built with **Next.js 16 (App Router)**, **React 19**, **TypeScript**, and **Tailwind CSS**. Ready for 1-click deployment on **Vercel** via **GitHub**.

---

## 🌟 Key Features

### 1. Video Game News Portal (`/`)
- **Breaking News Hero**: High-impact editorial showcase with full-resolution visuals and animated badges.
- **Dynamic Category Filtering**: Seamlessly filter articles across *PC*, *PlayStation*, *Xbox*, *Nintendo*, *Esports*, and *Hardware*.
- **Instant Search & Sort**: Real-time client-side search across titles, excerpts, and tags, with sorting by *Latest*, *Most Popular*, and *Most Discussed*.
- **Full Article Reader Modal**: Distraction-free reading overlay with author profiles, view counts, read time, like button, and share link.
- **Local Library / Bookmarking**: Save articles to your personal library persisted in `localStorage`.
- **Live Gamer Pulse Poll**: Interactive desktop community polling widget with real-time percentage visualizations.
- **Drop Radar Sidebar**: Quick-glance widget highlighting the nearest major release.

### 2. Drop & Update Interactive Calendar (`/calendar`)
- **Release Mode Switcher**:
  - **🔥 New Game Drops**: Filter specifically for full game releases, launch prices, and Day-One Xbox Game Pass titles.
  - **⚡ Major Updates & Patches**: Filter specifically for season updates, patch notes, download sizes, and server maintenance windows.
  - **All Releases**: Comprehensive view of both drops and updates combined.
- **Platform Filtering**: Filter by *PC*, *PlayStation 5*, *Xbox Series X/S*, *Nintendo Switch*, and *Steam Deck*.
- **Desktop 7-Column Calendar Grid**:
  - Full Monday–Sunday month matrix with previous/next month navigation and "Jump to Today" shortcut.
  - Color-coded badges: **Neon Emerald** for Game Drops, **Electric Cyan** for Patches & Updates.
  - Event count badges and active date glowing rings.
- **Scheduled Releases For Selected Day (Below the Calendar)**:
  - When clicking any date in the calendar, the view displays the detailed release cards for that specific day.
  - **Drop Cards**: Cover artwork, synopsis, developer/publisher credits, launch price, Day-One Game Pass indicator, pre-order bonuses, and key features.
  - **Update Cards**: Version tags, download sizes, server downtime alerts, and bulleted patch highlights.
  - **Calendar Sync (.ics)**: One-click export that generates standard `.ics` calendar files compatible with Apple Calendar, Google Calendar, and Microsoft Outlook.
  - **Fallback State**: If no release is scheduled on a selected day, suggests the nearest upcoming drop with a one-click jump button.

---

## 🚀 Desktop Optimization
- Tailored for large desktop displays (1080p, 1440p, 4K) with a centered max-width 7xl layout.
- Custom dark cyberpunk aesthetics, smooth subtle hover animations, glassmorphism backdrops, and custom sleek desktop scrollbars.
- Keyboard accessible navigation and instant reactivity.

---

## 🛠️ Tech Stack
- **Framework**: Next.js 16 (App Router)
- **Library**: React 19
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS v4
- **Icons**: Lucide React
- **Hosting / CI/CD**: GitHub + Vercel

---

## 💻 Local Development

1. **Clone the repository**:
   ```bash
   git clone https://github.com/<your-username>/gamepulse.git
   cd gamepulse
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your desktop browser.

4. **Build for production**:
   ```bash
   npm run build
   ```

---

## ☁️ Deployment Guide (GitHub & Vercel)

### Step 1: Push to GitHub
```bash
git add .
git commit -m "feat: complete video game news and drop calendar portal"
git branch -M main
git remote add origin https://github.com/<your-username>/nexus-drop.git
git push -u origin main
```

### Step 2: Deploy to Vercel
1. Go to [vercel.com](https://vercel.com) and log in with your GitHub account.
2. Click **"Add New..."** -> **"Project"**.
3. Select your newly created `nexus-drop` repository.
4. Keep the default settings:
   - **Framework Preset**: Next.js
   - **Root Directory**: `./`
   - **Build Command**: `npm run build`
   - **Output Directory**: `.next`
5. Click **"Deploy"**. Vercel will build and assign you a global production URL (e.g., `https://nexus-drop.vercel.app`) in under a minute!
