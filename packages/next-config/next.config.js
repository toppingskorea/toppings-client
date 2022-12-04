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
        source: "/api/:path*",
        destination: `http://api.toppings.co.kr:28080/:path*`
      }
    ];
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
