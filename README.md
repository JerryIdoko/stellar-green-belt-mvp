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

---

## 📊 Level 5 User Growth & Feedback Analytics

- **Exhaustive User Feedback Registry (Excel Log):** [Link/View Deployed Feedback Sheet](./delivery_assets/user_feedback_responses.xlsx)
- **Live User Feedback Widget:** Embedded as a floating action button (bottom-right) with star rating + free-text commentary, persisted to localStorage.
- **Analytics Events:** Wallet Connected, Transaction Initialized, Transaction Success, Transaction Failure, Feedback Submitted (PostHog-ready).

### User Feedback Iteration Summary

| User Requested Improvement | Implemented Solution | Git Commit Reference Link |
|---|---|---|
| Add transaction status indicators | Multi-state tracking (`awaiting_approval` → `validating` → `success`/`failure`) with contextual icons and colors | [`4039e78`](https://github.com/JerryIdoko/stellar-green-belt-mvp/commit/4039e78) |
| Show transaction history with filtering | `TransactionHistory` component with sort-by-date/amount, status filter, and CSV data export | [`4039e78`](https://github.com/JerryIdoko/stellar-green-belt-mvp/commit/4039e78) |
| Better error messages when transactions fail | `ErrorBanner` with tiered icons (⚠️ WalletNotFound, ↩️ UserRejected, 💰 InsufficientFunds) and contextual colors | [`9b0ba15`](https://github.com/JerryIdoko/stellar-green-belt-mvp/commit/9b0ba15) |
| Prevent accidental double-submits | `submitting` guard flag disables the Contribute button until the current transaction resolves | [`87439b9`](https://github.com/JerryIdoko/stellar-green-belt-mvp/commit/87439b9) |
| Visual loading state while fetching campaign data | `CampaignSkeleton` pulse-animated placeholders for progress bar, timer, and form | [`e09f452`](https://github.com/JerryIdoko/stellar-green-belt-mvp/commit/e09f452) |
| Retry button when data fetch fails | "Retry" button shown in the fetch-failure state that calls `refreshCampaign()` | [`40c9a98`](https://github.com/JerryIdoko/stellar-green-belt-mvp/commit/40c9a98) |

---

## 📋 Pitch Assets

- **Live Production Application URL:** https://stellar-green-belt-mvp.vercel.app/
- **Professional Pitch Deck Presentation Link (PPT/Google Slides):** `PENDING_PITCH_DECK`
- **Full End-to-End Product Walkthrough Demo Video (1-Minute):** `PENDING_DEMO_VIDEO`
