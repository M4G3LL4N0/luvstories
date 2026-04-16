import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  turbopack: {
    root: path.join(__dirname),
    resolveAlias: {
      '@': path.join(__dirname, 'src'),
      '@/components': path.join(__dirname, 'src/components'),
    },
  },
};

export default nextConfig;
