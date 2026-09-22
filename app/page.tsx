import Link from "next/link";

import { ProductCard } from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { products } from "@/data/products";

export default function Home() {
  return (
    <main className="min-h-screen overflow-x-hidden bg-background text-foreground">
      <header className="border-b border-border bg-background/95 px-5 backdrop-blur-md sm:px-8 lg:px-12">
        <div className="mx-auto flex h-[78px] max-w-[1440px] items-center justify-end md:justify-between">
          <nav className="hidden items-center gap-8 text-sm font-medium md:flex" aria-label="Main navigation">
            <HoverCard openDelay={120} closeDelay={80}>
              <HoverCardTrigger asChild>
                <a className="rounded-md px-3 py-2 font-serif text-xl font-semibold italic tracking-wide transition-colors hover:bg-accent hover:text-accent-foreground"href="#shop">Shop</a>
              </HoverCardTrigger>
              <HoverCardContent align="start" className="flex w-50 flex-col gap-0.3">
                <div className="font-semibold">@fer202</div>
                  <div>Lab 2 by Phuong Thao</div>
                  <div className="mt-1 text-xs text-muted-foreground">
                    September 2026
                  </div>
              </HoverCardContent>
            </HoverCard>
          </nav>

          <div className="flex items-center gap-2 sm:gap-3">
            <Button variant="secondary" asChild className="rounded-full px-3 sm:px-4 hover:-translate-y-0.5 sm:px-5">
              <Link href="/login" data-testid="btn-login">Login</Link>
            </Button>
            <Button variant="outline" asChild className="rounded-full px-4 shadow-sm transition-transform hover:-translate-y-0.5 sm:px-5">
              <Link href="/register" data-testid="btn-register">Register</Link>
            </Button>
          </div>
        </div>
      </header>

      <section id="shop" className="px-5 py-14 sm:px-8 sm:py-20 lg:px-12">
        <div className="mx-auto max-w-[1440px]">
          <div data-testid="product-list" className="grid grid-cols-1 gap-x-5 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {products.map((product, index) => (
              <ProductCard key={product.id} product={product} index={index} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
