import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  transpilePackages: ["@repo/store"],
  async rewrites() {
    return [
      {
        source: "/api/auth/:path*", // this is the route NextAuth uses
        destination: "http://localhost:3001/api/auth/:path*", // backend server with auth logic
      },
    ];
  },
};

export default nextConfig;
