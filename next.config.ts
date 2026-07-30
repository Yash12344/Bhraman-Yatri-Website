import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Local placeholder images ship in public/images; this whitelist lets
    // them be swapped for real Unsplash photography without config changes.
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
};

export default nextConfig;
