import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  assetPrefix: 'https://handshakr.duckdns.org',
  
  //ignore linter during build
  eslint: {
    ignoreDuringBuilds: true,
  },

  output: 'standalone', 
  
};

export default nextConfig;