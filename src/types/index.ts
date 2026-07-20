export interface CampaignState {
  totalRaised: number;
  target: number;
  deadlineTimestamp: number;
  isClaimed: boolean;
}

export type TxStatus = "idle" | "awaiting_approval" | "validating" | "success" | "failure";

export interface TxState {
  status: TxStatus;
  hash: string | null;
  error: string | null;
}

export interface FeedbackEntry {
  rating: number;
  comment: string;
  timestamp: number;
  address?: string;
}

export interface TransactionRecord {
  hash: string;
  amount: number;
  status: "confirmed" | "failed";
  timestamp: number;
  error?: string;
}
