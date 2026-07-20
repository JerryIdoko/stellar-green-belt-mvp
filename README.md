# Green Belt Crowdfund MVP

Production-ready Soroban crowdfunding dApp on Stellar Testnet with comprehensive analytics, error monitoring, a mobile-first responsive UI, and a user feedback framework.

- **Live Demo:** https://stellar-green-belt-mvp.vercel.app/
- **Smart Contract (Testnet):** `CCLJ4FEXKXEZKS6UCROBEKLIVDOPFVP6Z75QS3AV5CUS2WAM3EBQNL7W`
- **Stack:** Soroban (Rust), Next.js 16, Tailwind CSS 4, Stellar Wallets Kit
- **Wallets:** Freighter, xBull, Albedo

## Architecture

```
src/
├── app/              # Next.js App Router (layout, page)
├── components/       # UI components
│   ├── WalletModal       # Wallet connection (mobile-first)
│   ├── ProgressBar       # Campaign funding progress
│   ├── CountdownTimer    # Live countdown to deadline
│   ├── ContributeForm    # Contribution input + submit
│   ├── TransactionAlert  # Success/failure toast
│   ├── OnboardingModal   # 3-step faucet guide for new users
│   ├── FeedbackWidget    # Floating feedback form (star rating + comment)
│   └── ErrorBoundary     # React error boundary
├── context/          # React contexts
│   ├── CrowdfundContext  # Wallet, campaign, tx state
│   └── AnalyticsContext  # PostHog-ready analytics
├── contracts/        # Soroban client bindings
├── types/            # TypeScript interfaces
└── utils/            # Analytics, error classes
```

## Analytics Events

| Event | Trigger |
|---|---|
| `Wallet Connected` | User connects wallet |
| `Transaction Initialized` | User clicks Contribute |
| `Transaction Success` | Contribution confirmed on-chain |
| `Transaction Failure` | Contribution rejected/failed |
| `Feedback Submitted` | User submits feedback form |

Set `NEXT_PUBLIC_POSTHOG_KEY` to enable PostHog tracking. Falls back to a no-op mock if unset.

## Error Handling

- **ErrorBoundary** catches render crashes with a "Try Again" recovery button
- **3-tier error classes**: `WalletNotFound` (extension missing), `UserRejected` (tx declined), `InsufficientFunds` (low balance)
- On-chain failures log `method`, `contractId`, `params`, and `rawMessage` to the console
- Silent `catch {}` replaced with `console.error("Soroban Fetch Error:", err)` and stale cache eviction

## Mobile Responsiveness

- Minimum 48px touch targets on all interactive elements
- `sm:` breakpoints for responsive layouts
- Bottom-sheet modals on mobile (`items-end`) centered on desktop (`sm:items-center`)
- Full-width buttons on mobile, auto-width on desktop
- Sticky padding and stacking for small screens

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment Variables

| Variable | Default | Description |
|---|---|---|
| `NEXT_PUBLIC_RPC_URL` | `https://soroban-testnet.stellar.org` | Soroban RPC endpoint |
| `NEXT_PUBLIC_CONTRACT_ID` | Embded in client bindings | Contract ID override |
| `NEXT_PUBLIC_POSTHOG_KEY` | (none) | PostHog project API key |

## Build

```bash
npm run build    # next build
npm run lint     # eslint
```
