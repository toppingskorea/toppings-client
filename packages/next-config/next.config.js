/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  webpack: config => {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"]
    });

    return config;
  },
  async rewrites() {
    return [
      {
        source: "/v1/:path*",
        destination: `http://api.toppings.co.kr:28080/api/v1/:path*`
      },
      {
        source: "/v2/:path*",
        destination: `http://api.toppings.co.kr:28080/api/v2/:path*`
      }
    ];
  },
  pageExtensions: ["page.tsx", "page.ts"],
  images: {
    domains: ["cdnjs.cloudflare.com"],
    formats: ["image/webp"]
  },
  compiler: {
    emotion: true
  }
};

module.exports = nextConfig;
