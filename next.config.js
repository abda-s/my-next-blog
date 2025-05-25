const nextConfig = {
  output: 'export', // Enable static HTML export
  basePath: '/my-next-blog', // Replace with your GitHub repo name if deploying under a subpath
  assetPrefix: '/my-next-blog',
  trailingSlash: true, // Required for GitHub Pages to handle static routes
};

module.exports = nextConfig;