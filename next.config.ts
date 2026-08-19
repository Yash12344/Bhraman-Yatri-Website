import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: {
    // `output: "export"` has no image optimisation server, so images are
    // served as authored. Required — without it the export build fails.
    unoptimized: true,
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
