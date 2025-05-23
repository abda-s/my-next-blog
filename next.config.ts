import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export', // Enable static HTML export
  basePath: '/my-new-blog', // Replace with your GitHub repo name
  assetPrefix: '/my-new-blog/',
  trailingSlash: true, // Required for GitHub Pages to handle static routes
};

export default nextConfig;
