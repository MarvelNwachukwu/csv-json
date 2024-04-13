/** @type {import('next').NextConfig} */

const imageConfig = {
  images: {
    domains: ['cdn.buymeacoffee.com'],
  },
};
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  ...imageConfig,
};

export default nextConfig;
