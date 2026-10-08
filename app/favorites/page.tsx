"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { Card, CardContent } from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext";
import { useFavorites } from "@/contexts/FavoritesContext";
import { formatPrice, products } from "@/data/products";

export default function FavoritesPage() {
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();
  const { favorites, loading: favoritesLoading, error } = useFavorites();

  useEffect(() => {
    if (!authLoading && !user) router.replace("/login");
  }, [authLoading, router, user]);

  if (authLoading || !user) return null;

  const favoriteProducts = products.filter((product) => favorites.includes(product.id));

  return (
    <main data-testid="favorites-page" className="min-h-screen bg-background px-5 py-10 text-foreground sm:px-8 lg:px-12">
      <div className="mx-auto max-w-4xl">
        <Link href="/" className="text-sm font-medium text-muted-foreground underline underline-offset-4">Back to shop</Link>
        <h1 className="mb-8 mt-6 text-3xl font-semibold tracking-tight">Your favorites</h1>
        {favoritesLoading ? (
          <p role="status" className="text-muted-foreground">Loading favorites...</p>
        ) : error && favoriteProducts.length === 0 ? (
          <p role="alert" className="text-destructive">{error}</p>
        ) : favoriteProducts.length === 0 ? (
          <p data-testid="favorites-empty" className="rounded-xl border border-border bg-muted/40 p-8 text-muted-foreground">You have no favorites yet.</p>
        ) : (
          <div className="grid gap-4">
            {favoriteProducts.map((product) => (
              <Card key={product.id} data-testid="favorite-item" className="bg-card text-card-foreground">
                <CardContent className="flex flex-wrap items-center justify-between gap-4 p-5">
                  <div>
                    <h2 className="font-semibold">{product.name}</h2>
                    <p className="text-sm text-muted-foreground">{formatPrice(product.price)}</p>
                  </div>
                  <Link href={`/products/${product.id}`} className="text-sm font-medium underline underline-offset-4">View details</Link>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
        {error && favoriteProducts.length > 0 && <p role="alert" className="mt-4 text-sm text-destructive">{error}</p>}
      </div>
    </main>
  );
}
