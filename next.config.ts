/** @type {import('next').NextConfig} */
const pkg = require("./package.json");

const nextConfig = {
  output: "export",
  distDir: "build",
  basePath: "/vicflex-bracket-filter",
  assetPrefix: "/vicflex-bracket-filter/",
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  env: {
    NEXT_PUBLIC_APP_VERSION: pkg.version,
  },
};

module.exports = nextConfig;
