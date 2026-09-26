"use client";

import { usePlan } from "@/context/PlanContext";
import { useToast } from "@/context/ToastContext";

export function DetailActions({ workoutId }: { workoutId: string }) {
  const { addToPlan, addToSaved, isInPlan, isSaved, isPlanFull, hydrated } =
    usePlan();
  const { showToast } = useToast();

  const inPlan = hydrated && isInPlan(workoutId);
  const saved = hydrated && isSaved(workoutId);
  const disablePlanAdd = hydrated && isPlanFull && !inPlan;

  function handleAddToPlan() {
    const result = addToPlan(workoutId);
    if (result === "added") showToast("Added to today's plan");
    if (result === "full") showToast("Today's plan is full — remove a lift first");
    if (result === "already") showToast("Already in today's plan");
  }

  function handleSave() {
    const result = addToSaved(workoutId);
    if (result === "added") showToast("Saved for later");
    if (result === "already") showToast("Already saved");
  }

  return (
    <div className="flex flex-col gap-3 sm:flex-row">
      <button
        type="button"
        onClick={handleAddToPlan}
        disabled={inPlan || disablePlanAdd}
        className="flex items-center justify-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-bold uppercase tracking-wide text-accent-ink transition-transform hover:scale-105 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:scale-100"
      >
        
         <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.2}
      className="h-4 w-4"
      aria-hidden="true"
    >
      <path d="M12 5v14M5 12h14" strokeLinecap="round" />
    </svg>
        {inPlan ? "In today's plan" : "Add to today's plan"}
      </button>
      <button
        type="button"
        onClick={handleSave}
        disabled={saved}
        className="flex items-center justify-center gap-2 rounded-full border border-border px-6 py-3 text-sm font-bold uppercase tracking-wide text-ink transition-colors hover:border-accent disabled:cursor-not-allowed disabled:opacity-40"
      >
     

         <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
     className="h-4 w-4"
      aria-hidden="true"
    >
      <path d="M6 3.5h12v17l-6-4-6 4v-17z" strokeLinejoin="round" />
    </svg>
        {saved ? "Saved" : "Save for later"}
      </button>
    </div>
  );
}
