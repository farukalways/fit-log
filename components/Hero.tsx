import Image from "next/image";
import bannerImage from "@/assets/banner.png";

export function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-border bg-bg">
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-12 sm:px-6 sm:py-20 lg:grid-cols-2 lg:py-24">
        {/* Left Side: Content */}
        <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-accent">
            Workout Library
          </p>
          <h1 className="mt-4 font-display text-3xl uppercase leading-[1.05] tracking-wide text-ink sm:text-5xl lg:text-6xl">
            Train with intent.
            <br />
            Log every set.
          </h1>
          <p className="mt-5 max-w-md text-sm text-muted sm:text-base lg:text-lg">
            FitLog is a dark, no-nonsense gym companion: pick a lift, lock it
            into today&apos;s plan, and watch the week&apos;s work add up.
          </p>
          <a
            href="#library"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-bold uppercase tracking-wide text-accent-ink transition-transform hover:scale-105 active:scale-95"
          >
            Browse Workouts
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              className="h-4 w-4"
              aria-hidden="true"
            >
              <path
                d="M5 12h14M13 6l6 6-6 6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>
        </div>

        {/* Right Side: Responsive Image Wrapper */}
        <div className="relative mx-auto aspect-square w-full max-w-70 sm:max-w-md">
          {/* Background Glow */}
          <div className="absolute inset-0 rounded-3xl bg-accent/10 blur-2xl" />
          
          <div className="relative h-full w-full overflow-hidden rounded-3xl">
            <Image
              src={bannerImage}
              alt="Barbell illustration"
              fill
              priority
              sizes="(max-width: 640px) 280px, (max-width: 1024px) 448px, 500px"
              className="object-cover object-center"
            />
          </div>
        </div>
      </div>
    </section>
  );
}