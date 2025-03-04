import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.scryfall.io',
        pathname: '**',
      },
    ],
  }
};

export default nextConfig;
