"use client";

import { useRouter } from "next/navigation";

import { useAuth } from "@/contexts/AuthContext";
import { useFavorites } from "@/contexts/FavoritesContext";

export function FavoriteButton({
  productId,
  showLabel = false,
  className = "",
}: {
  productId: number;
  showLabel?: boolean;
  className?: string;
}) {
  const router = useRouter();
  const { user } = useAuth();
  const { isFavorite, toggleFavorite } = useFavorites();
  const pressed = isFavorite(productId);

  return (
    <button
      type="button"
      data-testid="btn-favorite"
      aria-pressed={pressed}
      aria-label={pressed ? "Remove from favorites" : "Add to favorites"}
      onClick={() => {
        if (!user) {
          router.push("/login");
          return;
        }
        void toggleFavorite(productId);
      }}
      className={`inline-flex items-center justify-center gap-2 rounded-full border border-border bg-card px-3 py-2 text-sm font-medium text-card-foreground shadow-sm transition-colors hover:bg-accent ${className}`}
    >
      <span aria-hidden="true" className={pressed ? "text-destructive" : "text-muted-foreground"}>{pressed ? "♥" : "♡"}</span>
      {showLabel && <span>{pressed ? "Saved" : "Save to favorites"}</span>}
    </button>
  );
}
