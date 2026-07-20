import { networks as contractNetworks } from "@/contracts/crowdfund-client";

export type NetworkKind = "testnet" | "mainnet";

export interface NetworkConfig {
  kind: NetworkKind;
  rpcUrl: string;
  networkPassphrase: string;
  contractId: string;
  horizonUrl: string;
  friendbotUrl: string | null;
  isMainnet: boolean;
}

const MAINNET: NetworkConfig = {
  kind: "mainnet",
  rpcUrl: process.env.NEXT_PUBLIC_MAINNET_RPC_URL || "",
  networkPassphrase: "Public Global Stellar Network ; September 2015",
  contractId: process.env.NEXT_PUBLIC_MAINNET_CONTRACT_ID || "",
  horizonUrl: "https://horizon.stellar.org",
  friendbotUrl: null,
  isMainnet: true,
};

const TESTNET: NetworkConfig = {
  kind: "testnet",
  rpcUrl: process.env.NEXT_PUBLIC_RPC_URL || "https://soroban-testnet.stellar.org",
  networkPassphrase: contractNetworks.testnet.networkPassphrase,
  contractId: process.env.NEXT_PUBLIC_CONTRACT_ID || contractNetworks.testnet.contractId,
  horizonUrl: "https://horizon-testnet.stellar.org",
  friendbotUrl: "https://friendbot.stellar.org",
  isMainnet: false,
};

export function getNetworkConfig(network?: NetworkKind): NetworkConfig {
  const desired = network ?? (process.env.NEXT_PUBLIC_NETWORK as NetworkKind | undefined) ?? "testnet";

  if (desired === "mainnet") {
    const cfg = MAINNET;
    if (!cfg.rpcUrl || !cfg.contractId) {
      throw new Error(
        "Mainnet is not configured. Set NEXT_PUBLIC_MAINNET_RPC_URL and NEXT_PUBLIC_MAINNET_CONTRACT_ID."
      );
    }
    return cfg;
  }

  return TESTNET;
}

export function requireTestnet(config: NetworkConfig): void {
  if (config.isMainnet) {
    throw new Error(
      "Safety guard: this operation is restricted to Testnet. " +
      "Mainnet operations require additional authorization."
    );
  }
}
