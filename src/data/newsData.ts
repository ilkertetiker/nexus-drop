export interface NewsArticle {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string[];
  category: "PC" | "PlayStation" | "Xbox" | "Nintendo" | "Esports" | "Hardware" | "Industry";
  author: {
    name: string;
    role: string;
    avatar: string;
  };
  publishedAt: string;
  readTime: string;
  coverImage: string;
  featured?: boolean;
  trending?: boolean;
  tags: string[];
  views: number;
  commentsCount: number;
}

export const NEWS_ARTICLES: NewsArticle[] = [
  {
    id: "news-1",
    slug: "gta-6-fall-2026-gameplay-reveal-breakdown",
    title: "Grand Theft Auto VI: Deep Dive into Vice City's Dynamic Weather and NPC Systems",
    excerpt: "Rockstar Games reveals revolutionary AI behavior routines and real-time volumetric weather modeling across the state of Leonida.",
    content: [
      "In a comprehensive technical showcase, Rockstar Games has detailed the next evolutionary leap powering Grand Theft Auto VI. Set in the vibrant, hyper-detailed playground of Leonida, Vice City introduces unprecedented dynamic ecosystems.",
      "Every single non-player character now operates under contextual motivation routines. Commuters react realistically to torrential tropical storms, emergency services dynamically re-route around traffic bottlenecks, and coastal zones experience authentic tide and surge patterns.",
      "The engine also introduces dual-protagonist synergy mechanics, allowing seamless tactical switching during high-stakes heists across nightclubs, swampland hideouts, and high-rise penthouses.",
      "Industry analysts predict this could be the biggest entertainment launch in history when it lands on PlayStation 5 and Xbox Series X/S."
    ],
    category: "PlayStation",
    author: {
      name: "Marcus Vance",
      role: "Lead Gaming Editor",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&h=120&q=80"
    },
    publishedAt: "2026-10-20",
    readTime: "6 min read",
    coverImage: "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=1200&q=80",
    featured: true,
    trending: true,
    tags: ["GTA 6", "Rockstar Games", "Next-Gen", "Open World"],
    views: 42390,
    commentsCount: 384
  },
  {
    id: "news-2",
    slug: "elden-ring-shadow-patch-114-colosseum-pvp-balance",
    title: "Elden Ring Patch 1.14 Overhauls Colosseum PvP and Buffs Sorceries Across the Board",
    excerpt: "FromSoftware drops surprise balance patch fixing status buildup timings, poise scaling, and performance tweaks on PC.",
    content: [
      "FromSoftware has deployed patch version 1.14 worldwide for Elden Ring, introducing substantial rebalancing to weapon arts and sorcery scaling.",
      "The biggest changes target the Colosseum arenas. Heavy thrusting swords and dual-spear setups have received reduced poise damage multipliers, creating a much more diverse competitive meta.",
      "Additionally, several gravity and cold sorceries now feature lower cast animations and increased tracking reliability against fast-moving bosses in the Lands Between.",
      "PC players also report improved frame pacing on ultra-wide monitor configurations."
    ],
    category: "PC",
    author: {
      name: "Evelyn Chen",
      role: "Senior RPG Specialist",
      avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=120&h=120&q=80"
    },
    publishedAt: "2026-10-19",
    readTime: "4 min read",
    coverImage: "https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=1200&q=80",
    featured: true,
    trending: true,
    tags: ["Elden Ring", "FromSoftware", "Patch Notes", "PvP"],
    views: 29810,
    commentsCount: 219
  },
  {
    id: "news-3",
    slug: "nintendo-switch-2-backwards-compatibility-confirmed",
    title: "Nintendo Confirms Full Backwards Compatibility and Boost Mode for Next Console",
    excerpt: "Nintendo president officially affirms existing digital libraries and physical game cards will carry forward seamlessly to the next-generation platform.",
    content: [
      "During an investor briefing, Nintendo confirmed that players will be able to bring forward their existing Nintendo Switch software library to the successor hardware without repurchasing titles.",
      "A new 'Performance Boost' profile will automatically stabilize dynamic resolution targets and uncap 60 FPS modes on select first-party titles including Tears of the Kingdom and Xenoblade Chronicles 3.",
      "Nintendo also announced an enhanced Nintendo Switch Online infrastructure featuring cloud-synced low-latency multiplayer architecture."
    ],
    category: "Nintendo",
    author: {
      name: "Kenji Sato",
      role: "Hardware & Console Analyst",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&h=120&q=80"
    },
    publishedAt: "2026-10-18",
    readTime: "5 min read",
    coverImage: "https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?auto=format&fit=crop&w=1200&q=80",
    featured: false,
    trending: true,
    tags: ["Nintendo", "Switch 2", "Hardware", "Backwards Compatibility"],
    views: 38400,
    commentsCount: 452
  },
  {
    id: "news-4",
    slug: "geforce-rtx-5090-benchmarks-ray-tracing-overdrive",
    title: "NVIDIA GeForce RTX 50-Series Architectural Preview: Neural Shading and DLSS 4.0",
    excerpt: "Next-gen Blackwell gaming architecture promises 2.5x path tracing throughput and sub-millisecond frame generation latencies.",
    content: [
      "NVIDIA has unveiled architectural specifications for its upcoming flagship desktop GPUs. Built upon refined 3nm nodes, the flagship cards feature fifth-generation Tensor cores with real-time neural path reconstruction.",
      "DLSS 4.0 will introduce multi-frame predictive vector analysis, completely eradicating ghosting artifacts around fast-moving HUD elements in competitive shooters like Counter-Strike 2 and Valorant.",
      "Power efficiency has also received notable engineering attention, with redesigned vapor chambers maintaining sub-65°C operating temperatures under full 4K path-traced workloads."
    ],
    category: "Hardware",
    author: {
      name: "Liam O'Connor",
      role: "Hardware Editor",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&h=120&q=80"
    },
    publishedAt: "2026-10-17",
    readTime: "7 min read",
    coverImage: "https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&w=1200&q=80",
    featured: false,
    trending: false,
    tags: ["NVIDIA", "RTX 5090", "PC Gaming", "Hardware"],
    views: 19450,
    commentsCount: 167
  },
  {
    id: "news-5",
    slug: "cyberpunk-2-project-orion-unreal-engine-5-5",
    title: "CD Projekt Red Shares Early Tech Demo for Cyberpunk Sequel 'Project Orion'",
    excerpt: "The Boston and Warsaw studios showcase Unreal Engine 5.5 crowd simulations and vertical district exploration.",
    content: [
      "CD Projekt Red has shared exciting developmental updates on Project Orion, the sequel to Cyberpunk 2077.",
      "Transitioning from the proprietary REDengine to Unreal Engine 5.5 has allowed the team to build multi-layered megastructures with zero loading screens between street levels, subterranean sewers, and aerial skyways.",
      "The dialogue system has been overhauled to integrate adaptive facial micro-expressions powered by machine learning, creating emotional conversations that shift based on protagonist reputation."
    ],
    category: "PC",
    author: {
      name: "Marcus Vance",
      role: "Lead Gaming Editor",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&h=120&q=80"
    },
    publishedAt: "2026-10-15",
    readTime: "5 min read",
    coverImage: "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?auto=format&fit=crop&w=1200&q=80",
    featured: false,
    trending: true,
    tags: ["Cyberpunk", "CDPR", "Unreal Engine 5", "RPG"],
    views: 26700,
    commentsCount: 198
  },
  {
    id: "news-6",
    slug: "xbox-game-pass-ultimate-cloud-expansion-vr",
    title: "Xbox Announces Direct Steam Integration and Native VR Support for Cloud Gaming",
    excerpt: "Microsoft expands Game Pass ecosystem to support portable handhelds and popular VR headsets with 120 FPS streams.",
    content: [
      "Microsoft Gaming has announced a major strategic update to Xbox Game Pass Ultimate. Subscribed players can now pair select Steam libraries with their Cloud Gaming account to stream owned titles on any web browser.",
      "Furthermore, spatial VR streaming support is rolling out to Meta Quest and Apple Vision Pro, rendering a virtual 140-inch curved OLED screen inside a custom Xbox-themed lounge."
    ],
    category: "Xbox",
    author: {
      name: "Kenji Sato",
      role: "Hardware & Console Analyst",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&h=120&q=80"
    },
    publishedAt: "2026-10-14",
    readTime: "4 min read",
    coverImage: "https://images.unsplash.com/photo-1605901309584-818e25960a8f?auto=format&fit=crop&w=1200&q=80",
    featured: false,
    trending: false,
    tags: ["Xbox", "Game Pass", "Cloud Gaming", "Microsoft"],
    views: 14890,
    commentsCount: 92
  },
  {
    id: "news-7",
    slug: "worlds-2026-esports-finals-meta-shift",
    title: "League of Legends Worlds 2026: Historic Upsets and New Jungler Meta Dominance",
    excerpt: "Quarterfinals in Seoul witness record-breaking 4.2 million concurrent viewers as European underdog topples reigning champions.",
    content: [
      "The League of Legends World Championship has reached fever pitch in Seoul. In a thrilling 5-game series, the European champions secured an unprecedented upset against the tournament favorites.",
      "The tournament meta has pivoted toward high-tempo assassin junglers, defying early analyst predictions and sparking intense tactical drafting battles."
    ],
    category: "Esports",
    author: {
      name: "Evelyn Chen",
      role: "Senior RPG & Esports Specialist",
      avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=120&h=120&q=80"
    },
    publishedAt: "2026-10-12",
    readTime: "4 min read",
    coverImage: "https://images.unsplash.com/photo-1542751110-97427bbecf20?auto=format&fit=crop&w=1200&q=80",
    featured: false,
    trending: false,
    tags: ["League of Legends", "Esports", "Worlds 2026", "Riot Games"],
    views: 31200,
    commentsCount: 304
  }
];

export const TRENDING_TOPICS = [
  { tag: "#GTA6ViceCity", count: "142.5K posts" },
  { tag: "#EldenRingPatch", count: "89.2K posts" },
  { tag: "#Switch2Launch", count: "64.1K posts" },
  { tag: "#BlackwellRTX5090", count: "48.9K posts" },
  { tag: "#MetroidPrime4", count: "33.7K posts" },
  { tag: "#SteamAutumnSale", count: "29.4K posts" }
];
