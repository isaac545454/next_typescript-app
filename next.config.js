/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["images.prismic.io", "media-exp1.licdn.com"],
  },
};

module.exports = nextConfig;
