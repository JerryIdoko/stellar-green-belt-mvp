"use client";

import { useState } from "react";

interface OnboardingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const STEPS = [
  {
    title: "Step 1: Install Freighter",
    description:
      "Freighter is a Stellar wallet extension for your browser. Install it from the Chrome Web Store or Firefox Add-ons.",
    action: (
      <a
        href="https://www.freighter.app/"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-indigo-700"
      >
        Download Freighter
      </a>
    ),
  },
  {
    title: "Step 2: Get Testnet XLM",
    description:
      "Open Freighter, switch to the Testnet network, and request free test tokens from the Stellar lab faucet.",
    action: (
      <a
        href="https://laboratory.stellar.org/#account-creator?network=testnet"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block rounded-lg bg-green-600 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-green-700"
      >
        Stellar Lab Faucet
      </a>
    ),
  },
  {
    title: "Step 3: Connect & Contribute",
    description:
      "Connect your Freighter wallet to this dApp, enter an amount, and confirm the transaction. Your contribution will be recorded on-chain!",
  },
];

export default function OnboardingModal({ isOpen, onClose }: OnboardingModalProps) {
  const [currentStep, setCurrentStep] = useState(0);

  if (!isOpen) return null;

  const step = STEPS[currentStep];
  const isLast = currentStep === STEPS.length - 1;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-md rounded-2xl bg-white px-6 py-8 shadow-2xl">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl font-bold tracking-tight text-gray-900">Get Started</h2>
          <button
            onClick={onClose}
            className="rounded-md p-1.5 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="mb-6 flex items-center justify-center gap-2">
          {STEPS.map((_, i) => (
            <span
              key={i}
              className={`h-2 w-2 rounded-full transition-colors ${
                i === currentStep ? "bg-indigo-600" : i < currentStep ? "bg-green-400" : "bg-gray-200"
              }`}
            />
          ))}
        </div>

        <div className="mb-8 min-h-[200px]">
          <h3 className="mb-2 text-lg font-semibold text-gray-900">{step.title}</h3>
          <p className="mb-4 text-sm leading-relaxed text-gray-600">{step.description}</p>
          {step.action}
        </div>

        <div className="flex justify-between gap-3">
          <button
            onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
            disabled={currentStep === 0}
            className="rounded-lg border border-gray-300 px-4 py-2.5 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
          >
            Back
          </button>

          {isLast ? (
            <button
              onClick={onClose}
              className="rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-indigo-700"
            >
              Start Contributing
            </button>
          ) : (
            <button
              onClick={() => setCurrentStep(currentStep + 1)}
              className="rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-indigo-700"
            >
              Next
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
