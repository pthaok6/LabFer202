"use client";

import { createContext, useCallback, useContext, useMemo, useReducer, useState, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { Review } from "@/lib/reviews";
import { reviewSchema, type ReviewInput } from "@/lib/reviewSchema";
import { supabase } from "@/lib/supabaseClient";
import { useAuth } from "@/contexts/AuthContext";

type Action = { type: "SET"; reviews: Review[] } | { type: "ADD" | "UPDATE"; review: Review } | { type: "REMOVE"; id: number };
function reducer(state: Review[], action: Action): Review[] {
  switch (action.type) {
    case "SET": return action.reviews;
    case "ADD": return [action.review, ...state];
    case "UPDATE": return state.map((review) => review.id === action.review.id ? action.review : review);
    case "REMOVE": return state.filter((review) => review.id !== action.id);
  }
}

type ReviewsContextValue = {
  reviews: Review[];
  myReview: Review | null;
  submitReview: (rating: number, comment: string) => Promise<void>;
  updateReview: (rating: number, comment: string) => Promise<void>;
  deleteReview: () => Promise<void>;
};
const ReviewsContext = createContext<ReviewsContextValue | undefined>(undefined);

export function ReviewsProvider({ initialReviews, productId, children }: { initialReviews: Review[]; productId: number; children: ReactNode }) {
  const [reviews, dispatch] = useReducer(reducer, initialReviews);
  const { user, session } = useAuth();
  const router = useRouter();
  const myReview = reviews.find((review) => review.user_id === user?.id) ?? null;

  const submitReview = useCallback(async (rating: number, comment: string) => {
    if (!session?.access_token) throw new Error("Please sign in to submit a review.");
    const response = await fetch("/api/reviews", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${session.access_token}` },
      body: JSON.stringify({ product_id: productId, rating, comment }),
    });
    const result = await response.json();
    if (!response.ok) throw new Error(result.error ?? "Unable to submit review.");
    dispatch({ type: "ADD", review: { ...result, user_id: session.user.id } as Review });
    router.refresh();
  }, [productId, router, session]);

  const updateReview = useCallback(async (rating: number, comment: string) => {
    if (!supabase || !myReview) throw new Error("Unable to update review.");
    const { data, error } = await supabase.from("reviews").update({ rating, comment })
      .eq("id", myReview.id).select("id, product_id, rating, comment, author, user_id, created_at").single();
    if (error) throw new Error(error.message);
    dispatch({ type: "UPDATE", review: data as Review });
  }, [myReview]);

  const deleteReview = useCallback(async () => {
    if (!supabase || !myReview) throw new Error("Unable to delete review.");
    const previous = reviews;
    dispatch({ type: "REMOVE", id: myReview.id });
    const { error } = await supabase.from("reviews").delete().eq("id", myReview.id);
    if (error) {
      dispatch({ type: "SET", reviews: previous });
      throw new Error(error.message);
    }
    router.refresh();
  }, [myReview, reviews, router]);

  const value = useMemo(() => ({ reviews, myReview, submitReview, updateReview, deleteReview }), [reviews, myReview, submitReview, updateReview, deleteReview]);
  return <ReviewsContext.Provider value={value}>{children}</ReviewsContext.Provider>;
}

export function useReviews() {
  const context = useContext(ReviewsContext);
  if (!context) throw new Error("useReviews must be used inside ReviewsProvider");
  return context;
}

function ReviewForm({ productId, initial, onSubmit, submitLabel }: { productId: number; initial?: Review; onSubmit: (rating: number, comment: string) => Promise<void>; submitLabel: string }) {
  const [serverError, setServerError] = useState("");
  const form = useForm<ReviewInput>({
    resolver: zodResolver(reviewSchema),
    defaultValues: { product_id: productId, rating: initial?.rating ?? 0, comment: initial?.comment ?? "" },
  });
  const selectedRating = form.watch("rating");
  const submit = form.handleSubmit(async ({ rating, comment }) => {
    setServerError("");
    try { await onSubmit(rating, comment); }
    catch (error) { setServerError(error instanceof Error ? error.message : "Unable to save review."); }
  });
  return <form data-testid="review-form" onSubmit={submit} className="grid gap-3">
    <input type="hidden" {...form.register("product_id", { valueAsNumber: true })} />
    <fieldset className="grid gap-10">
      <legend className="text-sm font-medium">Rating</legend>
      <div data-testid="input-rating" role="radiogroup" aria-label="Rating" className="mt-2 flex w-fit items-center gap-0.5 rounded-md border border-input bg-background px-3 py-1">
        {[1, 2, 3, 4, 5].map((rating) => (
          <label key={rating} className="cursor-pointer rounded-full p-0.5 focus-within:outline-2 focus-within:outline-offset-1 focus-within:outline-ring" title={`${rating} ${rating === 1 ? "star" : "stars"}`}>
            <input
              className="sr-only"
              type="radio"
              value={rating}
              aria-label={`${rating} ${rating === 1 ? "star" : "stars"}`}
              {...form.register("rating", { valueAsNumber: true })}
            />
            <span aria-hidden="true" className={`block text-[2rem] leading-none ${rating <= selectedRating ? "text-amber-400" : "text-neutral-400"}`}>
              {rating <= selectedRating ? "★" : "☆"}
            </span>
          </label>
        ))}
      </div>
    </fieldset>
    {form.formState.errors.rating && <p data-testid="error-rating" className="text-sm text-red-600">Choose a rating from 1 to 5.</p>}
    <label className="grid gap-1 text-sm font-medium">Comment
      <textarea data-testid="input-comment" maxLength={500} rows={4} className="rounded-md border border-input bg-background p-3" {...form.register("comment")} />
    </label>
    {form.formState.errors.comment && <p data-testid="error-comment" className="text-sm text-red-600">Comment must contain 1 to 500 characters.</p>}
    {serverError && <p data-testid="error-review" role="alert" className="text-sm text-red-600">{serverError}</p>}
    <button data-testid="btn-submit-review" disabled={form.formState.isSubmitting} className="w-fit rounded-md bg-primary px-4 py-2 font-medium text-primary-foreground disabled:opacity-50">{submitLabel}</button>
  </form>;
}

export function ReviewsPanel({ productId }: { productId: number }) {
  const { reviews, myReview, submitReview, updateReview, deleteReview } = useReviews();
  const { user } = useAuth();
  const [editing, setEditing] = useState(false);
  const [deleteError, setDeleteError] = useState("");
  const [submissionSuccess, setSubmissionSuccess] = useState(false);
  return <section className="mt-10 border-t border-border pt-8">
    <h2 className="mb-5 text-2xl font-semibold">Reviews</h2>
    {submissionSuccess && <p data-testid="review-success" role="status" className="mb-4 text-sm text-green-700">Review saved.</p>}
    {!user ? <LinkLogin /> : myReview ? <div className="mb-6">
      {editing ? <ReviewForm productId={productId} initial={myReview} onSubmit={async (rating, comment) => { await updateReview(rating, comment); setEditing(false); setSubmissionSuccess(true); }} submitLabel="Save changes" /> : <div className="flex gap-3">
        <button data-testid="btn-edit-review" onClick={() => setEditing(true)} className="rounded-md border px-3 py-2 text-sm">Edit my review</button>
        <button data-testid="btn-delete-review" onClick={async () => { setDeleteError(""); try { await deleteReview(); } catch (e) { setDeleteError(e instanceof Error ? e.message : "Unable to delete review."); } }} className="rounded-md border px-3 py-2 text-sm">Delete my review</button>
      </div>}
      {deleteError && <p data-testid="error-review" className="mt-2 text-sm text-red-600">{deleteError}</p>}
    </div> : <div className="mb-6"><ReviewForm productId={productId} onSubmit={async (rating, comment) => { await submitReview(rating, comment); setSubmissionSuccess(true); }} submitLabel="Submit review" /></div>}
    <div className="grid gap-4">{reviews.length === 0 ? <p data-testid="reviews-empty" className="text-sm text-muted-foreground">No reviews yet.</p> : reviews.map((review) => <article key={review.id} data-testid="review-item" className="rounded-lg border border-border p-4">
      <div className="flex justify-between gap-4"><strong data-testid="review-author">{review.author}</strong><span data-testid="review-rating">{review.rating}</span></div>
      <p data-testid="review-comment" className="mt-2 whitespace-pre-wrap">{review.comment}</p>
    </article>)}</div>
  </section>;
}

function LinkLogin() {
  return <p className="mb-6 text-sm text-muted-foreground">Sign in to share your thoughts. <a data-testid="link-login-to-review" href="/login" className="font-bold text-foreground underline">Log in</a></p>;
}
