import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["@clickcollect/db", "@clickcollect/shared"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "utfs.io", // UploadThing
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com", // Google avatars
      },
    ],
  },
};

export default nextConfig;
