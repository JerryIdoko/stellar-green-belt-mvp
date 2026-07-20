import { getNetworkConfig } from "@/utils/network";

const net = getNetworkConfig();

export const RPC_URL = net.rpcUrl;
export const CONTRACT_ID = net.contractId;
export const NETWORK_PASSPHRASE = net.networkPassphrase;
export const CACHE_KEY = "crowdfund_campaign";
export const CACHE_TTL_MS = 5 * 60 * 1000;
export const POSTHOG_KEY = process.env.NEXT_PUBLIC_POSTHOG_KEY;
export const IS_MAINNET = net.isMainnet;
