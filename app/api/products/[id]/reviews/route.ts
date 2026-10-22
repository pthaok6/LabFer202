import { NextResponse } from "next/server";
import { findProduct } from "@/data/products";
import { getProductReviews, reviewSummary } from "@/lib/reviews";

export async function GET(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const product = findProduct(id);
  if (!product) return NextResponse.json({ error: "Product not found" }, { status: 404 });
  const reviews = await getProductReviews(product.id);
  return NextResponse.json({ ...reviewSummary(reviews), reviews });
}
