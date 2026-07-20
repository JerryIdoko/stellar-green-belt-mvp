"use client";

import { createContext, useContext, useEffect, type ReactNode } from "react";
import { trackEvent, type EventName } from "@/utils/analytics";

export interface AnalyticsContextValue {
  track: (name: EventName, properties?: Record<string, unknown>) => void;
}

const AnalyticsContext = createContext<AnalyticsContextValue | null>(null);

const POSTHOG_KEY = process.env.NEXT_PUBLIC_POSTHOG_KEY;

export function AnalyticsProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    if (!POSTHOG_KEY || typeof window === "undefined") return;

    try {
      const script = document.createElement("script");
      script.src = `https://cdn.jsdelivr.net/npm/posthog-js@1/lib/posthog.min.js`;
      script.async = true;
      script.onload = () => {
        const ph = window.posthog as never as { init: (key: string, config: object) => void } | undefined;
        if (ph) {
          ph.init(POSTHOG_KEY, { api_host: "https://app.posthog.com" });
        }
      };
      document.head.appendChild(script);
    } catch {
      console.warn("[Analytics] PostHog failed to load");
    }
  }, []);

  return (
    <AnalyticsContext.Provider value={{ track: trackEvent }}>
      {children}
    </AnalyticsContext.Provider>
  );
}

export function useAnalytics(): AnalyticsContextValue {
  const ctx = useContext(AnalyticsContext);
  if (!ctx) {
    throw new Error("useAnalytics must be used within an AnalyticsProvider");
  }
  return ctx;
}
