/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: `${process.env.NEXT_PUBLIC_DOMAIN}`,
        pathname: '**',
      },
    ],
  },
};

module.exports = nextConfig;
