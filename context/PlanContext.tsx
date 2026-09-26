"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { Workout } from "@/lib/data";
import { fetchWorkouts } from "@/lib/fetchWorkouts";

export const PLAN_CAP = 5;

type PlanEntry = {
  id: string;
  done: boolean;
};

type PlanState = {
  plan: PlanEntry[];
  saved: string[];
};

const STORAGE_KEY = "fitlog:plan-state";
const emptyState: PlanState = { plan: [], saved: [] };

type PlanContextValue = {
  hydrated: boolean;
  planWorkouts: (Workout & { done: boolean })[];
  savedWorkouts: Workout[];
  planCount: number;
  savedCount: number;
  isPlanFull: boolean;
  isInPlan: (id: string) => boolean;
  isSaved: (id: string) => boolean;
  addToPlan: (id: string) => "added" | "full" | "already";
  addToSaved: (id: string) => "added" | "already";
  removeFromPlan: (id: string) => void;
  removeFromSaved: (id: string) => void;
  toggleDone: (id: string) => void;
};

const PlanContext = createContext<PlanContextValue | null>(null);

export function PlanProvider({ children }: { children: ReactNode }) {
  // ১. Hydration এরর ও SSR mismatch এড়াতে ইনিশিয়াল স্টেট সবসময় খালি থাকবে
  const [state, setState] = useState<PlanState>(emptyState);
  const [hydrated, setHydrated] = useState(false);
  const [allWorkouts, setAllWorkouts] = useState<Workout[]>([]);

  // ২. Mount হওয়ার পর LocalStorage থেকে স্টেট লোড করা (Cascading Render এড়াতে Asynchronous microtask ব্যবহার করা হয়েছে)
  useEffect(() => {
    let savedState = emptyState;
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) {
        savedState = JSON.parse(raw) as PlanState;
      }
    } catch {
      // Storage unavailable or malformed JSON
    }

    // Microtask এর মাধ্যমে স্টেট আপডেট করায় React-এর Cascading Render Warning আসবে না
    queueMicrotask(() => {
      setState(savedState);
      setHydrated(true);
    });
  }, []);

  // ৩. API থেকে Workouts ডেটা ফেচ করা
  useEffect(() => {
    let isMounted = true;
    async function loadWorkouts() {
      try {
        const data = await fetchWorkouts();
        if (isMounted) {
          setAllWorkouts(data);
        }
      } catch (error) {
        console.error("Failed to load workouts in PlanProvider:", error);
      }
    }
    loadWorkouts();

    return () => {
      isMounted = false;
    };
  }, []);

  // ৪. LocalStorage-এ স্টেট সিঙ্ক করা (শুধুমাত্র hydrated হওয়ার পর)
  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      // fail silently
    }
  }, [state, hydrated]);

  const isInPlan = useCallback(
    (id: string) => state.plan.some((entry) => entry.id === id),
    [state.plan]
  );

  const isSaved = useCallback(
    (id: string) => state.saved.includes(id),
    [state.saved]
  );

  const addToPlan = useCallback(
    (id: string) => {
      if (isInPlan(id)) return "already" as const;
      if (state.plan.length >= PLAN_CAP) return "full" as const;
      setState((prev) => ({
        ...prev,
        plan: [...prev.plan, { id, done: false }],
      }));
      return "added" as const;
    },
    [isInPlan, state.plan.length]
  );

  const addToSaved = useCallback(
    (id: string) => {
      if (isSaved(id)) return "already" as const;
      setState((prev) => ({ ...prev, saved: [...prev.saved, id] }));
      return "added" as const;
    },
    [isSaved]
  );

  const removeFromPlan = useCallback((id: string) => {
    setState((prev) => ({
      ...prev,
      plan: prev.plan.filter((entry) => entry.id !== id),
    }));
  }, []);

  const removeFromSaved = useCallback((id: string) => {
    setState((prev) => ({
      ...prev,
      saved: prev.saved.filter((entryId) => entryId !== id),
    }));
  }, []);

  const toggleDone = useCallback((id: string) => {
    setState((prev) => ({
      ...prev,
      plan: prev.plan.map((entry) =>
        entry.id === id ? { ...entry, done: !entry.done } : entry
      ),
    }));
  }, []);

  const planWorkouts = useMemo(
    () =>
      state.plan
        .map((entry) => {
          const workout = allWorkouts.find((w) => w.id === entry.id);
          return workout ? { ...workout, done: entry.done } : null;
        })
        .filter((w): w is Workout & { done: boolean } => w !== null),
    [state.plan, allWorkouts]
  );

  const savedWorkouts = useMemo(
    () =>
      state.saved
        .map((id) => allWorkouts.find((w) => w.id === id))
        .filter((w): w is Workout => w !== undefined),
    [state.saved, allWorkouts]
  );

  const value: PlanContextValue = {
    hydrated,
    planWorkouts,
    savedWorkouts,
    planCount: state.plan.length,
    savedCount: state.saved.length,
    isPlanFull: state.plan.length >= PLAN_CAP,
    isInPlan,
    isSaved,
    addToPlan,
    addToSaved,
    removeFromPlan,
    removeFromSaved,
    toggleDone,
  };

  return (
    <PlanContext.Provider value={value}>{children}</PlanContext.Provider>
  );
}

export function usePlan() {
  const ctx = useContext(PlanContext);
  if (!ctx) throw new Error("usePlan must be used within a PlanProvider");
  return ctx;
}