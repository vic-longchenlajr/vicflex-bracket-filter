/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === "production";

const nextConfig = {
  output: "export",
  distDir: "build", // optional: clean separation for .next
  images: {
    unoptimized: true,
  },
  assetPrefix: isProd ? "./" : "",
  trailingSlash: true,
};
module.exports = nextConfig;
