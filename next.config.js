/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'source.unsplash.com',
      },
    ],
  },
  transpilePackages: ["@nivo"], experimental: { esmExternals: "loose", }
}

module.exports = nextConfig
