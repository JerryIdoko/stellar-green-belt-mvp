# 🚀 Production Launch Checklist

## Pre-Launch
- [ ] Mainnet contract deployed and verified on Stellar.Expert
- [ ] `NEXT_PUBLIC_MAINNET_CONTRACT_ID` set in Vercel env vars
- [ ] `NEXT_PUBLIC_MAINNET_RPC_URL` set in Vercel env vars
- [ ] `NEXT_PUBLIC_NETWORK=mainnet` set in Vercel env vars
- [ ] Sponsor account funded with sufficient XLM for fee bumps
- [ ] `NEXT_PUBLIC_SPONSOR_SECRET_KEY` set as a **masked** env var (never exposed client-side)
- [ ] `NEXT_PUBLIC_POSTHOG_KEY` set (analytics)
- [ ] Test full contribute flow on Mainnet with small amount
- [ ] Verify `tsc --noEmit` passes
- [ ] Verify `next build` succeeds

## Marketing & Ecosystem
- [ ] Publish Twitter/X launch thread (tag @StellarOrg)
- [ ] Record 1-minute walkthrough video (Loom / ScreenPal)
- [ ] Write dev.to or Medium technical tutorial
- [ ] Submit to Stellar Ecosystem Proposals (SEP) / Stellar Community Fund
- [ ] Reach 50+ Twitter followers engaging with the project

## Post-Launch
- [ ] Monitor first week of Mainnet transactions
- [ ] Collect user feedback via FeedbackWidget
- [ ] Create first monthly GROWTH_REPORT.md entry
- [ ] Respond to all SECURITY.md report submissions within 48h
