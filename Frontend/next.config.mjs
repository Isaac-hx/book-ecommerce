/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "via.placeholder.com",
      },
      {
        hostname: "cdn.gramedia.com",
      },
    ],
  },
};

export default nextConfig;
