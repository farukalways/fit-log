import Link from "next/link";
import Image from "next/image";
import type { Workout } from "@/lib/data";

export function PlanWorkoutCard({
  workout,
  done,
  onMarkDone,
  onRemove,
}: {
  workout: Workout;
  done?: boolean;
  onMarkDone?: () => void;
  onRemove: () => void;
}) {
  return (
    <div
      className={`flex flex-col gap-4 rounded-2xl border border-border bg-surface p-4 sm:flex-row sm:items-center ${
        done ? "opacity-60" : ""
      }`}
    >
      {/* ইলাস্ট্রেশন বাদ দিয়ে রিয়েল ছবি রেন্ডার করা হয়েছে */}
      <div className="relative h-20 w-full shrink-0 overflow-hidden rounded-xl sm:h-16 sm:w-16">
        <Image
          src={workout.image}
          alt={workout.name}
          fill
          sizes="(max-width: 640px) 100vw, 64px"
          className="object-cover"
        />
      </div>

      <div className="flex-1">
        <h3 className="font-display text-base uppercase tracking-wide text-ink">
          {workout.name}
        </h3>
        {/* equipment এখন সরাসরি string */}
        <p className="text-sm text-muted">{workout.equipment}</p>
        <div className="mt-2 flex items-center gap-4 text-xs text-muted">
          <span className="flex items-center gap-1">
              <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      className="h-3.5 w-3.5"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3.2 2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
            {workout.duration} min
          </span>
          <span className="flex items-center gap-1">
           
             <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
     className="h-3.5 w-3.5"
      aria-hidden="true"
    >
      <path
        d="M12 3c1 3-3 4.5-3 8a4 4 0 0 0 8 0c0-1.5-.7-2.4-1.3-3.2.6 2-1 3-1 3 .3-2-1-4-2.7-7.8Z"
        strokeLinejoin="round"
      />
      <path d="M8.6 13.5A4.6 4.6 0 0 0 12 21a4.6 4.6 0 0 0 4.2-6.6" strokeLinecap="round" />
    </svg>
            {/* calories এর জায়গায় caloriesBurned */}
            {workout.caloriesBurned} kcal
          </span>
          <span className="flex items-center gap-1 text-ink">
           
             <svg
      viewBox="0 0 24 24"
      fill="currentColor"
     className="h-3.5 w-3.5 text-accent"
      aria-hidden="true"
    >
      <path d="M12 2.5l2.9 6.1 6.6.7-4.9 4.5 1.3 6.6L12 17l-5.9 3.4 1.3-6.6-4.9-4.5 6.6-.7L12 2.5z" />
    </svg>

             <svg
      viewBox="0 0 24 24"
      fill="currentColor"
     className="h-3.5 w-3.5 text-accent" 
      aria-hidden="true"
    >
      <path d="M12 2.5l2.9 6.1 6.6.7-4.9 4.5 1.3 6.6L12 17l-5.9 3.4 1.3-6.6-4.9-4.5 6.6-.7L12 2.5z" />
    </svg>
            {workout.rating.toFixed(1)}
          </span>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Link
          href={`/workout/${workout.id}`}
          className="rounded-full border border-border px-3 py-2 text-xs font-semibold uppercase tracking-wide text-ink hover:border-accent"
        >
          View Details
        </Link>
        {onMarkDone && (
          <button
            type="button"
            onClick={onMarkDone}
            aria-label={done ? "Mark as not done" : "Mark as done"}
            className={`flex h-9 w-9 items-center justify-center rounded-full border ${
              done
                ? "border-accent bg-accent text-accent-ink"
                : "border-border text-ink hover:border-accent"
            }`}
          >
             <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.4}
      className="h-4 w-4"
      aria-hidden="true"
    >
      <path d="M4 12.5l5 5L20 6.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
          </button>
        )}
        <button
          type="button"
          onClick={onRemove}
          aria-label="Remove"
          className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-ink hover:border-red-400 hover:text-red-400"
        >
          
           <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.2}
       className="h-4 w-4"
      aria-hidden="true"
    >
      <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
    </svg>
        </button>
      </div>
    </div>
  );
}