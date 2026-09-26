"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { usePlan } from "@/context/PlanContext";
import  IconLogo  from "@/assets/logo.png";
import  Image  from 'next/image';

const LINKS = [
  { href: "/#library", label: "Workout", match: "/" },
  { href: "/my-plan", label: "My Plan", match: "/my-plan" },
];

export function Navbar() {
  const pathname = usePathname();
  const { planCount, savedCount, hydrated } = usePlan();

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-bg/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2 text-ink">
          <Image src={IconLogo} alt="FitLog Logo" className="h-6 w-6 text-accent" />
          <span className="font-display text-lg tracking-widest">FITLOG</span>
        </Link>

        <nav className="hidden items-center gap-8 sm:flex">
          {LINKS.map((link) => {
            const active = pathname === link.match;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-semibold uppercase tracking-wide transition-colors ${
                  active ? "text-accent" : "text-muted hover:text-ink"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href="/my-plan"
            className="rounded-full bg-accent px-3 py-1 text-xs font-bold text-accent-ink transition-transform hover:scale-105"
          >
            Plan · {hydrated ? planCount : 0}
          </Link>
          <Link
            href="/my-plan"
            className="rounded-full border border-border px-3 py-1 text-xs font-bold text-ink transition-colors hover:border-accent"
          >
            Saved · {hydrated ? savedCount : 0}
          </Link>
        </div>
      </div>

      <nav className="flex items-center gap-6 border-t border-border px-4 py-2 sm:hidden">
        {LINKS.map((link) => {
          const active = pathname === link.match;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm font-semibold uppercase tracking-wide ${
                active ? "text-accent" : "text-muted"
              }`}
            >
              {link.label}
            </Link>
          );
        })}
      </nav>
    </header>
  );
}
