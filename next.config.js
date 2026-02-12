/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable React strict mode for better development
  reactStrictMode: true,

  // Image optimization
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'exceleur.fr',
      },
      {
        protocol: 'https',
        hostname: 'www.exceleur.fr',
      },
      {
        protocol: 'https',
        hostname: 'vumbnail.com',
      },
    ],
    formats: ['image/avif', 'image/webp'],
    // Device sizes for responsive images
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    // Image sizes for optimized loading
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    // Minimum cache TTL (1 week)
    minimumCacheTTL: 604800,
  },

  // Enable MDX pages
  pageExtensions: ['js', 'jsx', 'mdx', 'ts', 'tsx'],

  // Trailing slash configuration (match WordPress behavior)
  trailingSlash: true,

  // Compress responses
  compress: true,

  // Security headers
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
          {
            key: 'X-XSS-Protection',
            value: '0',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=(), browsing-topics=()',
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
