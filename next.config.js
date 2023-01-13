/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    domains: ["backend.vistalab.top"],
  },
  env: {
    BACKEND_URL: "https://backend.vistalab.top/",
  },
};

module.exports = nextConfig;
