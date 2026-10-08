import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: '/project/:id',
        destination: '/projects/:id',
        permanent: true,
      },
      {
        source: '/admin',
        destination: '/admin/dashboard',
        permanent: false,
      },
    ];
  },
  images: {
    // Allow local Next.js public folder (default) and uploads served via next
    // No external domains needed unless blog/project images are hosted remotely.
    // If remote images are stored externally, add their domains here explicitly.
    remotePatterns: [],
  },
};

export default nextConfig;
