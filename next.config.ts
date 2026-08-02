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

  // NOTE: Do NOT add custom Cache-Control headers for page routes.
  // Next.js ISR (revalidate) automatically sets the correct cache headers.
  // Adding max-age=0 here would disable Netlify CDN caching and massively
  // increase serverless function calls and billing costs.
};

export default nextConfig;