import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
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