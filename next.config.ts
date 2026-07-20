import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  compress: true,
  experimental: {
    optimizePackageImports: ["@stellar/stellar-sdk", "@creit.tech/stellar-wallets-kit"],
  },
};

export default nextConfig;
