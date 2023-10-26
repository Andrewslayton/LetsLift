/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true,
  },
  webpack: (config, { webpack, isServer, nextRuntime }) => {
    // only necessary for warning caused by aws-sdk and turbopack
    if (isServer && nextRuntime === "nodejs") {
      config.plugins.push(
        new webpack.IgnorePlugin({
          resourceRegExp: /^(aws-crt|@aws-sdk\/signature-v4-crt)$/,
        })
      );
    }
    return config;
  },
};

module.exports = nextConfig
