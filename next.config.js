/** @type {import('next').NextConfig} */

const storagePath = process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET;

const nextConfig = {
  reactStrictMode: true,
  compiler: {
    styledComponents: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "firebasestorage.googleapis.com",
        port: "",
        pathname: `/v0/b/${storagePath}/o/**`,
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        port: "",
        pathname: `/a/**`,
      },
    ],
  },
};

module.exports = nextConfig;
