/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  pageExtensions: ["page.tsx"],
  images: {
    formats: ["image/webp"]
  },
  compiler: {
    emotion: true
  }
};

module.exports = nextConfig;
