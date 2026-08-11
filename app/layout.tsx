import type { Metadata, Viewport } from "next";
import { Poppins } from "next/font/google";
import { TopBar } from "@/components/navbar/TopBar";
import { Navbar } from "@/components/navbar/Navbar";
import { Footer } from "@/components/footer/Footer";
import { FloatingWhatsApp } from "@/components/shared/FloatingWhatsApp";
import { SITE, SOCIAL_LINKS } from "@/lib/data";
import { getRegionsWithTreks } from "@/lib/treks";
import { getLogo } from "@/lib/branding";
import "./globals.css";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.name} — ${SITE.tagline} | Himalayan Treks & Tours`,
    template: `%s | ${SITE.name}`,
  },
  description:
    "Discover India's most beautiful treks with Bhraman Yatri. Hampta Pass, Kedarkantha, Valley of Flowers and more — expert guides, small groups and best prices.",
  keywords: [
    "Himalayan treks",
    "trekking in India",
    "Uttarakhand treks",
    "Himachal treks",
    "adventure travel India",
  ],
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: SITE.url,
    siteName: SITE.name,
    title: `${SITE.name} — ${SITE.tagline} | Himalayan Treks & Tours`,
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
    title: `${SITE.name} — ${SITE.tagline}`,
    description:
      "Discover India's most beautiful treks with Bhraman Yatri. Expert guides, small groups and best prices.",
    images: ["/site-images/hero/slide-1-explore-beyond-limits.jpg"],
  },
  robots: { index: true, follow: true },
  alternates: { canonical: SITE.url },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0f3d2e",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  // Grouped server-side so only the navigation slice of each trek — not the
  // full JSON — reaches the client. New treks and regions appear on their own.
  const regions = getRegionsWithTreks();

  // Read off disk here, in the one server component both the navbar and the
  // footer sit inside, so the client components never touch the filesystem.
  const logo = getLogo("dark");
  const footerLogo = getLogo("light");

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "TravelAgency",
    name: SITE.name,
    description: SITE.description,
    url: SITE.url,
    email: SITE.email,
    telephone: SITE.phone,
    ...(logo ? { logo: `${SITE.url}${logo.src}` } : {}),
    sameAs: SOCIAL_LINKS.map((social) => social.href),
    address: {
      "@type": "PostalAddress",
      addressLocality: "Dehradun",
      addressRegion: "Uttarakhand",
      addressCountry: "IN",
    },
  };

  return (
    <html lang="en" className={poppins.variable}>
      <body className="font-sans antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded-lg focus:bg-forest-800 focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-white"
        >
          Skip to content
        </a>
        <TopBar />
        <Navbar regions={regions} logo={logo} />
        <main id="main-content">{children}</main>
        <Footer logo={footerLogo} />
        <FloatingWhatsApp />
      </body>
    </html>
  );
}
