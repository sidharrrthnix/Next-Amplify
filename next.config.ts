import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  compress: true,
  images: {
    unoptimized: true,
    domains: ["main.dm40kmgbmy3ut.amplifyapp.com"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*.amplifyapp.com",
      },
    ],
  },
  productionBrowserSourceMaps: false,
  poweredByHeader: false,
  reactStrictMode: true,
  experimental: {
    serverActions: {
      allowedOrigins: ["*.amplifyapp.com"],
    },
  },

  outputFileTracingRoot: process.cwd(),
  outputFileTracingExcludes: {
    "*": [
      "node_modules/@swc/core-linux-x64-gnu",
      "node_modules/@swc/core-linux-x64-musl",
      "node_modules/@esbuild/linux-x64",
      "node_modules/@next/swc-darwin-arm64",
      "node_modules/@next/swc-darwin-x64",
      "node_modules/@next/swc-linux-arm64-gnu",
      "node_modules/@next/swc-linux-arm64-musl",
      "node_modules/@next/swc-win32-arm64-msvc",
      "node_modules/@next/swc-win32-ia32-msvc",
      "node_modules/@next/swc-win32-x64-msvc",
    ],
  },
};

export default nextConfig;
