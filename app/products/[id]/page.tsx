import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { FavoriteButton } from "@/components/FavoriteButton";
import { Card, CardContent } from "@/components/ui/card";
import { findProduct, formatPrice, products } from "@/data/products";
import { getProductReviews, reviewSummary } from "@/lib/reviews";
import { ReviewsProvider, ReviewsPanel } from "@/contexts/ReviewsContext";

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
  const initialReviews = await getProductReviews(product.id);
  const { average, count } = reviewSummary(initialReviews);

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
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span data-testid="rating-average" className="font-semibold text-foreground">{average}</span>
              <span>average ·</span>
              <span data-testid="review-count">{count}</span>
              <span>reviews</span>
            </div>
          </CardContent>
        </Card>
        <ReviewsProvider initialReviews={initialReviews} productId={product.id}>
          <ReviewsPanel productId={product.id} />
        </ReviewsProvider>
      </div>
    </main>
  );
}
