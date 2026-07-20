import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function GET() {
  return NextResponse.json({
    status: "ok",
    network: process.env.NEXT_PUBLIC_NETWORK || "testnet",
    sorobanRpc: process.env.NEXT_PUBLIC_RPC_URL || "https://soroban-testnet.stellar.org",
    analytics: process.env.NEXT_PUBLIC_POSTHOG_KEY ? "enabled" : "disabled",
    feeSponsorship: process.env.NEXT_PUBLIC_SPONSOR_SECRET_KEY ? "configured" : "unconfigured",
    timestamp: new Date().toISOString(),
  });
}
