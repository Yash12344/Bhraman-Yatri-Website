import { Mail, Phone } from "lucide-react";
import { Container } from "@/components/shared/Container";
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
      <Container className="flex h-[42px] items-center justify-between text-xs">
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
                <Icon className="size-3.5" />
              </a>
            );
          })}
        </div>
      </Container>
    </div>
  );
}
