import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Skip Next.js image optimization.
    // Sanity's CDN already serves optimized images.
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
        port: "",
        pathname: "/images/**",
      },
    ],
  },

  async redirects() {
    return [
      {
        source: "/author/:slug",
        destination: "/authors/:slug",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;