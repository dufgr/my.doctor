import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  outputFileTracingRoot: process.cwd(),
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
};

export default nextConfig;
