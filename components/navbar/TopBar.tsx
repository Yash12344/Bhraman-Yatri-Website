import { Mail, Phone } from "lucide-react";
import {
  FacebookIcon,
  InstagramIcon,
  YoutubeIcon,
} from "@/components/shared/SocialIcons";
import { SITE, SOCIAL_LINKS } from "@/lib/data";

const socialIcons = {
  instagram: InstagramIcon,
  facebook: FacebookIcon,
  youtube: YoutubeIcon,
} as const;

export function TopBar() {
  return (
    <div className="bg-forest-800 text-white">
      <div className="mx-auto flex h-10 max-w-7xl items-center justify-between px-4 text-xs sm:px-6 lg:px-8">
        <div className="flex items-center gap-5">
          <a
            href={`mailto:${SITE.email}`}
            className="flex items-center gap-1.5 transition-colors hover:text-saffron-300"
          >
            <Mail aria-hidden="true" className="size-3.5" />
            <span>{SITE.email}</span>
          </a>
          <a
            href={SITE.phoneHref}
            className="hidden items-center gap-1.5 transition-colors hover:text-saffron-300 sm:flex"
          >
            <Phone aria-hidden="true" className="size-3.5" />
            <span>{SITE.phone}</span>
          </a>
        </div>
        <div className="flex items-center gap-3">
          <span className="hidden sm:inline">Follow us:</span>
          {SOCIAL_LINKS.map((social) => {
            const Icon = socialIcons[social.id as keyof typeof socialIcons];
            return (
              <a
                key={social.id}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Follow Bhraman Yatri on ${social.label}`}
                className="transition-colors hover:text-saffron-300"
              >
                <Icon aria-hidden="true" className="size-3.5" />
              </a>
            );
          })}
        </div>
      </div>
    </div>
  );
}
