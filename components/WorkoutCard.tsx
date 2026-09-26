import Link from "next/link";
import type { Workout } from "@/lib/data";
import { WorkoutIllustration } from "@/components/WorkoutIllustration";

export function WorkoutCard({ workout }: { workout: Workout }) {
  return (
    <Link
      href={`/workout/${workout.id}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-surface transition-colors hover:border-accent/50"
    >
      <div className="relative aspect-4/3 w-full overflow-hidden">
        <WorkoutIllustration
          category={workout.categories[0]}
          className="h-full w-full transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute left-3 top-3 flex flex-wrap gap-1.5">
          {workout.categories.map((cat) => (
            <span
              key={cat}
              className="rounded-full border border-white/15 bg-black/50 px-2.5 py-1 text-[10px] font-semibold tracking-wide text-ink backdrop-blur-sm"
            >
              {cat}
            </span>
          ))}
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-2 p-4">
        <h3 className="font-display text-lg leading-tight tracking-wide text-ink">
          {workout.name}
        </h3>
        <p className="text-sm text-muted">{workout.equipment.join(", ")}</p>

        <div className="mt-auto flex items-center gap-4 pt-2 text-sm text-muted">
          <span className="flex items-center gap-1.5">
           
<svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
    className="h-4 w-4"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3.2 2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>


            {workout.duration} min
          </span>
          <span className="flex items-center gap-1.5">
            <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
     className="h-4 w-4"
      aria-hidden="true"
    >
      <path
        d="M12 3c1 3-3 4.5-3 8a4 4 0 0 0 8 0c0-1.5-.7-2.4-1.3-3.2.6 2-1 3-1 3 .3-2-1-4-2.7-7.8Z"
        strokeLinejoin="round"
      />
      <path d="M8.6 13.5A4.6 4.6 0 0 0 12 21a4.6 4.6 0 0 0 4.2-6.6" strokeLinecap="round" />
    </svg>
            {workout.calories} kcal
          </span>
          <span className="flex items-center gap-1.5 text-ink">

             <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className="h-4 w-4 text-accent"
      aria-hidden="true"
    >
      <path d="M12 2.5l2.9 6.1 6.6.7-4.9 4.5 1.3 6.6L12 17l-5.9 3.4 1.3-6.6-4.9-4.5 6.6-.7L12 2.5z" />
    </svg>
            {workout.rating.toFixed(1)}
          </span>
        </div>
      </div>
    </Link>
  );
}
