import { networks } from "@/contracts/crowdfund-client";

export const RPC_URL = process.env.NEXT_PUBLIC_RPC_URL || "https://soroban-testnet.stellar.org";
export const CONTRACT_ID = process.env.NEXT_PUBLIC_CONTRACT_ID || networks.testnet.contractId;
export const CACHE_KEY = "crowdfund_campaign";
export const CACHE_TTL_MS = 5 * 60 * 1000;
export const POSTHOG_KEY = process.env.NEXT_PUBLIC_POSTHOG_KEY;
