# User Guide — Green Belt Crowdfund

A step-by-step guide for non-technical users to connect, contribute, and interact safely with the Stellar crowdfunding dApp.

---

## 1. Choosing a Wallet

This dApp supports three browser-based Stellar wallets:

| Wallet | Installation Link | Network Support |
|---|---|---|
| **Freighter** | https://www.freighter.app/ | Testnet + Mainnet |
| **xBull** | https://xbull.app/ | Testnet + Mainnet |
| **Albedo** | https://albedo.link/ | Testnet + Mainnet |

**Recommendation:** Use **Freighter** — it has the most straightforward Testnet setup.

### Installation Steps (Freighter)
1. Visit https://www.freighter.app/
2. Click **Add to Chrome** (or Firefox)
3. Follow the browser extension prompt to install
4. Click the Freighter icon in your browser toolbar
5. Select **Create a new wallet** and save your recovery phrase offline (never share it)
6. Set a password

---

## 2. Switching to Testnet

### Freighter
1. Open Freighter (click the extension icon)
2. Click the gear icon ⚙️ in the top-right
3. Under **Network**, select **Testnet**
4. The network badge should now show "TESTNET"

### Why Testnet?
Testnet uses free, fake XLM. No real money is involved. You can request free test tokens from the Stellar friendbot.

---

## 3. Getting Free Testnet XLM

### Option A: Stellar Laboratory Faucet
1. Go to https://laboratory.stellar.org/#account-creator?network=testnet
2. Paste your wallet's public address (starts with `G...`)
3. Click **Get Testnet XLM** or **Create Account**
4. You will receive 10,000 free Testnet XLM instantly

### Option B: Friendbot via Command Line
```bash
curl "https://friendbot.stellar.org?addr=YOUR_PUBLIC_ADDRESS"
```

### How to Find Your Public Address
- **Freighter:** Click the extension icon → your address is shown at the top (starts with `G`)
- **xBull:** Open extension → copy address from the main screen
- **Albedo:** Open extension → address is displayed in the dashboard

---

## 4. Connecting to the dApp

1. Open the Green Belt Crowdfund dApp at the production URL
2. Click **Connect Wallet** (large button in the center of the page)
3. A modal appears listing available wallets
4. Click your wallet (Freighter, xBull, or Albedo)
5. Your wallet extension will prompt you to confirm the connection
6. **Approve** the connection request

**Connected successfully:** Your wallet address will appear in the top-right corner, truncated as `GABCDE...1234`.

---

## 5. Viewing the Campaign

After connecting, the dashboard shows:

| Section | What it tells you |
|---|---|
| **Progress Bar** | How much XLM has been raised vs. the target goal |
| **Countdown Timer** | Time remaining before the campaign deadline |
| **Contribute Form** | Input field + button to send XLM |
| **Transaction History** | List of your past contributions (sorted by date or amount) |
| **Feedback Button** | Floating chat icon (bottom-right) for submitting comments |

---

## 6. Making a Contribution

1. Enter the amount of XLM you want to contribute (whole numbers only)
2. Click **Contribute**
3. Your wallet extension will open and show the transaction details:
   - **Amount:** The XLM you are sending
   - **Fee:** The network fee (usually very small, ~0.00001 XLM)
   - **Destination:** The crowdfund contract address
4. **Review the details** carefully
5. Click **Approve** or **Confirm** in your wallet

### During Transaction Processing
The UI will show status messages:
- ⏳ **Awaiting Wallet Approval...** — waiting for you to confirm in your wallet
- ⏳ **Validating Block Ledger...** — transaction is being processed on the Stellar network
- ✅ **Success** — green banner with a transaction hash (clickable to view on Stellar.Expert)
- ❌ **Failure** — red banner with an error description and a dismiss button

---

## 7. Understanding Transaction Status

| Status | Meaning | What to Do |
|---|---|---|
| **Awaiting Wallet Approval** | Wallet prompt is open | Check your browser extension |
| **Validating Block Ledger** | Sent to network, waiting for confirmation | Wait a few seconds |
| **Success** | Confirmed on-chain | View the hash on Stellar.Expert |
| **Failure** | Rejected or errored | Check the error message and retry |

### Common Errors & Fixes

| Error | Cause | Solution |
|---|---|---|
| "User rejected" | You cancelled in wallet | Click Contribute again and approve |
| "Insufficient balance" | Not enough XLM | Request testnet XLM from the faucet |
| "Wallet not detected" | Extension not installed | Install Freighter/xBull/Albedo |
| "Soroban Fetch Error" | Network timeout | Click **Refresh** button |

---

## 8. Managing Your Keys Safely

### DO
- ✅ Store your recovery phrase in a secure offline location (password manager or physical safe)
- ✅ Use a dedicated wallet for dApp interactions (separate from your main holdings)
- ✅ Verify you are on the correct network (Testnet vs Mainnet)

### DON'T
- ❌ Never share your secret key or recovery phrase with anyone
- ❌ Never enter your secret key into any website or dApp form
- ❌ Don't use the same wallet for Testnet and Mainnet without understanding the risks
- ❌ Don't approve transactions without reviewing the details

---

## 9. Submitting Feedback

1. Click the **chat bubble icon** (bottom-right corner of any page)
2. A feedback form opens with:
   - **Star rating** (1-5) — tap a star to rate
   - **Comment** — optional text about your experience
3. Click **Submit Feedback**
4. A green checkmark confirms your feedback was saved

Your feedback is stored locally in your browser. No data is sent to any server unless `NEXT_PUBLIC_POSTHOG_KEY` is configured.

---

## 10. Getting Help

| Resource | Link |
|---|---|
| Stellar Testnet Faucet | https://laboratory.stellar.org/#account-creator?network=testnet |
| Freighter Wallet Support | https://help.freighter.app/ |
| Stellar.Expert Explorer | https://stellar.expert/ |
| Report Security Issues | See [SECURITY.md](./SECURITY.md) |

---

## Appendix: Glossary

| Term | Definition |
|---|---|
| **XLM** | The native cryptocurrency of the Stellar network |
| **Testnet** | A free, simulated network for testing (fake XLM) |
| **Mainnet** | The real Stellar network (real XLM, real value) |
| **Fee Bump** | A Stellar feature where one account pays fees for another's transaction |
| **Soroban** | Stellar's smart contract platform |
| **Contract ID** | Unique address of a smart contract on the Stellar network |
