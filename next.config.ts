/** @type {import('next').NextConfig} */
const pkg = require("./package.json");
const basePath = process.env.BASE_PATH || "";

const nextConfig = {
  output: "export",
  distDir: "build",
  ...(basePath ? { basePath, assetPrefix: `${basePath}/` } : {}),
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  env: {
    NEXT_PUBLIC_APP_VERSION: pkg.version,
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
};

module.exports = nextConfig;
