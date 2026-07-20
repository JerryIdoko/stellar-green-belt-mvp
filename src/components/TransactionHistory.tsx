"use client";

import { useState, useMemo } from "react";
import type { TransactionRecord } from "@/types";

const STORAGE_KEY = "crowdfund_tx_history";

export function loadTxHistory(): TransactionRecord[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function saveTxRecord(record: TransactionRecord) {
  const entries = loadTxHistory();
  entries.unshift(record);
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(entries.slice(0, 100)));
  } catch {
  }
}

interface TransactionHistoryProps {
  records: TransactionRecord[];
}

export default function TransactionHistory({ records }: TransactionHistoryProps) {
  const [sortBy, setSortBy] = useState<"date" | "amount">("date");
  const [filterStatus, setFilterStatus] = useState<"all" | "confirmed" | "failed">("all");

  const filtered = useMemo(() => {
    const filtered = filterStatus === "all" ? records : records.filter((r) => r.status === filterStatus);
    return [...filtered].sort((a, b) => {
      if (sortBy === "amount") return b.amount - a.amount;
      return b.timestamp - a.timestamp;
    });
  }, [records, sortBy, filterStatus]);

  const handleExport = () => {
    const header = "Hash,Amount,Status,Timestamp,Error\n";
    const rows = filtered
      .map((r) => `${r.hash},${r.amount},${r.status},${new Date(r.timestamp).toISOString()},"${r.error ?? ""}"`)
      .join("\n");
    const blob = new Blob([header + rows], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "crowdfund-transactions.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  if (records.length === 0) return null;

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm sm:p-6">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <h3 className="text-lg font-semibold text-gray-900">Transaction History</h3>
        <div className="flex items-center gap-2">
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value as "all" | "confirmed" | "failed")}
            className="rounded-lg border border-gray-300 px-3 py-1.5 text-xs focus:border-indigo-500 focus:outline-none"
          >
            <option value="all">All</option>
            <option value="confirmed">Confirmed</option>
            <option value="failed">Failed</option>
          </select>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as "date" | "amount")}
            className="rounded-lg border border-gray-300 px-3 py-1.5 text-xs focus:border-indigo-500 focus:outline-none"
          >
            <option value="date">Date</option>
            <option value="amount">Amount</option>
          </select>
          <button
            onClick={handleExport}
            className="min-h-[36px] rounded-lg border border-gray-300 px-3 py-1.5 text-xs text-gray-600 transition-colors hover:bg-gray-100"
          >
            Export CSV
          </button>
        </div>
      </div>

      <div className="space-y-2">
        {filtered.slice(0, 10).map((tx) => (
          <div
            key={tx.hash}
            className="flex items-center justify-between rounded-lg border border-gray-100 bg-gray-50 px-4 py-2.5"
          >
            <div className="min-w-0 flex-1">
              <p className="truncate font-mono text-xs text-gray-900">{tx.hash}</p>
              <p className="text-xs text-gray-500">{new Date(tx.timestamp).toLocaleString()}</p>
            </div>
            <div className="ml-3 flex items-center gap-2">
              <span className="text-sm font-semibold text-gray-900">{tx.amount} XLM</span>
              <span
                className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${
                  tx.status === "confirmed"
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {tx.status}
              </span>
            </div>
          </div>
        ))}
        {filtered.length === 0 && (
          <p className="py-4 text-center text-sm text-gray-400">No transactions match this filter.</p>
        )}
      </div>

      {records.length > 10 && (
        <p className="mt-3 text-center text-xs text-gray-400">
          Showing 10 of {records.length} transactions.
        </p>
      )}
    </div>
  );
}
