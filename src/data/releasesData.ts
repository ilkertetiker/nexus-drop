export type ReleaseType = "drop" | "update";
export type GamingPlatform = "PC" | "PS5" | "Xbox Series X/S" | "Nintendo Switch" | "Steam Deck";

export interface GameRelease {
  id: string;
  title: string;
  releaseDate: string; // YYYY-MM-DD
  type: ReleaseType;
  genre: string[];
  platforms: GamingPlatform[];
  developer: string;
  publisher: string;
  coverImage: string;
  bannerImage: string;
  rating: string;
  hypeScore: number; // 0-100
  summary: string;
  dropDetails?: {
    price: string;
    dayOneGamePass: boolean;
    preOrderBonus?: string;
    keyFeatures: string[];
  };
  updateDetails?: {
    version: string;
    patchHighlights: string[];
    downloadSize: string;
    serverDowntime?: string;
  };
}

export const GAME_RELEASES: GameRelease[] = [
  // --- OCTOBER 2026 ---
  {
    id: "drop-1",
    title: "Ghost of Yōtei: Legend of Mount Yōtei",
    releaseDate: "2026-10-20",
    type: "drop",
    genre: ["Action-Adventure", "Open World", "Samurai"],
    platforms: ["PS5", "PC"],
    developer: "Sucker Punch Productions",
    publisher: "Sony Interactive Entertainment",
    coverImage: "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=600&q=80",
    bannerImage: "https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=1200&q=80",
    rating: "M (17+)",
    hypeScore: 98,
    summary: "Set 300 years after Ghost of Tsushima, follow Atsu as she traverses the wild wilderness surrounding Hokkaido's Mount Yōtei with dual katanas and flintlock weaponry.",
    dropDetails: {
      price: "$69.99",
      dayOneGamePass: false,
      preOrderBonus: "Ronin Wolf Companion skin & Travelers Guiding Wind talisman",
      keyFeatures: [
        "Dynamic snow drifts and avalanche weather mechanics",
        "New dual-wield melee and flintlock combat strophes",
        "Fully cinematic Akira Kurosawa audio and visual mode",
        "DualSense adaptive trigger tactile sword clashing"
      ]
    }
  },
  {
    id: "update-1",
    title: "Helldivers 2: The Automaton Siege (Patch 2.4.0)",
    releaseDate: "2026-10-20",
    type: "update",
    genre: ["Co-op Shooter", "Sci-Fi", "Third-Person"],
    platforms: ["PC", "PS5"],
    developer: "Arrowhead Game Studios",
    publisher: "PlayStation Publishing",
    coverImage: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=600&q=80",
    bannerImage: "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=1200&q=80",
    rating: "M (17+)",
    hypeScore: 89,
    summary: "Massive galactic offensive update introducing urban planet warfare, heavy walker mech customization, and laser anti-orbital stratagems.",
    updateDetails: {
      version: "Patch 2.4.0 (Urban Offensive)",
      patchHighlights: [
        "New Sub-Sector: Neon cityscape ruins on Cyberstan frontier",
        "Armored Titan Exosuit with dual quad-autocannons",
        "Ballistic shield overhaul with kinetic energy deflectors",
        "Crash fixes and 20% CPU multi-threading optimization on PC"
      ],
      downloadSize: "14.2 GB",
      serverDowntime: "1 Hour (10:00 - 11:00 UTC)"
    }
  },
  {
    id: "drop-2",
    title: "Chrono Odyssey: Realm of Temporal Ruin",
    releaseDate: "2026-10-22",
    type: "drop",
    genre: ["MMORPG", "Action", "Dark Fantasy"],
    platforms: ["PC", "PS5", "Xbox Series X/S"],
    developer: "Chrono Studio",
    publisher: "Kakao Games",
    coverImage: "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?auto=format&fit=crop&w=600&q=80",
    bannerImage: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1200&q=80",
    rating: "T (13+)",
    hypeScore: 91,
    summary: "Next-gen Unreal Engine 5 action MMORPG featuring time-manipulation combat where players manipulate chronology to reverse enemy strikes and freeze raid bosses.",
    dropDetails: {
      price: "$49.99 (Free Open Beta Available)",
      dayOneGamePass: false,
      preOrderBonus: "Chronos Guardian Mount & Early Name Reservation Ticket",
      keyFeatures: [
        "Time-warping combat: rewind mistakes and cast dual timeline spells",
        "Seamless open world spanning 12 distinct biomes",
        "Massive 100-player world boss raids with dynamic terrain destruction"
      ]
    }
  },
  {
    id: "update-2",
    title: "Cyberpunk 2077: Phantom Liberty Patch 2.3",
    releaseDate: "2026-10-23",
    type: "update",
    genre: ["RPG", "Cyberpunk", "Action"],
    platforms: ["PC", "PS5", "Xbox Series X/S"],
    developer: "CD PROJEKT RED",
    publisher: "CD PROJEKT RED",
    coverImage: "https://images.unsplash.com/photo-1563089145-599997674d42?auto=format&fit=crop&w=600&q=80",
    bannerImage: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=1200&q=80",
    rating: "M (17+)",
    hypeScore: 86,
    summary: "Night City vehicle customization terminal added to all autofixers, along with full FSR 4 and DLSS Ray Reconstruction v2 performance profiles.",
    updateDetails: {
      version: "Update 2.30",
      patchHighlights: [
        "Full vehicle body kit and interior neon tuning at all AutoFixer depots",
        "4 new repeatable high-tier courier contracts in Dogtown",
        "Police AI vehicular pursuit tactics upgrade with EMP spike strips",
        "Native HDR calibration sliders for high-nit OLED monitors"
      ],
      downloadSize: "8.6 GB",
      serverDowntime: "None (Client-side patch)"
    }
  },
  {
    id: "drop-3",
    title: "Metroid Prime 4: Beyond",
    releaseDate: "2026-10-25",
    type: "drop",
    genre: ["First-Person Adventure", "Sci-Fi", "Shooter"],
    platforms: ["Nintendo Switch"],
    developer: "Retro Studios",
    publisher: "Nintendo",
    coverImage: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=600&q=80",
    bannerImage: "https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=1200&q=80",
    rating: "T (13+)",
    hypeScore: 97,
    summary: "Samus Aran embarks on her most harrowing mission yet across mysterious alien worlds, contending with the psychic warrior Sylux and reality-bending anomalies.",
    dropDetails: {
      price: "$69.99",
      dayOneGamePass: false,
      preOrderBonus: "Metroid Prime Steelbook & Phosphor Beam keychain",
      keyFeatures: [
        "Smooth 60 FPS visual mastery with enhanced physical shader reflections",
        "Psychic morph ball traversal mechanics",
        "Seamless planet-hopping gunship missions"
      ]
    }
  },
  {
    id: "update-3",
    title: "Apex Legends: Season 27 Apex Predator Overhaul",
    releaseDate: "2026-10-27",
    type: "update",
    genre: ["Battle Royale", "Hero Shooter", "Competitive"],
    platforms: ["PC", "PS5", "Xbox Series X/S", "Nintendo Switch"],
    developer: "Respawn Entertainment",
    publisher: "Electronic Arts",
    coverImage: "https://images.unsplash.com/photo-1542751110-97427bbecf20?auto=format&fit=crop&w=600&q=80",
    bannerImage: "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=1200&q=80",
    rating: "T (13+)",
    hypeScore: 84,
    summary: "Season 27 brings a newly terraformed Olympus map, weapon balance recalibration, and an anti-cheat engine update.",
    updateDetails: {
      version: "Season 27 Patch",
      patchHighlights: [
        "Terraformed Olympus with zero-g jump towers and energy conduit transit",
        "New Legend: Vanguard - tactical fortification specialist",
        "Ranked scoring system rework emphasizing squad survival position",
        "Kernel-level anti-tamper updates"
      ],
      downloadSize: "22.5 GB",
      serverDowntime: "2 Hours (17:00 - 19:00 UTC)"
    }
  },
  {
    id: "drop-4",
    title: "Fable (Reboot)",
    releaseDate: "2026-10-30",
    type: "drop",
    genre: ["Action RPG", "Open World", "Fantasy"],
    platforms: ["Xbox Series X/S", "PC", "Steam Deck"],
    developer: "Playground Games",
    publisher: "Xbox Game Studios",
    coverImage: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=600&q=80",
    bannerImage: "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=1200&q=80",
    rating: "M (17+)",
    hypeScore: 96,
    summary: "Return to Albion in Playground Games' lush reimagining of the beloved fantasy RPG filled with whimsical British humor, moral dilemmas, and heroic glory.",
    dropDetails: {
      price: "$69.99 (Free on Game Pass)",
      dayOneGamePass: true,
      preOrderBonus: "Albion Royal Griffin Companion & Hero of Oakvale Attire",
      keyFeatures: [
        "Every choice alters your hero's appearance, horns, halo, and villager reactions",
        "Proprietary ForzaTech foliage and photorealistic ecosystem simulation",
        "Full co-op adventure mode across the continent of Albion"
      ]
    }
  },

  // --- NOVEMBER 2026 ---
  {
    id: "drop-5",
    title: "Death Stranding 2: On The Beach",
    releaseDate: "2026-11-06",
    type: "drop",
    genre: ["Cinematic Adventure", "Sci-Fi", "Action"],
    platforms: ["PS5"],
    developer: "Kojima Productions",
    publisher: "Sony Interactive Entertainment",
    coverImage: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=600&q=80",
    bannerImage: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1200&q=80",
    rating: "M (17+)",
    hypeScore: 99,
    summary: "Hideo Kojima presents the continuation of Sam Porter Bridges' journey beyond the United Cities of America aboard the Magellan airship.",
    dropDetails: {
      price: "$69.99",
      dayOneGamePass: false,
      preOrderBonus: "Golden Skeleton Rig & Magellan Mascot Patch",
      keyFeatures: [
        "Unprecedented natural disaster simulations: flash floods, forest fires, earthquakes",
        "Modular armed delivery vehicles with autonomous autopilot delivery drones",
        "Star-studded cast starring Norman Reedus, Léa Seydoux, and Elle Fanning"
      ]
    }
  },
  {
    id: "update-4",
    title: "World of Warcraft: The War Within - Patch 11.2 (Void Incursion)",
    releaseDate: "2026-11-10",
    type: "update",
    genre: ["MMORPG", "Fantasy"],
    platforms: ["PC"],
    developer: "Blizzard Entertainment",
    publisher: "Blizzard Entertainment",
    coverImage: "https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=600&q=80",
    bannerImage: "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=1200&q=80",
    rating: "T (13+)",
    hypeScore: 88,
    summary: "New 9-boss raid tier 'Heart of the Void', cross-faction warband housing preview, and mythical keystone season 3.",
    updateDetails: {
      version: "Patch 11.2.0",
      patchHighlights: [
        "New Raid: Abyss of Xal'atath featuring 9 legendary encounters",
        "Warband Garrison Apartments: customizable player lounges in Dornogal",
        "Hero Talent tree branch expansions for all 39 specializations",
        "UI accessibility contrast enhancements and native gamepad navigation"
      ],
      downloadSize: "18.4 GB",
      serverDowntime: "4 Hours (07:00 - 11:00 PST)"
    }
  },
  {
    id: "drop-6",
    title: "DOOM: The Dark Ages",
    releaseDate: "2026-11-13",
    type: "drop",
    genre: ["FPS", "Dark Fantasy", "Action"],
    platforms: ["PC", "PS5", "Xbox Series X/S"],
    developer: "id Software",
    publisher: "Bethesda Softworks",
    coverImage: "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=600&q=80",
    bannerImage: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1200&q=80",
    rating: "M (17+)",
    hypeScore: 97,
    summary: "The cinematic prequel origin story of the Doom Slayer's rage. Wield the brutal Shield Saw and pilot massive Atlan mechs in dark medieval warfare against Hell.",
    dropDetails: {
      price: "$69.99 (Day One on Game Pass)",
      dayOneGamePass: true,
      preOrderBonus: "Blood Armor Skin & Dragon Skull Shield ornament",
      keyFeatures: [
        "The Shield Saw: block incoming demon fire and slice foes in half",
        "Heavy mech combat: control the colossal Atlan robot in planetary sieges",
        "Raw, heavy metal score composed with custom analog distortion synths"
      ]
    }
  },
  {
    id: "update-5",
    title: "Valorant: Episode 10 Act 2 Tactical Update",
    releaseDate: "2026-11-17",
    type: "update",
    genre: ["Tactical Shooter", "Esports", "FPS"],
    platforms: ["PC", "PS5", "Xbox Series X/S"],
    developer: "Riot Games",
    publisher: "Riot Games",
    coverImage: "https://images.unsplash.com/photo-1542751110-97427bbecf20?auto=format&fit=crop&w=600&q=80",
    bannerImage: "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=1200&q=80",
    rating: "T (13+)",
    hypeScore: 85,
    summary: "Rebalanced map pool, replay system beta release for desktop users, and Agent Astra ability revisions.",
    updateDetails: {
      version: "Patch 10.04",
      patchHighlights: [
        "In-engine Desktop Replay System: analyze match POVs with freecam",
        "Agent Astra utility speed increased by 15%",
        "Anti-smurf MMR calibration algorithm deployed to competitive queues"
      ],
      downloadSize: "5.1 GB",
      serverDowntime: "2 Hours"
    }
  },
  {
    id: "drop-7",
    title: "Monster Hunter Wilds: Winter Expansion Pack",
    releaseDate: "2026-11-20",
    type: "drop",
    genre: ["Action RPG", "Hunting", "Co-op"],
    platforms: ["PC", "PS5", "Xbox Series X/S"],
    developer: "Capcom",
    publisher: "Capcom",
    coverImage: "https://images.unsplash.com/photo-1563089145-599997674d42?auto=format&fit=crop&w=600&q=80",
    bannerImage: "https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=1200&q=80",
    rating: "T (13+)",
    hypeScore: 95,
    summary: "Hunt colossal apex predators across the glacial peaks of the Forbidden Lands. Features seamless expedition camp customization and cross-platform lobby search.",
    dropDetails: {
      price: "$39.99 (Base game required)",
      dayOneGamePass: false,
      preOrderBonus: "Glacial Palico Fur Coat & Seikret Ice Crest Armor",
      keyFeatures: [
        "Master Rank hunts with hyper-aggressive blizzard ecosystem phases",
        "Seikret mount glider upgrades for aerial plunging attacks",
        "14 weapon classes receive new cinematic Focus Mode switch skills"
      ]
    }
  },
  {
    id: "update-6",
    title: "Fortnite Chapter 7: Zero Hour Core Engine Update",
    releaseDate: "2026-11-28",
    type: "update",
    genre: ["Battle Royale", "Sandbox"],
    platforms: ["PC", "PS5", "Xbox Series X/S", "Nintendo Switch"],
    developer: "Epic Games",
    publisher: "Epic Games",
    coverImage: "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?auto=format&fit=crop&w=600&q=80",
    bannerImage: "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=1200&q=80",
    rating: "T (13+)",
    hypeScore: 89,
    summary: "Unreal Engine 5.6 Nanite cloth physics, full custom keybind profiles per vehicle class, and the new Cyber-Island biome.",
    updateDetails: {
      version: "v34.00",
      patchHighlights: [
        "New Cyber-Island map with magnetic rail transit and anti-gravity zones",
        "First-person weapon sight attachments in Battle Royale modes",
        "Physics simulation upgrades: destructible terrain bridges"
      ],
      downloadSize: "26.3 GB",
      serverDowntime: "3.5 Hours"
    }
  },

  // --- DECEMBER 2026 ---
  {
    id: "drop-8",
    title: "Judas",
    releaseDate: "2026-12-04",
    type: "drop",
    genre: ["First-Person Narrative", "Immersive Sim", "Sci-Fi"],
    platforms: ["PC", "PS5", "Xbox Series X/S"],
    developer: "Ghost Story Games",
    publisher: "Take-Two Interactive",
    coverImage: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=600&q=80",
    bannerImage: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=1200&q=80",
    rating: "M (17+)",
    hypeScore: 94,
    summary: "From Ken Levine, creator of System Shock 2 and BioShock. A disintegrating starship. A desperate escape plan. You are the mysterious Judas. Your only hope of survival is to make or break alliances with your worst enemies.",
    dropDetails: {
      price: "$69.99",
      dayOneGamePass: false,
      preOrderBonus: "Mayflower Spacecraft Audio Log Archive & Retro Wrench Skin",
      keyFeatures: [
        "Narrative LEGO mechanics: characters learn, remember, and react to your betrayal",
        "Bizarre bio-mechanical weapons and elemental organic powers",
        "Dynamic starship corridors that restructure during hull breaches"
      ]
    }
  },
  {
    id: "update-7",
    title: "Diablo IV: Vessel of Hatred - Mid-Season Balance (Patch 2.2)",
    releaseDate: "2026-12-08",
    type: "update",
    genre: ["Action RPG", "Hack and Slash"],
    platforms: ["PC", "PS5", "Xbox Series X/S"],
    developer: "Blizzard Entertainment",
    publisher: "Blizzard Entertainment",
    coverImage: "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=600&q=80",
    bannerImage: "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=1200&q=80",
    rating: "M (17+)",
    hypeScore: 82,
    summary: "Dark Citadel raid tuning, Spiritborn legendary aspect adjustments, and loot drop rate improvements in Torment IV.",
    updateDetails: {
      version: "Patch 2.2.1",
      patchHighlights: [
        "Mythic Unique crafting pity system introduced at the Blacksmith",
        "Kurast Undercity boss run timer extended by 20 seconds",
        "Spiritborn soaring eagle skills bugfixes"
      ],
      downloadSize: "4.8 GB",
      serverDowntime: "1 Hour"
    }
  },
  {
    id: "drop-9",
    title: "Marvel's Wolverine",
    releaseDate: "2026-12-15",
    type: "drop",
    genre: ["Action-Adventure", "Superhero", "Mature"],
    platforms: ["PS5"],
    developer: "Insomniac Games",
    publisher: "Sony Interactive Entertainment",
    coverImage: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=600&q=80",
    bannerImage: "https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=1200&q=80",
    rating: "M (17+)",
    hypeScore: 99,
    summary: "Insomniac Games delivers a gritty, standalone adventure with Logan slicing through Madripoor, the Canadian wilderness, and weapon X facilities.",
    dropDetails: {
      price: "$69.99",
      dayOneGamePass: false,
      preOrderBonus: "Classic 90s Brown & Tan Suit and Weapon X Prototype Claws",
      keyFeatures: [
        "Visceral, dismemberment-enabled Adamantium claw combat",
        "Heightened animal scent tracking and thermal instincts",
        "Emotional narrative delving into Logan's scarred memories"
      ]
    }
  }
];
