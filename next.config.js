/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  webpack: config => {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"]
    });

    return config;
  },
  pageExtensions: ["page.tsx", "page.ts"],
  images: {
    formats: ["image/webp"]
  },
  compiler: {
    emotion: true
  }
};

module.exports = nextConfig;
