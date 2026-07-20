export const STELLAR_ADDRESS_REGEX = /^G[A-Z0-9]{55}$/;
export const XLM_AMOUNT_REGEX = /^\d+(\.\d{1,7})?$/;

export interface ValidationResult {
  valid: boolean;
  error?: string;
}

export function validateStellarAddress(addr: string): ValidationResult {
  if (!addr) return { valid: false, error: "Address is required" };
  if (!STELLAR_ADDRESS_REGEX.test(addr)) {
    return { valid: false, error: "Invalid Stellar address format" };
  }
  return { valid: true };
}

export function validateContributionAmount(
  amount: string,
  min = 1,
  max = 100_000,
): ValidationResult {
  if (!amount || amount.trim() === "") {
    return { valid: false, error: "Amount is required" };
  }
  if (!XLM_AMOUNT_REGEX.test(amount.trim())) {
    return { valid: false, error: "Enter a valid number (e.g. 10 or 10.5)" };
  }
  const n = Number(amount);
  if (isNaN(n) || n <= 0) {
    return { valid: false, error: "Amount must be greater than 0" };
  }
  if (n < min) {
    return { valid: false, error: `Minimum contribution is ${min} XLM` };
  }
  if (n > max) {
    return { valid: false, error: `Maximum contribution is ${max.toLocaleString()} XLM` };
  }
  return { valid: true };
}
