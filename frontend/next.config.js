/** @type {import("next").NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  distDir: process.env.NODE_ENV === "development" ? ".next-live" : ".next",
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "5000",
        pathname: "/uploads/**",
      },
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
};

module.exports = nextConfig;
