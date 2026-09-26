import { notFound } from "next/navigation";
import Image from "next/image";
import type { Workout } from "@/lib/data";
import { DetailActions } from "@/components/DetailActions";




async function fetchWorkoutFromExternalApi(
  id: string,
 ): Promise<Workout | null> {
  try {
    const res = await fetch(`https://api.api-store.workers.dev/api/fitlog/${id}`, {
      cache: "no-store",
    });

    console.log("respoonse done");

    if (!res.ok) return null;

    return await res.json();
  } catch (error) {
    console.error("External API Fetch Error:", error);
    return null;
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const workout = await fetchWorkoutFromExternalApi(id);
  return { title: workout ? `${workout.name} — FitLog` : "FitLog" };
}

const SPECS: {
  label: string;
  value: (w: Workout) => string;
}[] = [
  { label: "Equipment", value: (w) => w.equipment },
  { label: "Difficulty", value: (w) => w.difficulty },
  { label: "Sets", value: (w) => String(w.sets) },
  { label: "Reps", value: (w) => w.reps },
  { label: "Duration", value: (w) => `${w.duration} min` },
  { label: "Calories", value: (w) => `${w.caloriesBurned} kcal` },
  { label: "Rating", value: (w) => w.rating.toFixed(1) },
];

export default async function WorkoutDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const workout = await fetchWorkoutFromExternalApi(id);

  if (!workout) notFound();

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-16">
      <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
        <div className="relative aspect-4/3 overflow-hidden rounded-2xl border border-border bg-surface">
          <Image
            src={workout.image}
            alt={workout.name}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
          />
        </div>

        <div>
          <div className="flex flex-wrap gap-2">
            {workout.muscleGroups.map((muscle) => (
              <span
                key={muscle}
                className="rounded-full border border-border px-2.5 py-1 text-[11px] font-semibold tracking-wide text-muted"
              >
                {muscle}
              </span>
            ))}
          </div>

          <h1 className="mt-4 font-display text-3xl uppercase tracking-wide text-ink sm:text-4xl">
            {workout.name}
          </h1>
          <p className="mt-3 text-muted">{workout.description}</p>

          
          <div className="mt-6 flex items-center gap-5 text-sm text-muted">
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
                <path
                  d="M12 7v5l3.2 2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
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
                <path
                  d="M8.6 13.5A4.6 4.6 0 0 0 12 21a4.6 4.6 0 0 0 4.2-6.6"
                  strokeLinecap="round"
                />
              </svg>
              {workout.caloriesBurned} kcal
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

          
          <dl className="mt-6 grid grid-cols-2 gap-x-6 gap-y-3 rounded-2xl border border-border bg-surface p-5 sm:grid-cols-3">
            {SPECS.map((spec) => (
              <div key={spec.label}>
                <dt className="text-[11px] uppercase tracking-wide text-muted">
                  {spec.label}
                </dt>
                <dd className="mt-1 text-sm font-semibold text-ink">
                  {spec.value(workout)}
                </dd>
              </div>
            ))}
          </dl>

         
          <div className="mt-8">
            <h2 className="font-display text-lg uppercase tracking-wide text-ink">
              Instructions
            </h2>
            <ol className="mt-3 space-y-3">
              {workout.instructions.map((step, i) => (
                <li key={i} className="flex gap-3 text-sm text-muted">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent/10 text-xs font-bold text-accent">
                    {i + 1}
                  </span>
                  <span className="pt-0.5">{step}</span>
                </li>
              ))}
            </ol>
          </div>

          <div className="mt-8">
            <DetailActions workoutId={workout.id.toString()} />
          </div>
        </div>
      </div>
    </div>
  );
}
