"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export default function AccountPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.replace("/login");
    }
  }, [loading, router, user]);

  if (loading) {
    return (
      <main className="grid min-h-screen place-items-center bg-background">
        <span className="size-8 animate-spin rounded-full border-2 border-muted border-t-primary" aria-label="Loading account" />
      </main>
    );
  }

  if (!user) return null;

  return (
    <main className="grid min-h-screen place-items-center bg-muted/40 px-4 py-10">
      <Card data-testid="account-page" className="w-full max-w-lg">
        <CardHeader>
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-muted-foreground">Account</p>
          <h1 className="text-3xl font-semibold tracking-tight">You are signed in</h1>
        </CardHeader>
        <CardContent className="grid gap-6">
          <div className="rounded-xl border border-border bg-muted/50 p-4">
            <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Email</p>
            <p data-testid="account-email" className="mt-1 break-all font-semibold">{user.email}</p>
          </div>
          <Link href="/" className="text-sm font-semibold underline underline-offset-4">Back to shop</Link>
        </CardContent>
      </Card>
    </main>
  );
}
