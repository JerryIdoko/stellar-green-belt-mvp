# Green Belt Crowdfund — Mainnet Configuration

This directory holds production-grade configuration stubs for Stellar Mainnet deployment.

## Required Environment Variables

| Variable | Description |
|---|---|
| `NEXT_PUBLIC_NETWORK` | Set to `mainnet` to activate production mode |
| `NEXT_PUBLIC_MAINNET_RPC_URL` | Soroban RPC endpoint for Mainnet |
| `NEXT_PUBLIC_MAINNET_CONTRACT_ID` | Deployed contract ID on Mainnet |
| `NEXT_PUBLIC_SPONSOR_SECRET_KEY` | Sponsor account secret key (fee bump gasless txs) |

## Safety Guards

- `requireTestnet()` throws if a Testnet-only operation is called in Mainnet mode.
- An empty `MAINNET_RPC_URL` or `MAINNET_CONTRACT_ID` causes `getNetworkConfig("mainnet")` to throw.
- Fee sponsorship requires explicit `NEXT_PUBLIC_SPONSOR_SECRET_KEY` environment variable.
