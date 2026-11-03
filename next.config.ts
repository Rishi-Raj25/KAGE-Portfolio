import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return { beforeFiles: [{ source: "/", destination: "/landing-pages/kage.html" }] };
  },
};

export default nextConfig;
