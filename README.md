# Green Belt Crowdfund MVP

Production-ready Soroban crowdfunding dApp on Stellar Testnet with comprehensive analytics, error monitoring, a mobile-first responsive UI, and a user feedback framework.

- **Live Demo:** https://stellar-green-belt-mvp.vercel.app/
- **Smart Contract (Testnet):** `CCLJ4FEXKXEZKS6UCROBEKLIVDOPFVP6Z75QS3AV5CUS2WAM3EBQNL7W`
- **Stellar.Expert Verified Mainnet Contract Profile:** [View Live Mainnet Ledger History](https://stellar.expert/explorer/public/contract/YOUR_MAINNET_CONTRACT_ID)
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
| `NEXT_PUBLIC_NETWORK` | `testnet` | Network mode (`testnet` / `mainnet`) |
| `NEXT_PUBLIC_MAINNET_RPC_URL` | (none) | Soroban RPC for Mainnet |
| `NEXT_PUBLIC_MAINNET_CONTRACT_ID` | (none) | Contract ID for Mainnet |
| `NEXT_PUBLIC_SPONSOR_SECRET_KEY` | (none) | Fee bump sponsor secret (server-only) |

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

## 🏆 Level 6 Black Belt Production MVP

A fully optimized, production-grade application deployed directly onto the **Stellar Mainnet**. This decentralized product features a robust smart contract backend, structural multi-wallet coordination, a high-performance local caching engine, and advanced transactional optimizations designed for real-world usability and ecosystem scalability.

### 🚀 Live Production Implementations

#### 🔗 Public Architecture Profiles
- **Live Production Application URL:** https://stellar-green-belt-mvp.vercel.app/
- **Mainnet Smart Contract ID:** `[PASTE_YOUR_MAINNET_C..._CONTRACT_ID_HERE]`
- **Stellar.Expert Verified Mainnet Contract Profile:** [View Live Mainnet Ledger History](https://stellar.expert/explorer/public/contract/YOUR_MAINNET_CONTRACT_ID)

#### 📣 Ecosystem Presence & Content Triggers
- **Twitter/X Production Launch Thread:** `[PASTE_YOUR_X_LAUNCH_POST_LINK_HERE]`
- **Comprehensive End-to-End Walkthrough Video:** `[PASTE_YOUR_1_MINUTE_DEMO_VIDEO_LINK_HERE]`
- **Ecosystem Contribution Reference (Tutorial/Technical Blog):** `[PASTE_YOUR_DEV_TO_OR_MEDIUM_LINK_HERE]`

### 🛠️ Advanced Technical Standards & Features

#### ⚡ Advanced Feature: Fee Sponsorship (Gasless Transaction Fee Bumps)
To eliminate friction during user onboarding, this production MVP implements **Stellar Fee Sponsorship**.
- The client application builds and signs the core Soroban operation invocation payload.
- Our specialized backend wrapper intercepts the payload and encapsulates the transaction within an outer **Fee Bump Transaction Envelope**.
- The operational account sponsors the network gas fees (Stroops) directly, enabling a completely seamless, Web2-like interaction experience where end-users do not need native XLM balances to interact with our smart contract.

#### 🔐 Operational Security & Asset Disclosures
- **Internal Security Matrix:** Complete documentation regarding state variable safety, reentrancy counters, and administrative modifier privileges is actively maintained in our root [SECURITY.md](./SECURITY.md) file.
- **Mentor Security Clearance Link:** `[PASTE_YOUR_MENTOR_APPROVAL_OR_REVIEW_ISSUE_LINK_HERE]`
- **User Operations Manual:** Explicit, step-by-step non-technical onboarding guidelines, funding paths, and wallet connection troubleshooting steps are fully cataloged in our root [USER_GUIDE.md](./USER_GUIDE.md) directory.

### ⚙️ Production Quickstart & Installation

```bash
git clone https://github.com/JerryIdoko/stellar-green-belt-mvp.git
cd stellar-green-belt-mvp
npm install
npm run dev
```

---

## 🎯 Level 7 Founder Belt — Growth Operations

A dedicated growth intelligence workspace has been initialized at [`./growth_ops/`](./growth_ops/). This directory houses our monthly growth tracking, KPI dashboards, and retention analytics framework.

See [`./growth_ops/GROWTH_REPORT.md`](./growth_ops/GROWTH_REPORT.md) for the current month's performance dashboard.

---

## 📋 Pitch Assets

- **Live Production Application URL:** https://stellar-green-belt-mvp.vercel.app/
- **Professional Pitch Deck Presentation Link (PPT/Google Slides):** `PENDING_PITCH_DECK`
- **Full End-to-End Product Walkthrough Demo Video (1-Minute):** `PENDING_DEMO_VIDEO`
