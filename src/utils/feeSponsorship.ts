/**
 * Fee Sponsorship (Gasless Transactions) — Blueprint
 *
 * Stellar fee bumps allow a sponsoring account to cover the
 * transaction fee on behalf of a user. The flow:
 *
 * 1. User builds & signs a normal Soroban transaction (fee = 0 or min).
 * 2. The sponsor envelope wraps the inner tx with a fee bump,
 *    paying the Soroban resource fees from the sponsor's balance.
 * 3. The wrapped transaction is submitted to the network.
 *
 * Prerequisites:
 *   - Sponsor account must exist, be funded, and have its sequence number
 *     tracked.
 *   - Inner transaction must use a valid source account and sequence number
 *     (can be obtained via server.loadAccount()).
 *   - Sponsor must have sufficient XLM balance to cover the fee.
 */

import {
  TransactionBuilder,
  Transaction,
  FeeBumpTransaction,
  Networks,
  BASE_FEE,
  Keypair,
  Account,
  hash,
  xdr,
} from "@stellar/stellar-sdk";
import * as SorobanRpc from "@stellar/stellar-sdk/rpc";
import { NETWORK_PASSPHRASE, IS_MAINNET } from "@/utils/config";

export interface FeeSponsorshipConfig {
  sponsorSecretKey: string;
  maxFee: string;
}

export interface SponsorshipResult {
  success: boolean;
  hash: string | null;
  error?: string;
}

const DEFAULT_FEE = "100000";

export function validateSponsorConfig(config: FeeSponsorshipConfig | null): asserts config is FeeSponsorshipConfig {
  if (!config || !config.sponsorSecretKey) {
    throw new Error(
      "Fee sponsorship is not configured. Set NEXT_PUBLIC_SPONSOR_SECRET_KEY " +
      "in a secure environment variable."
    );
  }
}

export function buildFeeBumpTransaction(
  innerTxXdr: string,
  sponsorSecretKey: string,
  maxFee: string = DEFAULT_FEE,
): FeeBumpTransaction {
  const innerTx = new Transaction(innerTxXdr, NETWORK_PASSPHRASE);
  const sponsorKeypair = Keypair.fromSecret(sponsorSecretKey);

  const feeBump = TransactionBuilder.buildFeeBumpTransaction(
    sponsorKeypair,
    maxFee,
    innerTx,
    NETWORK_PASSPHRASE,
  );

  feeBump.sign(sponsorKeypair);

  return feeBump;
}

export async function sponsorAndSubmit(
  innerTxXdr: string,
  sponsorConfig: FeeSponsorshipConfig,
  server: SorobanRpc.Server,
): Promise<SponsorshipResult> {
  try {
    const feeBump = buildFeeBumpTransaction(
      innerTxXdr,
      sponsorConfig.sponsorSecretKey,
      sponsorConfig.maxFee || DEFAULT_FEE,
    );

    const result = await server.sendTransaction(feeBump);
    const hash = feeBump.hash().toString("hex");

    if (result.errorResult) {
      return { success: false, hash, error: result.errorResult.result().toString() };
    }

    return { success: true, hash };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unknown fee sponsorship error";
    return { success: false, hash: null, error: message };
  }
}
