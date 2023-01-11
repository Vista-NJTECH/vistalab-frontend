/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    domains: ["124.223.196.177"],
  },
  env: {
    BACKEND_URL: "http://124.223.196.177:8181/",
  },
};

module.exports = nextConfig;
