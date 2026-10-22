import { createClient } from "@supabase/supabase-js";

export type Review = {
  id: number;
  product_id: number;
  rating: number;
  comment: string;
  author: string;
  user_id: string;
  created_at: string;
};

export function createReviewsReader() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  return url && key ? createClient(url, key) : null;
}

export async function getProductReviews(productId: number): Promise<Review[]> {
  const client = createReviewsReader();
  if (!client) return [];
  const { data, error } = await client
    .from("reviews")
    .select("id, product_id, rating, comment, author, user_id, created_at")
    .eq("product_id", productId)
    .order("created_at", { ascending: false });
  if (error) {
    console.error("Unable to read reviews:", error.message);
    return [];
  }
  return (data ?? []) as Review[];
}

export function reviewSummary(reviews: Review[]) {
  const count = reviews.length;
  const average = count
    ? Math.round((reviews.reduce((sum, review) => sum + review.rating, 0) / count) * 10) / 10
    : 0;
  return { average, count };
}
