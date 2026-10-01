import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    // Tree-shake barrel imports from these packages so only the used
    // modules are pulled into the client/server bundles.
    optimizePackageImports: [
      "@portabletext/react",
      "@sanity/client",
      "@sanity/image-url",
      "next-sanity",
    ],
  },

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
      // Legacy ?page= pagination -> path-based pagination.
      // (Category `/:slug` is intentionally excluded so /search?page=N keeps working.)
      {
        source: "/tag/:slug",
        has: [{ type: "query", key: "page", value: "(?<page>\\d+)" }],
        destination: "/tag/:slug/page/:page",
        permanent: true,
      },
      {
        source: "/authors/:slug",
        has: [{ type: "query", key: "page", value: "(?<page>\\d+)" }],
        destination: "/authors/:slug/page/:page",
        permanent: true,
      },
      {
        source: "/podcasts",
        has: [{ type: "query", key: "page", value: "(?<page>\\d+)" }],
        destination: "/podcasts/page/:page",
        permanent: true,
      },
      {
        source: "/photos",
        has: [{ type: "query", key: "category", value: "(?<category>[^&]+)" }],
        destination: "/photos/category/:category",
        permanent: true,
      },
      {
        source: "/photos",
        has: [{ type: "query", key: "page", value: "(?<page>\\d+)" }],
        destination: "/photos/page/:page",
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