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
    ],
    formats: ['image/avif', 'image/webp'],
  },

  // Enable MDX pages
  pageExtensions: ['js', 'jsx', 'mdx', 'ts', 'tsx'],

  // Trailing slash configuration (match WordPress behavior)
  trailingSlash: false,

  // Compress responses
  compress: true,
};

module.exports = nextConfig;
