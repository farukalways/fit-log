import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-2xl flex-col items-center px-4 py-24 text-center sm:px-6">
      <p className="font-display text-7xl text-accent sm:text-8xl">404</p>
      <h1 className="mt-4 font-display text-2xl uppercase tracking-wide text-ink sm:text-3xl">
        No lift here
      </h1>
      <p className="mt-3 max-w-sm text-muted">
        That page doesn&apos;t exist in the library. Head back and pick a
        workout to log instead.
      </p>
      <Link
        href="/"
        className="mt-8 inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-bold uppercase tracking-wide text-accent-ink transition-transform hover:scale-105"
      >
        Back to workouts
         <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      className="h-4 w-4"
      aria-hidden="true"
    >
      <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
      </Link>
    </div>
  );
}
