import type { NextConfig } from "next";
import { BundleAnalyzerPlugin } from "webpack-bundle-analyzer";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  // TypeScript configuration
  typescript: {
    // Enable type checking during build for production
    ignoreBuildErrors: false,
  },

  // Image optimization configuration
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "assets.aceternity.com",
      },
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
      },
    ],
    // Optimize image quality and formats
    formats: ["image/webp", "image/avif"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 2592000, // 30 days — images rarely change
  },

  // React Compiler (requires babel-plugin-react-compiler)
  // Disabled for now - can be enabled later by installing:
  // pnpm add -D babel-plugin-react-compiler
  // reactCompiler: true,


  // Enable experimental features
  experimental: {
    // Optimize CSS
    optimizeCss: true,
  },

  // Turbopack configuration (empty to silence webpack warning)
  turbopack: {},

  // Compression
  compress: true,

  // Redirects for merged service pages
  async redirects() {
    return [
      {
        source: "/service/end-to-end-integration",
        destination: "/service/integration-and-automation",
        permanent: true,
      },
      {
        source: "/service/enterprise-automation",
        destination: "/service/integration-and-automation",
        permanent: true,
      },
    ];
  },

  // Security and performance headers
  async headers() {
    // Build CSP header based on environment
    const isDevelopment = process.env.NODE_ENV === "development";
    const cspMode = isDevelopment ? "Content-Security-Policy-Report-Only" : "Content-Security-Policy";

    // CSP directives
    const cspDirectives = [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' 'unsafe-eval'", // unsafe-eval needed for some libraries in dev
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      "img-src 'self' data: https://cdn.sanity.io https://images.unsplash.com https://assets.aceternity.com",
      "font-src 'self' data: https://fonts.gstatic.com",
      "connect-src 'self' https://api.web3forms.com https://www.google-analytics.com https://*.google-analytics.com https://*.analytics.google.com https://*.googletagmanager.com https://*.sanity.io https://*.arcjet.com https://raw.githack.com https://raw.githubusercontent.com",
      "frame-src 'none'",
      "object-src 'none'",
      "base-uri 'self'",
      "form-action 'self'",
      "frame-ancestors 'self'",
      "upgrade-insecure-requests",
    ].join("; ");

    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "X-DNS-Prefetch-Control",
            value: "on",
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "X-Frame-Options",
            value: "SAMEORIGIN",
          },
          {
            key: "X-XSS-Protection",
            value: "1; mode=block",
          },
          {
            key: "Referrer-Policy",
            value: "origin-when-cross-origin",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=(), interest-cohort=()",
          },
          {
            key: cspMode,
            value: cspDirectives,
          },
        ],
      },
      {
        source: "/(.*)\\.(jpg|jpeg|png|gif|svg|webp|avif|ico)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        source: "/(.*)\\.(js|css|woff|woff2|ttf|otf)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },

  // Webpack configuration for bundle analysis
  // Only used when explicitly running with --webpack flag or ANALYZE=true
  webpack: (config, { isServer }) => {
    // Bundle analyzer (enabled via ANALYZE=true env variable)
    if (process.env.ANALYZE === "true") {
      config.plugins.push(
        new BundleAnalyzerPlugin({
          analyzerMode: "static",
          reportFilename: isServer
            ? "../analyze/server.html"
            : "./analyze/client.html",
          openAnalyzer: false,
        })
      );
    }

    return config;
  },
} as NextConfig;

export default withNextIntl(nextConfig);
