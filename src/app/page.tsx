"use client";

import { useState, useCallback } from "react";
import { useCrowdfund } from "@/context/CrowdfundContext";
import WalletModal from "@/components/WalletModal";
import ProgressBar from "@/components/ProgressBar";
import CountdownTimer from "@/components/CountdownTimer";
import ContributeForm from "@/components/ContributeForm";
import TransactionAlert from "@/components/TransactionAlert";
import OnboardingModal from "@/components/OnboardingModal";
import FeedbackWidget from "@/components/FeedbackWidget";
import CampaignSkeleton from "@/components/CampaignSkeleton";
import TransactionHistory from "@/components/TransactionHistory";
import ErrorBanner from "@/components/ErrorBanner";

export default function Home() {
  const {
    address,
    handleConnected,
    disconnectWallet,
    campaign,
    campaignLoading,
    txState,
    explorerUrl,
    contribute,
    refreshCampaign,
    resetTx,
    showOnboarding,
    dismissOnboarding,
    txRecords,
  } = useCrowdfund();

  const [modalOpen, setModalOpen] = useState(false);

  const handleConnect = useCallback(
    (addr: string) => {
      handleConnected(addr);
    },
    [handleConnected],
  );

  const formatAddress = (addr: string) =>
    `${addr.slice(0, 6)}...${addr.slice(-4)}`;

  return (
    <main className="mx-auto max-w-2xl px-4 py-6 sm:py-10">
      <div className="mb-6 flex flex-col gap-4 sm:mb-8 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-xl font-bold tracking-tight text-gray-900 sm:text-2xl">
          Green Belt Crowdfund
        </h1>

        {address ? (
          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            <span className="rounded-full bg-indigo-100 px-3 py-1.5 font-mono text-xs text-indigo-700 sm:text-sm">
              {formatAddress(address)}
            </span>
            <button
              onClick={disconnectWallet}
              className="min-h-[40px] rounded-lg border border-gray-300 px-3 py-1.5 text-xs text-gray-600 transition-colors hover:bg-gray-100 active:bg-gray-200 sm:text-sm"
            >
              Disconnect
            </button>
            <button
              onClick={refreshCampaign}
              className="min-h-[40px] rounded-lg border border-gray-300 px-3 py-1.5 text-xs text-gray-600 transition-colors hover:bg-gray-100 active:bg-gray-200 sm:text-sm"
            >
              Refresh
            </button>
          </div>
        ) : (
          <button
            onClick={() => setModalOpen(true)}
            className="min-h-[48px] w-full rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-indigo-700 active:bg-indigo-800 sm:w-auto"
          >
            Connect Wallet
          </button>
        )}
      </div>

      {!address ? (
        <div className="flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-gray-300 px-4 py-16 text-center sm:py-20">
          <svg className="mb-4 h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a2.25 2.25 0 00-2.25-2.25H15a3 3 0 11-6 0H5.25A2.25 2.25 0 003 12m18 0v6a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 18v-6m18 0V9M3 12V9m18 0a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 9m18 0V6a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 6v3" />
          </svg>
          <p className="text-lg font-medium text-gray-900">Connect your Stellar wallet</p>
          <p className="mt-1 text-sm text-gray-500">
            Use Freighter, xBull, or Albedo to contribute.
          </p>
        </div>
      ) : campaignLoading ? (
        <CampaignSkeleton />
      ) : campaign ? (
        <div className="space-y-4 sm:space-y-6">
          {campaign.isClaimed && (
            <div className="rounded-xl border border-amber-200 bg-amber-50 p-4 text-center text-sm text-amber-800">
              This campaign has been claimed. Contributions are closed.
            </div>
          )}

          <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm sm:p-6">
            <ProgressBar current={campaign.totalRaised} target={campaign.target} />
          </div>

          <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm sm:p-6">
            <CountdownTimer deadlineTimestamp={campaign.deadlineTimestamp} />
          </div>

          <ErrorBanner
            message={txState.status === "failure" ? txState.error : null}
            onDismiss={resetTx}
          />

          <ContributeForm
            txStatus={txState.status}
            onContribute={contribute}
          />

          <TransactionAlert
            status={txState.status === "success" ? "success" : txState.status === "failure" ? "failure" : null}
            hash={txState.hash}
            error={txState.error}
            explorerUrl={explorerUrl}
            onDismiss={resetTx}
          />

          <TransactionHistory records={txRecords} />
        </div>
      ) : (
        <div className="rounded-xl border border-red-200 bg-red-50 p-6 text-center">
          <p className="mb-3 text-sm font-medium text-red-700">Failed to load campaign data</p>
          <button
            onClick={refreshCampaign}
            className="rounded-lg bg-red-600 px-4 py-2 text-xs font-medium text-white transition-colors hover:bg-red-700"
          >
            Retry
          </button>
        </div>
      )}

      <WalletModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onConnect={handleConnect}
      />

      <OnboardingModal
        isOpen={showOnboarding}
        onClose={dismissOnboarding}
      />

      <FeedbackWidget />
    </main>
  );
}
