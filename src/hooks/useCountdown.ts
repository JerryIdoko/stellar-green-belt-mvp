"use client";

import { useState, useEffect } from "react";

export function useCountdown(targetMs: number) {
  const [remaining, setRemaining] = useState<number>(() =>
    Math.max(0, targetMs - Date.now()),
  );

  useEffect(() => {
    if (remaining <= 0) return;

    const id = setInterval(() => {
      const r = Math.max(0, targetMs - Date.now());
      setRemaining(r);
      if (r <= 0) clearInterval(id);
    }, 1000);

    return () => clearInterval(id);
  }, [targetMs, remaining]);

  const days = Math.floor(remaining / 86400000);
  const hours = Math.floor((remaining % 86400000) / 3600000);
  const minutes = Math.floor((remaining % 3600000) / 60000);
  const seconds = Math.floor((remaining % 60000) / 1000);

  return { remaining, days, hours, minutes, seconds, expired: remaining <= 0 };
}
