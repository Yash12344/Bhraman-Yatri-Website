import type { Metadata, Viewport } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://bhramanyatri.com"),
  title: {
    default: "Bhraman Yatri — Explore Beyond Limits | Himalayan Treks & Tours",
    template: "%s | Bhraman Yatri",
  },
  description:
    "Discover India's most beautiful treks with Bhraman Yatri. Hampta Pass, Kedarkantha, Valley of Flowers and more — expert guides, small groups and best prices.",
  keywords: [
    "Himalayan treks",
    "trekking in India",
    "Hampta Pass trek",
    "Kedarkantha trek",
    "Valley of Flowers trek",
    "Uttarakhand treks",
    "adventure travel India",
  ],
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://bhramanyatri.com",
    siteName: "Bhraman Yatri",
    title: "Bhraman Yatri — Explore Beyond Limits | Himalayan Treks & Tours",
    description:
      "Discover India's most beautiful treks with Bhraman Yatri. Expert guides, small groups and best prices across the Himalayas.",
    images: [
      {
        url: "/site-images/hero/slide-1-explore-beyond-limits.jpg",
        width: 1920,
        height: 1080,
        alt: "A trekker facing snow-covered Himalayan peaks",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Bhraman Yatri — Explore Beyond Limits",
    description:
      "Discover India's most beautiful treks with Bhraman Yatri. Expert guides, small groups and best prices.",
    images: ["/site-images/hero/slide-1-explore-beyond-limits.jpg"],
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0d3527",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={poppins.variable}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
