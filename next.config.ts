import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Skip Vercel's image optimizer — Sanity's CDN already serves
    // dynamically-resized, format-negotiated images via cdn.sanity.io.
    // This eliminates double-optimization and stops image-optimizer usage
    // from blowing past Vercel's free-tier limit.
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
      {
        source: "/:path*",
        has: [
          {
            type: "host",
            value: "groundnarrative.com",
          },
        ],
        destination: "https://www.groundnarrative.com/:path*",
        permanent: true,
      },
      {
        source: "/:path*",
        has: [
          {
            type: "host",
            value: "tgn-nine.vercel.app",
          },
        ],
        destination: "https://www.groundnarrative.com/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;