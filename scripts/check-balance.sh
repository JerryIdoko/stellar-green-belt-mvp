#!/usr/bin/env bash
# ── Utility: Fetch XLM balance from Horizon ──
# Usage: ./scripts/check-balance.sh GABC...123 [testnet|mainnet]
set -euo pipefail

ADDR="${1:?Usage: $0 <public-key> [network]}"
NET="${2:-testnet}"

if [ "$NET" = "mainnet" ]; then
  HORIZON="https://horizon.stellar.org"
else
  HORIZON="https://horizon-testnet.stellar.org"
fi

echo "→ $ADDR @ $HORIZON"
curl -s "$HORIZON/accounts/$ADDR" | python3 -c "
import json, sys
try:
    d = json.load(sys.stdin)
    for b in d.get('balances', []):
        print(f\"  {b.get('asset_type', 'native')}: {b.get('balance', '?')}\")
except Exception as e:
    print(f'Error: {e}')
" 2>/dev/null || echo "Failed to fetch balance"
