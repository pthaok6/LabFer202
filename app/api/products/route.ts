import { NextRequest, NextResponse } from "next/server";

import { filterProducts } from "@/data/products";

export function GET(request: NextRequest) {
  const q = request.nextUrl.searchParams.get("q") ?? "";
  const category = request.nextUrl.searchParams.get("category") ?? "";

  return NextResponse.json(filterProducts(q, category));
}
