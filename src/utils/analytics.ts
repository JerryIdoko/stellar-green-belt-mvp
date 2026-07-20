declare global {
  interface Window {
    posthog?: { capture: (event: string, properties?: Record<string, unknown>) => void };
  }
}

export type EventName =
  | "Wallet Connected"
  | "Transaction Initialized"
  | "Transaction Success"
  | "Transaction Failure"
  | "Feedback Submitted";

export interface AnalyticsEvent {
  name: EventName;
  properties?: Record<string, unknown>;
  timestamp: number;
}

const EVENT_QUEUE: AnalyticsEvent[] = [];

function getPostHog(): Window["posthog"] | null {
  return typeof window !== "undefined" ? window.posthog : null;
}

export function trackEvent(name: EventName, properties?: Record<string, unknown>) {
  const event: AnalyticsEvent = { name, properties, timestamp: Date.now() };
  EVENT_QUEUE.push(event);

  try {
    const posthog = getPostHog();
    if (posthog && typeof posthog.capture === "function") {
      posthog.capture(name, properties);
    }
  } catch {
  }

  if (process.env.NODE_ENV === "development") {
    console.log("[Analytics]", name, properties ?? "");
  }
}

export function getEventQueue(): AnalyticsEvent[] {
  return [...EVENT_QUEUE];
}

export function clearEventQueue() {
  EVENT_QUEUE.length = 0;
}
