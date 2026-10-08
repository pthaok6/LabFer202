"use client";

export default function ErrorPage({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <main data-testid="error-boundary" className="grid min-h-screen place-items-center bg-background px-5 text-center text-foreground">
      <div>
        <h1 className="text-2xl font-semibold">Something went wrong</h1>
        <p className="mt-3 text-sm text-muted-foreground">{error.message}</p>
        <button type="button" data-testid="btn-retry" onClick={() => reset()} className="mt-6 rounded-md bg-primary px-5 py-2 text-primary-foreground">Try again</button>
      </div>
    </main>
  );
}
