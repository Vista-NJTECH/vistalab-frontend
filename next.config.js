/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    domains: ["124.223.196.177"],
  },
  env: {
    BACKEND_URL: "https://backend.vistalab.top/",
  },
};

module.exports = nextConfig;
