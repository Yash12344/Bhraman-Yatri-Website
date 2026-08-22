import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  // Export every route as `<route>/index.html` instead of `<route>.html`.
  //
  // On Hostinger there is no Next.js server to map a clean URL onto a file:
  // Apache serves the directory tree as-is. With flat files, opening
  // /terms-and-conditions directly — as the link on the Razorpay Payment Page
  // does — asks for a file that does not exist and gets a 404, because the
  // file on disk is terms-and-conditions.html. As a directory it resolves:
  // /terms-and-conditions/ serves its index.html, and Apache's own
  // DirectorySlash redirects /terms-and-conditions to it. Both spellings work,
  // which is what the payment page needs.
  trailingSlash: true,
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
