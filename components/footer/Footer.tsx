import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import { Logo } from "@/components/shared/Logo";
import { WhatsAppIcon } from "@/components/shared/WhatsAppIcon";
import {
  FacebookIcon,
  InstagramIcon,
  YoutubeIcon,
} from "@/components/shared/SocialIcons";
import { LEGAL_LINKS, QUICK_LINKS, SITE, SOCIAL_LINKS } from "@/lib/data";
import { TREKS } from "@/lib/treks";
import type { LogoAsset } from "@/lib/branding";

const socialIcons = {
  instagram: InstagramIcon,
  facebook: FacebookIcon,
  youtube: YoutubeIcon,
} as const;

function FooterHeading({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-white">
      {children}
    </h3>
  );
}

interface FooterProps {
  /** Uploaded logo, resolved on disk in the server layout. */
  logo?: LogoAsset | null;
}

export function Footer({ logo = null }: FooterProps) {
  return (
    <footer className="bg-forest-800 text-white/80">
      <div className="mx-auto grid max-w-7xl gap-x-8 gap-y-10 px-4 pb-6 pt-10 sm:grid-cols-2 sm:px-6 lg:grid-cols-[1.5fr_1fr_1.2fr_1.3fr] lg:px-8 xl:px-4">
        {/* Brand */}
        <div>
          <Logo variant="light" size="sm" logo={logo} />
          <p className="mt-4 max-w-xs text-sm leading-relaxed">
            {SITE.description}
          </p>
          <ul className="mt-5 flex items-center gap-3">
            {SOCIAL_LINKS.map((social) => {
              const Icon = socialIcons[social.id as keyof typeof socialIcons];
              return (
                <li key={social.id}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Follow ${SITE.name} on ${social.label}`}
                    className="flex size-9 items-center justify-center rounded-full border border-white/20 transition-colors hover:border-saffron-500 hover:bg-saffron-500 hover:text-white"
                  >
                    <Icon aria-hidden="true" className="size-4" />
                  </a>
                </li>
              );
            })}
            <li>
              <a
                href={SITE.whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Chat with ${SITE.name} on WhatsApp`}
                className="flex size-9 items-center justify-center rounded-full border border-white/20 transition-colors hover:border-saffron-500 hover:bg-saffron-500 hover:text-white"
              >
                <WhatsAppIcon className="size-4" />
              </a>
            </li>
          </ul>
        </div>

        <nav aria-label="Quick links">
          <FooterHeading>Quick Links</FooterHeading>
          <ul className="space-y-2.5 text-sm">
            {QUICK_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="transition-colors hover:text-saffron-400"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Popular treks">
          <FooterHeading>Popular Treks</FooterHeading>
          <ul className="space-y-2.5 text-sm">
            {TREKS.slice(0, 6).map((trek) => (
              <li key={trek.slug}>
                <Link
                  href={`/treks/${trek.slug}`}
                  className="transition-colors hover:text-saffron-400"
                >
                  {trek.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <FooterHeading>Contact Us</FooterHeading>
          <ul className="space-y-3.5 text-sm">
            <li className="flex items-start gap-2.5">
              <MapPin aria-hidden="true" className="mt-0.5 size-4 shrink-0" />
              <span>{SITE.address}</span>
            </li>
            <li>
              <a
                href={SITE.phoneHref}
                className="flex items-center gap-2.5 transition-colors hover:text-saffron-400"
              >
                <Phone aria-hidden="true" className="size-4 shrink-0" />
                <span>{SITE.phone}</span>
              </a>
            </li>
            <li>
              <a
                href={`mailto:${SITE.email}`}
                className="flex items-center gap-2.5 transition-colors hover:text-saffron-400"
              >
                <Mail aria-hidden="true" className="size-4 shrink-0" />
                <span>{SITE.email}</span>
              </a>
            </li>
          </ul>

          <a
            href={SITE.whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 inline-flex items-center gap-2 rounded-lg bg-whatsapp px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#1eb455] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-whatsapp focus-visible:ring-offset-2 focus-visible:ring-offset-forest-800"
          >
            <WhatsAppIcon className="size-4" />
            Chat On WhatsApp
          </a>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-4 py-3 text-xs text-white/60 sm:px-6 md:min-h-[42px] md:flex-row lg:px-8 xl:px-4">
          <p>{SITE.copyright}</p>
          <ul className="flex items-center gap-3">
            {LEGAL_LINKS.map((link, index) => (
              <li key={link.label} className="flex items-center gap-3">
                {index > 0 && (
                  <span aria-hidden="true" className="text-white/30">
                    |
                  </span>
                )}
                <Link
                  href={link.href}
                  className="transition-colors hover:text-saffron-400"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
