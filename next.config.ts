import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: '/index.html',
        destination: '/',
        permanent: true,
      },
      {
        source: '/Klasemen.html',
        destination: '/',
        permanent: true,
      },
      {
        source: '/klasemen.html',
        destination: '/',
        permanent: true,
      },
      {
        source: '/klasemen',
        destination: '/',
        permanent: true,
      },
      {
        source: '/GuideBook.html',
        destination: '/guidebook',
        permanent: true,
      },
      {
        source: '/guidebook.html',
        destination: '/guidebook',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
