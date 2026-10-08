"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useRef,
  useState,
  type ReactNode,
} from "react";

import { useAuth } from "@/contexts/AuthContext";
import { supabase, supabaseConfigError } from "@/lib/supabaseClient";

type FavoritesAction =
  | { type: "SET"; ids: number[] }
  | { type: "ADD"; id: number }
  | { type: "REMOVE"; id: number };

function favoritesReducer(state: number[], action: FavoritesAction): number[] {
  switch (action.type) {
    case "SET":
      return [...new Set(action.ids)];
    case "ADD":
      return state.includes(action.id) ? state : [...state, action.id];
    case "REMOVE":
      return state.filter((id) => id !== action.id);
  }
}

type FavoritesContextValue = {
  favorites: number[];
  loading: boolean;
  error: string | null;
  isFavorite: (id: number) => boolean;
  toggleFavorite: (id: number) => Promise<void>;
};

const FavoritesContext = createContext<FavoritesContextValue | undefined>(undefined);

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const { user, loading: authLoading } = useAuth();
  const [favorites, dispatch] = useReducer(favoritesReducer, []);
  const [loadedUserId, setLoadedUserId] = useState<string | null>(null);
  const [errorState, setErrorState] = useState<{ ownerId: string; message: string } | null>(null);
  const pending = useRef(new Set<number>());
  const activeUserId = useRef(user?.id);
  const userId = user?.id;
  const loading = authLoading || Boolean(userId && supabase && loadedUserId !== userId);
  const error = userId && !supabase
    ? supabaseConfigError
    : errorState && errorState.ownerId === userId ? errorState.message : null;

  useEffect(() => {
    if (authLoading) return;

    let active = true;
    activeUserId.current = userId;
    pending.current.clear();
    dispatch({ type: "SET", ids: [] });

    if (!userId) {
      Promise.resolve().then(() => {
        if (active) setLoadedUserId(null);
      });
      return () => { active = false; };
    }

    if (!supabase) {
      return () => { active = false; };
    }

    supabase
      .from("favorites")
      .select("product_id")
      .eq("user_id", userId)
      .then(({ data, error: loadError }) => {
        if (!active) return;
        if (loadError) {
          setErrorState({ ownerId: userId, message: loadError.message });
        } else {
          dispatch({ type: "SET", ids: (data ?? []).map((row) => row.product_id) });
        }
        setLoadedUserId(userId);
      });

    return () => {
      active = false;
    };
  }, [authLoading, userId]);

  const isFavorite = useCallback((id: number) => favorites.includes(id), [favorites]);

  const toggleFavorite = useCallback(async (id: number) => {
    if (!user || !supabase || loading || pending.current.has(id)) return;

    const wasFavorite = favorites.includes(id);
    const ownerId = user.id;
    pending.current.add(id);
    setErrorState(null);
    dispatch(wasFavorite ? { type: "REMOVE", id } : { type: "ADD", id });

    try {
      const { error: mutationError } = wasFavorite
        ? await supabase.from("favorites").delete().eq("user_id", ownerId).eq("product_id", id)
        : await supabase.from("favorites").insert({ user_id: ownerId, product_id: id });

      if (mutationError && activeUserId.current === ownerId) {
        dispatch(wasFavorite ? { type: "ADD", id } : { type: "REMOVE", id });
        setErrorState({ ownerId, message: mutationError.message });
      }
    } catch (cause) {
      if (activeUserId.current === ownerId) {
        dispatch(wasFavorite ? { type: "ADD", id } : { type: "REMOVE", id });
        setErrorState({ ownerId, message: cause instanceof Error ? cause.message : "Unable to update favorites." });
      }
    } finally {
      pending.current.delete(id);
    }
  }, [favorites, loading, user]);

  const value = useMemo(
    () => ({ favorites, loading, error, isFavorite, toggleFavorite }),
    [favorites, loading, error, isFavorite, toggleFavorite],
  );

  return <FavoritesContext.Provider value={value}>{children}</FavoritesContext.Provider>;
}

export function useFavorites() {
  const context = useContext(FavoritesContext);
  if (!context) throw new Error("useFavorites must be used inside FavoritesProvider");
  return context;
}
