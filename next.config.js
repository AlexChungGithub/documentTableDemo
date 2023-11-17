/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ["@radix-ui/themes"],
  async redirects() {
    return [
      {
        source: '/',
        destination: '/documents/root',
        permanent: false,
      },
      {
        source: '/documents',
        destination: '/documents/root',
        permanent: false,
      },
      {
        source: '/settings',
        destination: '/settings/profile',
        permanent: false,
      },
    ];
  },
  // webpack5: true,
  webpack: (config) => {
    config.resolve.fallback = { fs: false, child_process: false };

    return config;
  },
};

module.exports = nextConfig;
