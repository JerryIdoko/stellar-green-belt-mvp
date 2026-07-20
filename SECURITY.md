# Security Policy — Green Belt Crowdfund

## Supported Versions

| Version | Supported |
|---|---|
| Production (green-belt-main) | ✅ Active |
| Development (feature branches) | ⚠️ Limited |
| Previous (orange-belt) | ❌ End of life |

---

## Access-Control Matrix

| Role | Permissions | Implementation |
|---|---|---|
| **Contract Owner** | Deploy, initialize, claim funds | `initialize` fn — only callable once; `claim` fn — callable only by the contract deployer after deadline + target met |
| **User (Donor)** | `fund(donor, amount)` — contribute XLM | No admin keys needed. Donations are additive and cannot be withdrawn by individual donors. |
| **Any Address** | `get_status()` — read-only query | Public view function. No authentication required. |
| **Sponsor (Fee Bump)** | Wrap user txs with fee sponsorship | Off-chain mechanism; sponsor key stored as `NEXT_PUBLIC_SPONSOR_SECRET_KEY` (server-side only). |
| **Analytics Provider** | Fire PostHog events | Client-side only. `NEXT_PUBLIC_POSTHOG_KEY` controls activation. |

---

## Defensive Constraints

### Reentrancy Protection
- The Soroban runtime uses a single-threaded execution model that prevents reentrancy by design. State changes within a contract call are applied atomically upon successful completion.
- The `claim` function checks `claimed` state flag before transferring funds, ensuring a single payout per campaign.

### Overflow & Underflow Guards
- Soroban's Rust-based VM provides native checked arithmetic; overflow panics at runtime.
- The contract uses `u64` for all monetary values. The frontend casts with `Number()` for display — values stay well within safe bounds for testnet amounts.

### State Variable Safety
| Variable | Mutability | Risk Mitigation |
|---|---|---|
| `total_raised` | Incremented only, never reset | Monotonic; no race condition on increment |
| `target` | Set once in `initialize` | Immutable after deployment |
| `deadline` | Set once in `initialize` | Immutable timestamp |
| `claimed` | Set `true` once in `claim` | Prevents double-claim via boolean guard |

### Frontend Defensive Measures
- **ErrorBoundary** (React component): Catches render-phase exceptions with a fallback UI.
- **3-tier error classes**: `WalletNotFound`, `UserRejected`, `InsufficientFunds` provide structured error metadata.
- **Silent-catch elimination**: All `catch {}` blocks in `CrowdfundContext` now log via `console.error` and clear stale cache state.
- **Network guard**: `requireTestnet()` throws if a Testnet-only operation executes in Mainnet mode.

---

## Vulnerability Disclosure

We take the security of this dApp seriously. If you believe you have found a security vulnerability, please report it to us as described below.

### Reporting a Vulnerability

**Please do not report security vulnerabilities through public GitHub issues.**

Instead, please report them via:

1. **Email:** onojajerome04@gmail.com
2. **PGP Key:** Available on request (include "Security Report" in subject line)

### What to Include
- Type of issue (e.g., reentrancy, access control bypass, front-running)
- Full paths of source file(s) related to the issue
- Step-by-step reproduction instructions
- Proof-of-concept code (if applicable)
- Impact assessment

### Response Timeline
- **Acknowledgment:** Within 48 hours
- **Triage & Confirmation:** Within 5 business days
- **Fix deployment:** Within 14 days of confirmation
- **Public disclosure:** 30 days after fix deployment, or earlier at the reporter's discretion

We ask that you give us a reasonable time to fix the issue before any public disclosure.

---

## Production Audit Trail

- All contract source code is available at `./soroban-crowdfund/contracts/crowdfund/src/lib.rs`
- Contract spec is embedded in `./src/contracts/crowdfund-client/src/index.ts` as a `ContractSpec` array
- Network configuration selectors are in `./src/utils/network.ts`
- Fee sponsorship wrapper is in `./src/utils/feeSponsorship.ts`
