import Link from "next/link";

export default function NotFound() {
  return (
    <main data-testid="not-found" className="grid min-h-screen place-items-center bg-background px-6 text-center text-foreground">
      <div>
        <p className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">404</p>
        <h1 className="mt-3 text-3xl font-semibold">Page not found</h1>
        <Link href="/" className="mt-6 inline-block underline underline-offset-4">Back to shop</Link>
      </div>
    </main>
  );
}
