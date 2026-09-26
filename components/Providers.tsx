"use client";

import type { ReactNode } from "react";
import { PlanProvider } from "@/context/PlanContext";
import { ToastProvider } from "@/context/ToastContext";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <PlanProvider>
      <ToastProvider>{children}</ToastProvider>
    </PlanProvider>
  );
}
