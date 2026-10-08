import type { Metadata } from "next";
import { AuthProvider } from "@/contexts/AuthContext";
import { FavoritesProvider } from "@/contexts/FavoritesContext";
import "./globals.css";

export const metadata: Metadata = {
  title: "Product Collection",
  description: "Explore the latest product collection.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en">
      <body className="min-h-full flex flex-col">
        <AuthProvider><FavoritesProvider>{children}</FavoritesProvider></AuthProvider>
      </body>
    </html>
  );
}
