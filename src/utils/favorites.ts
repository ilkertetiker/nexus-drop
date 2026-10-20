export interface FavoriteGame {
  title: string;
  coverImage?: string;
  releaseDate?: string;
  type?: "drop" | "update";
}

const STORAGE_KEY = "nexus_favorite_games";

export function getFavoriteGames(): FavoriteGame[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function isGameFavorited(title: string): boolean {
  const favorites = getFavoriteGames();
  const normalized = title.trim().toLowerCase();
  return favorites.some((f) => f.title.trim().toLowerCase() === normalized);
}

export function toggleFavoriteGame(game: FavoriteGame): boolean {
  if (typeof window === "undefined") return false;
  const favorites = getFavoriteGames();
  const normalized = game.title.trim().toLowerCase();
  const exists = favorites.some((f) => f.title.trim().toLowerCase() === normalized);

  let updated: FavoriteGame[];
  if (exists) {
    updated = favorites.filter((f) => f.title.trim().toLowerCase() !== normalized);
  } else {
    updated = [
      ...favorites,
      {
        title: game.title,
        coverImage: game.coverImage,
        releaseDate: game.releaseDate,
        type: game.type,
      },
    ];
  }

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    window.dispatchEvent(new Event("nexus_favorites_updated"));
  } catch (e) {
    console.error("Failed to save favorites", e);
  }

  return !exists;
}
