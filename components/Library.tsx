"use client";

import { useEffect, useState } from "react";
import type { Workout } from "@/lib/data";
import { fetchWorkouts, sortWorkouts, type SortKey } from "@/lib/fetchWorkouts";
import { WorkoutCard } from "@/components//WorkoutCard";
import { SortDropdown } from "@/components/SortDropdown";

export function Library() {
  const [workouts, setWorkouts] = useState<Workout[] | null>(null);
  const [sortKey, setSortKey] = useState<SortKey>("duration");

  useEffect(() => {
    let active = true;
    
    fetchWorkouts().then((data) => {

      if (active) setWorkouts(data);
    });
    return () => {
      active = false;
    };
  }, []);

  const list = workouts ? sortWorkouts(workouts, sortKey) : null;

  console.log(list);

  return (
    <section id="library" className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="font-display text-3xl uppercase tracking-wide text-ink sm:text-4xl">
            The Library
          </h2>
          <p className="mt-2 text-muted">
            Twelve lifts covering every major muscle group.
          </p>
        </div>
        <SortDropdown value={sortKey} onChange={setSortKey} />
      </div>

      {!list ? (
        <div className="flex items-center justify-center py-24">
          <div className="flex items-center gap-3 text-muted">
            <span className="h-5 w-5 animate-spin rounded-full border-2 border-border border-t-accent" />
            Loading workouts…
          </div>
        </div>
      ) : (
        <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((workout) => (
            <WorkoutCard key={workout.id} workout={workout} />
          ))}
        </div>
      )}
    </section>
  );
}
