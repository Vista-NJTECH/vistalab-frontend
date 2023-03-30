/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    domains: ["vista.online.njtech.edu.cn"],
  },
  
  env: {
    BACKEND_URL: "https://vista.online.njtech.edu.cn/backend/",
  },
};

module.exports = nextConfig;
