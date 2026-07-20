import type { Metadata } from "next";
import { AnalyticsProvider } from "@/context/AnalyticsContext";
import { CrowdfundProvider } from "@/context/CrowdfundContext";
import ErrorBoundary from "@/components/ErrorBoundary";
import "./globals.css";

export const metadata: Metadata = {
  title: "Green Belt Crowdfund",
  description: "Production-ready Soroban crowdfunding dApp on Stellar Testnet",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-50 antialiased">
        <ErrorBoundary>
          <AnalyticsProvider>
            <CrowdfundProvider>{children}</CrowdfundProvider>
          </AnalyticsProvider>
        </ErrorBoundary>
      </body>
    </html>
  );
}
