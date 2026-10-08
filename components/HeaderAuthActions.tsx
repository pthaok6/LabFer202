"use client";

import { useState } from "react";
import Link from "next/link";

import { useAuth } from "@/contexts/AuthContext";
import { useFavorites } from "@/contexts/FavoritesContext";
import { Button } from "@/components/ui/button";

export function HeaderAuthActions() {
  const { user, loading, signOut } = useAuth();
  const { favorites } = useFavorites();
  const [signingOut, setSigningOut] = useState(false);

  if (loading) {
    return <div className="h-9 w-40 animate-pulse rounded-full bg-muted" aria-label="Loading account" />;
  }

  if (user) {
    const handleSignOut = async () => {
      setSigningOut(true);
      await signOut();
      setSigningOut(false);
    };

    return (
      <div className="flex min-w-0 items-center gap-2 sm:gap-3">
        <Link href="/favorites" data-testid="link-favorites" className="rounded-full px-2 py-2 text-sm font-medium text-foreground hover:bg-accent sm:px-3">
          Favorites <span data-testid="favorites-count">{favorites.length}</span>
        </Link>
        <Link
          href="/account"
          data-testid="user-email"
          className="max-w-36 truncate text-sm font-medium text-muted-foreground transition-colors hover:text-foreground sm:max-w-64"
        >
          {user.email}
        </Link>
        <Button
          type="button"
          variant="outline"
          data-testid="btn-logout"
          disabled={signingOut}
          onClick={handleSignOut}
          className="rounded-full"
        >
          {signingOut ? "Logging out..." : "Logout"}
        </Button>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2 sm:gap-3">
      <Button variant="secondary" asChild className="rounded-full px-3 transition-transform hover:-translate-y-0.5 sm:px-5">
        <Link href="/login" data-testid="btn-login">Login</Link>
      </Button>
      <Button variant="outline" asChild className="rounded-full px-4 shadow-sm transition-transform hover:-translate-y-0.5 sm:px-5">
        <Link href="/register" data-testid="btn-register">Register</Link>
      </Button>
    </div>
  );
}
