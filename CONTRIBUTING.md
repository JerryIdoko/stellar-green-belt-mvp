# Contributing to Green Belt Crowdfund

We welcome contributions! Here's how to help.

## Getting Started
1. Fork the repo.
2. Create a feature branch: `git checkout -b feat/your-feature`.
3. Install deps: `npm install` (requires Node 22 via `.nvmrc`).
4. Run the dev server: `npm run dev`.

## Code Standards
- **TypeScript**: Strict mode, no `any` unless absolutely necessary.
- **Components**: Named exports, co-located types, React functional components.
- **Context**: Keep providers focused; expose typed hooks for consumers.
- **Utils**: Pure functions with no side effects unless documented.

## Commit Convention
```
<type>: <short description>

Types: feat, fix, docs, refactor, test, chore
```
Use lowercase, no period at end of subject line.

## Before Submitting
- `npx tsc --noEmit` must pass with zero errors.
- `npm run build` must succeed.
- Test your changes on Testnet with a funded Freighter wallet.

## Questions
Open a GitHub Discussion or reach out to onojajerome04@gmail.com.
