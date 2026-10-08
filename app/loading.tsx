export default function Loading() {
  return (
    <main data-testid="loading" className="grid min-h-screen place-items-center bg-background">
      <span className="size-8 animate-spin rounded-full border-2 border-muted border-t-primary" aria-label="Loading" />
    </main>
  );
}
