/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  distDir: "build", // optional: clean separation for .next
  images: {
    unoptimized: true,
  },
  assetPrefix: "./",
  trailingSlash: true,
};
module.exports = nextConfig;
