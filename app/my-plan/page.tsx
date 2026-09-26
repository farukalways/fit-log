"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { usePlan, PLAN_CAP } from "@/context/PlanContext";
import { useToast } from "@/context/ToastContext";
import { PlanWorkoutCard } from "@/components/PlanWorkoutCard";

type Tab = "plan" | "saved";

export default function MyPlanPage() {
  const {
    hydrated,
    workoutsLoaded,
    planWorkouts,
    savedWorkouts,
    removeFromPlan,
    removeFromSaved,
    toggleDone,
  } = usePlan();

  const { showToast } = useToast();

  const [tab, setTab] = useState<Tab>("plan");
  const [query, setQuery] = useState("");
  const [showLoading, setShowLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowLoading(false), 450);
    return () => clearTimeout(timer);
  }, []);

  const loading = showLoading || !hydrated || !workoutsLoaded;

  const totalMinutes = planWorkouts.reduce((sum, w) => sum + w.duration, 0);
  const totalCalories = planWorkouts.reduce(
    (sum, w) => sum + w.caloriesBurned,
    0,
  );

  const activeList = useMemo(
    () => (tab === "plan" ? planWorkouts : savedWorkouts),
    [tab, planWorkouts, savedWorkouts],
  );

  const filteredList = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return activeList;
    return activeList.filter(
      (w) =>
        w.name.toLowerCase().includes(q) ||
        w.muscleGroups.some((m) => m.toLowerCase().includes(q)),
    );
  }, [activeList, query]);

  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 sm:py-16">
      <h1 className="font-display text-3xl uppercase tracking-wide text-ink sm:text-4xl">
        My Plan
      </h1>
      <p className="mt-2 text-muted">
        Cap of five lifts for today. Finish them, then load more.
      </p>

      <div className="mt-8 grid grid-cols-3 gap-3 sm:gap-4">
        <StatCard label="Exercises" value={planWorkouts.length} />
        <StatCard label="Minutes" value={totalMinutes} />
        <StatCard label="Calories" value={totalCalories} />
      </div>

      <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex w-fit gap-2 rounded-full border border-border bg-surface p-1">
          <TabButton active={tab === "plan"} onClick={() => setTab("plan")}>
            Today&apos;s Plan
          </TabButton>
          <TabButton active={tab === "saved"} onClick={() => setTab("saved")}>
            Saved
          </TabButton>
        </div>

        <label className="relative flex items-center">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            className="pointer-events-none absolute left-3 h-4 w-4 text-muted"
            aria-hidden="true"
          >
            <circle cx="11" cy="11" r="7" />
            <path d="M21 21l-4.3-4.3" strokeLinecap="round" />
          </svg>

          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by name or muscle"
            className="w-full rounded-full border border-border bg-surface py-2 pl-9 pr-4 text-sm text-ink placeholder:text-muted focus:border-accent sm:w-64"
          />
        </label>
      </div>

      {tab === "plan" && (
        <p className="mt-4 text-xs text-muted">
          {planWorkouts.length}/{PLAN_CAP} lifts locked in for today.
        </p>
      )}

      <div className="mt-6">
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="flex items-center gap-3 text-muted">
              <span className="h-5 w-5 animate-spin rounded-full border-2 border-border border-t-accent" />
              Loading workouts…
            </div>
          </div>
        ) : filteredList.length === 0 ? (
          <EmptyState hasQuery={query.trim().length > 0} tab={tab} />
        ) : (
          <div className="flex flex-col gap-3">
            {filteredList.map((workout) =>
              tab === "plan" ? (
                <PlanWorkoutCard
                  key={workout.id}
                  workout={workout}
                  done={"done" in workout ? workout.done : false}
                  onMarkDone={() => {
                    toggleDone(String(workout.id));
                    showToast(
                      "done" in workout && workout.done
                        ? "Marked as not done"
                        : "Marked as done",
                    );
                  }}
                  onRemove={() => {
                    removeFromPlan(String(workout.id));
                    showToast("Removed from today's plan");
                  }}
                />
              ) : (
                <PlanWorkoutCard
                  key={workout.id}
                  workout={workout}
                  onRemove={() => {
                    removeFromSaved(String(workout.id));
                    showToast("Removed from saved");
                  }}
                />
              ),
            )}
          </div>
        )}
      </div>
    </div>
  );
}

function StatCard({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-2xl border border-border bg-surface p-4 text-center sm:p-5">
      <p className="font-display text-2xl text-accent sm:text-3xl">{value}</p>
      <p className="mt-1 text-xs uppercase tracking-wide text-muted">{label}</p>
    </div>
  );
}

function TabButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-full px-4 py-1.5 text-sm font-semibold transition-colors ${
        active ? "bg-accent text-accent-ink" : "text-muted hover:text-ink"
      }`}
    >
      {children}
    </button>
  );
}

function EmptyState({ hasQuery }: { hasQuery: boolean; tab: Tab }) {
  if (hasQuery) {
    return (
      <div className="rounded-2xl border border-dashed border-border py-16 text-center text-muted">
        No matches for that search.
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-dashed border-border py-16 text-center">
      <h3 className="font-display text-xl uppercase tracking-wide text-ink">
        Nothing Here Yet
      </h3>
      <p className="mx-auto mt-2 max-w-xs text-sm text-muted">
        Browse the library and add a lift to get today moving.
      </p>
      <Link
        href="/"
        className="mt-5 inline-block rounded-full bg-accent px-5 py-2.5 text-sm font-bold uppercase tracking-wide text-accent-ink"
      >
        Go to workouts
      </Link>
    </div>
  );
}