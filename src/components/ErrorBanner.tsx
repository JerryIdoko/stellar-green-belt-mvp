"use client";

import { useState } from "react";

interface ErrorBannerProps {
  message: string | null;
  onDismiss: () => void;
}

const ERROR_STYLES: Record<string, { bg: string; border: string; text: string; icon: string }> = {
  "WalletNotFound": {
    bg: "bg-orange-50",
    border: "border-orange-200",
    text: "text-orange-800",
    icon: "⚠️",
  },
  "UserRejected": {
    bg: "bg-yellow-50",
    border: "border-yellow-200",
    text: "text-yellow-800",
    icon: "↩️",
  },
  "InsufficientFunds": {
    bg: "bg-red-50",
    border: "border-red-200",
    text: "text-red-800",
    icon: "💰",
  },
};

export default function ErrorBanner({ message, onDismiss }: ErrorBannerProps) {
  const [dismissed, setDismissed] = useState(false);

  if (!message || dismissed) return null;

  const name = message.split(":")[0];
  const style = ERROR_STYLES[name] ?? ERROR_STYLES["UserRejected"];

  return (
    <div className={`rounded-lg border ${style.border} ${style.bg} px-4 py-3 shadow-sm`}>
      <div className="flex items-start justify-between">
        <div className="flex items-start gap-3">
          <span className="text-lg">{style.icon}</span>
          <p className={`text-sm font-medium ${style.text}`}>{message}</p>
        </div>
        <button
          onClick={() => { setDismissed(true); onDismiss(); }}
          className="ml-4 text-gray-400 hover:text-gray-600"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  );
}
