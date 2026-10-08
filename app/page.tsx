import { HeaderAuthActions } from "@/components/HeaderAuthActions";
import { ProductCard } from "@/components/ProductCard";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { categories, filterProducts } from "@/data/products";

type HomeProps = {
  searchParams: Promise<{ q?: string | string[]; category?: string | string[] }>;
};

export default async function Home({ searchParams }: HomeProps) {
  const params = await searchParams;
  const q = typeof params.q === "string" ? params.q : "";
  const category = typeof params.category === "string" ? params.category : "";
  const selectedCategory = categories.find((item) => item.toLowerCase() === category.trim().toLowerCase()) ?? category;
  const matchingProducts = filterProducts(q, category);

  return (
    <main className="min-h-screen overflow-x-hidden bg-background text-foreground">
      <header className="border-b border-border bg-background/95 px-5 backdrop-blur-md sm:px-8 lg:px-12">
        <div className="mx-auto flex h-[78px] max-w-[1440px] items-center justify-end md:justify-between">
          <nav className="hidden items-center gap-8 text-sm font-medium md:flex" aria-label="Main navigation">
            <HoverCard openDelay={120} closeDelay={80}>
              <HoverCardTrigger asChild>
                <a className="rounded-md px-3 py-2 font-serif text-xl font-semibold italic tracking-wide transition-colors hover:bg-accent hover:text-accent-foreground" href="#shop">Shop</a>
              </HoverCardTrigger>
              <HoverCardContent align="start" className="flex w-50 flex-col gap-0.3">
                <div className="font-semibold">@fer202</div>
                  <div>Lab FER by Phuong Thao</div>
                  <div className="mt-1 text-xs text-muted-foreground">
                    September 2026
                  </div>
              </HoverCardContent>
            </HoverCard>
          </nav>

          <HeaderAuthActions />
        </div>
      </header>

      <section id="shop" className="px-5 py-14 sm:px-8 sm:py-20 lg:px-12">
        <div className="mx-auto max-w-[1440px]">
          <form method="get" action="/" className="mb-10 flex flex-col gap-3 sm:flex-row sm:items-end">
            <label className="flex flex-1 flex-col gap-2 text-sm font-medium">
              Search products
              <input name="q" data-testid="search-input" type="search" defaultValue={q} placeholder="Search by name or description" className="h-10 rounded-md border border-input bg-background px-3 text-foreground outline-none focus-visible:ring-2 focus-visible:ring-ring" />
            </label>
            <label className="flex flex-col gap-2 text-sm font-medium sm:w-48">
              Category
              <select name="category" data-testid="category-select" defaultValue={selectedCategory} className="h-10 rounded-md border border-input bg-background px-3 text-foreground outline-none focus-visible:ring-2 focus-visible:ring-ring">
                <option value="">All</option>
                {categories.map((item) => <option key={item} value={item}>{item}</option>)}
              </select>
            </label>
            <button type="submit" data-testid="btn-search" className="h-10 rounded-md bg-primary px-6 font-medium text-primary-foreground hover:bg-primary/90">Search</button>
          </form>
          {matchingProducts.length > 0 ? (
            <div data-testid="product-list" className="grid grid-cols-1 gap-x-5 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {matchingProducts.map((product, index) => (
                <ProductCard key={product.id} product={product} index={index} />
              ))}
            </div>
          ) : (
            <p data-testid="no-results" className="rounded-xl border border-border bg-muted/40 px-6 py-12 text-center text-muted-foreground">No products found.</p>
          )}
        </div>
      </section>
    </main>
  );
}
