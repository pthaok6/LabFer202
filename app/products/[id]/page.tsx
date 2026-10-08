import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { FavoriteButton } from "@/components/FavoriteButton";
import { Card, CardContent } from "@/components/ui/card";
import { findProduct, formatPrice, products } from "@/data/products";

type ProductPageProps = { params: Promise<{ id: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return products.map((product) => ({ id: String(product.id) }));
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { id } = await params;
  const product = findProduct(id);

  return { title: product ? `${product.name} | Product Collection` : "Product not found | Product Collection" };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params;
  const product = findProduct(id);
  if (!product) notFound();

  return (
    <main data-testid="product-detail" className="min-h-screen bg-background px-5 py-10 text-foreground sm:px-8 lg:px-12">
      <div className="mx-auto max-w-6xl">
        <Link href="/" data-testid="link-back" className="mb-8 inline-block text-sm font-medium text-muted-foreground underline underline-offset-4 hover:text-foreground">Back to shop</Link>
        <Card className="overflow-hidden border-border bg-card text-card-foreground md:grid md:grid-cols-2">
          <div className="relative aspect-square bg-muted">
            <Image src={product.image} alt={product.imageAlt} fill priority sizes="(max-width: 767px) 100vw, 50vw" className="object-cover" />
          </div>
          <CardContent className="flex flex-col justify-center gap-5 p-6 sm:p-10">
            <p data-testid="detail-category" className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">{product.category}</p>
            <h1 data-testid="detail-name" className="text-4xl font-semibold tracking-tight">{product.name}</h1>
            <p data-testid="detail-price" className="text-2xl font-semibold">{formatPrice(product.price)}</p>
            <p data-testid="detail-description" className="leading-7 text-muted-foreground">{product.description}</p>
            <FavoriteButton productId={product.id} showLabel className="mt-3 w-fit" />
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
