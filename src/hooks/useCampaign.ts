"use client";

import { useCallback } from "react";
import { useCrowdfund } from "@/context/CrowdfundContext";

export function useCampaign() {
  const ctx = useCrowdfund();

  const progress =
    ctx.campaign && ctx.campaign.target > 0
      ? Math.round((ctx.campaign.totalRaised / ctx.campaign.target) * 100)
      : 0;

  const refresh = useCallback(async () => {
    await ctx.refreshCampaign();
  }, [ctx]);

  return {
    campaign: ctx.campaign,
    loading: ctx.campaignLoading,
    progress,
    refresh,
    address: ctx.address,
    txState: ctx.txState,
    txRecords: ctx.txRecords,
    contribute: ctx.contribute,
  };
}
