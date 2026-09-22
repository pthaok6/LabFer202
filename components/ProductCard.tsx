import Image from "next/image";
import type { Product } from "@/data/products";
import { Card, CardContent } from "@/components/ui/card";

export function ProductCard({ product, index }: { product: Product; index: number }) {
  return (
    <Card data-testid="product-card" className="group overflow-hidden rounded-2xl border-border bg-card text-card-foreground shadow-sm transition-[transform,box-shadow,border-color] duration-300 ease-out hover:-translate-y-2 hover:border-primary/35 hover:shadow-xl">
      <div className="relative aspect-[4/4.7] overflow-hidden bg-muted">
        {product.tag && <span className="absolute left-4 top-4 z-10 rounded-full bg-card px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.12em] text-card-foreground shadow-sm">{product.tag}</span>}
        <span className="absolute right-4 top-4 z-10 text-[11px] font-bold text-muted-foreground">0{index + 1}</span>
        <Image data-testid="product-image" src={product.image} alt={product.imageAlt} fill sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, (max-width: 1279px) 33vw, 25vw" className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.035]" />
      </div>
      <CardContent className="p-5">
        <div className="flex items-start justify-between gap-4">
          <h3 data-testid="product-name" className="text-[17px] font-bold tracking-[-0.025em] text-card-foreground">{product.name}</h3>
          <p data-testid="product-price" className="shrink-0 text-sm font-bold text-card-foreground">{product.price}</p>
        </div>
        <p data-testid="product-description" className="mt-2 max-w-[92%] text-sm leading-6 text-muted-foreground">{product.description}</p>
      </CardContent>
    </Card>
  );
}
