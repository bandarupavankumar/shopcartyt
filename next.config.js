/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
    domains: ['cdn.sanity.io'],
  },
  // Disable static optimization for specific pages
  experimental: {
    // Enable server actions (if needed)
    serverActions: {
      bodySizeLimit: '2mb',
    },
  },
  // Enable React Strict Mode
  reactStrictMode: true,
  // Webpack configuration
  webpack: (config) => {
    config.resolve.fallback = { fs: false, net: false, tls: false };
    return config;
  },
  // Disable static optimization for specific pages
  // Add any routes that need to be server-side rendered
  // or use client-side data fetching
  generateStaticParams() {
    return {
      // Add any dynamic routes that should be pre-rendered
    };
  },
};

module.exports = nextConfig;
