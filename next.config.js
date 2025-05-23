const nextConfig = {
  output: 'export', // Enable static HTML export
  basePath: '/my-new-blog', // Replace with your GitHub repo name if deploying under a subpath
  assetPrefix: '/my-new-blog/',
  trailingSlash: true, // Required for GitHub Pages to handle static routes
};

module.exports = nextConfig;