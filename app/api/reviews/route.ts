import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import { findProduct } from "@/data/products";
import { reviewSchema } from "@/lib/reviewSchema";
import { createReviewsReader } from "@/lib/reviews";

export async function POST(request: Request) {
  const authorization = request.headers.get("authorization");
  const match = authorization?.match(/^Bearer\s+(.+)$/i);
  const token = match?.[1];
  const base = createReviewsReader();
  if (!token || !base) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { data: authData, error: authError } = await base.auth.getUser(token);
  if (authError || !authData.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  let body: unknown;
  try { body = await request.json(); } catch {
    return NextResponse.json({ error: "Invalid input", issues: [{ message: "Invalid JSON body" }] }, { status: 400 });
  }
  const parsed = reviewSchema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: "Invalid input", issues: parsed.error.issues }, { status: 400 });
  const product = findProduct(String(parsed.data.product_id));
  if (!product) return NextResponse.json({ error: "Product not found" }, { status: 404 });

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
  const client = (await import("@supabase/supabase-js")).createClient(url, key, {
    global: { headers: { Authorization: `Bearer ${token}` } },
  });
  const { data, error } = await client.from("reviews")
    .insert({ product_id: parsed.data.product_id, rating: parsed.data.rating, comment: parsed.data.comment })
    .select("id, product_id, rating, comment, author, created_at").single();
  if (error?.code === "23505") return NextResponse.json({ error: "You already reviewed this product" }, { status: 409 });
  if (error) return NextResponse.json({ error: "Unable to save review" }, { status: 400 });
  revalidatePath(`/products/${parsed.data.product_id}`);
  return NextResponse.json(data, { status: 201 });
}
