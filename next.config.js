/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  pageExtensions: ["page.tsx", "page.ts"],
  images: {
    formats: ["image/webp"]
  },
  compiler: {
    emotion: true
  }
};

module.exports = nextConfig;
