import  IconLogo  from "@/assets/logo.png";
import Image from "next/image";

export function Footer() {
  return (
    <footer className="border-t border-border bg-bg">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-4 py-8 text-sm text-muted sm:flex-row sm:px-6">
        <div className="flex items-center gap-2 text-ink">
          <Image src={IconLogo} alt="FitLog Logo" className="h-5 w-5 text-accent" />
          <span className="font-display tracking-widest">FITLOG</span>
        </div>
        <p>© 2026 FitLog — Workout Library. Train hard, log honest.</p>
      </div>
    </footer>
  );
}
