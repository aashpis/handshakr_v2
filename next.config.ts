import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  assetPrefix: 'https://handshakr.duckdns.org',
  
  //ignore linter during build
  eslint: {
    ignoreDuringBuilds: true,
  },

  images: {
    unoptimized: true // Disable Image Optimization API
  },

  output: 'standalone', 
  
};

export default nextConfig;