import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  transpilePackages: ['@ricat/shared'],
  reactStrictMode: true,
  cleanDistDir: false,
};

export default nextConfig;

