/**
 * Site-level configuration: branding, navigation, features and footer links.
 *
 * Trek content is NOT here — it comes from `data/treks/*.json` via
 * `lib/treks.ts`, which is the single source of truth for treks.
 */
import {
  BadgeIndianRupee,
  Headset,
  ShieldCheck,
  UserRoundCheck,
  Users,
} from "lucide-react";
import type {
  Feature,
  FooterLink,
  HeroSlide,
  NavLink,
  SelectOption,
  SocialLink,
  Testimonial,
} from "@/lib/types";
import testimonialsData from "@/data/testimonials.json";

export const SITE = {
  name: "Bhraman Yatri",
  tagline: "Explore Beyond Limits",
  url: "https://bhramanyatri.com",
  email: "info@bhramanyatri.com",
  phone: "+91 92587 18441",
  phoneHref: "tel:+919258718441",
  whatsappHref: "https://wa.me/919258718441",
  address: "Dehradun, Uttarakhand, India - 248001",
  description:
    "Bhraman Yatri is a travel community for explorers and adventure seekers. We organize treks and tours across the Himalayas.",
  copyright: "© 2024 Bhraman Yatri. All Rights Reserved.",
};

export const HERO_SLIDES: HeroSlide[] = [
  {
    id: "explore-beyond-limits",
    image: "/site-images/hero/slide-1-explore-beyond-limits.jpg",
    imageAlt:
      "A trekker with an orange jacket and backpack facing snow-covered Himalayan peaks",
    titleTop: "Explore",
    titleHighlight: "Beyond Limits",
    subtitle: "Discover India's Most Beautiful Treks with Bhraman Yatri.",
  },
  {
    id: "walk-the-himalayas",
    image: "/site-images/hero/slide-2-walk-the-himalayas.jpg",
    imageAlt: "Golden sunrise over a chain of snow-covered Himalayan summits",
    titleTop: "Walk The",
    titleHighlight: "Himalayas",
    subtitle: "Handcrafted trekking experiences led by certified local guides.",
  },
  {
    id: "adventure-awaits",
    image: "/site-images/hero/slide-3-adventure-awaits-you.jpg",
    imageAlt: "A lush alpine valley beneath mist-covered mountain ridges",
    titleTop: "Adventure",
    titleHighlight: "Awaits You",
    subtitle: "Small groups, big memories — trek safely with Bhraman Yatri.",
  },
];

export const NAV_LINKS: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "All Treks", href: "/treks" },
  { label: "Gallery", href: "/gallery" },
  { label: "Blog", href: "/blog" },
  { label: "Contact Us", href: "/contact" },
];

export const FEATURES: Feature[] = [
  {
    id: "safety-first",
    icon: ShieldCheck,
    title: "Safety First",
    description: "Your safety is our top priority",
  },
  {
    id: "expert-guides",
    icon: UserRoundCheck,
    title: "Expert Guides",
    description: "Experienced & certified trek leaders",
  },
  {
    id: "best-price",
    icon: BadgeIndianRupee,
    title: "Best Price",
    description: "Best services at affordable prices",
  },
  {
    id: "small-groups",
    icon: Users,
    title: "Small Groups",
    description: "Small batch size for better experience",
  },
  {
    id: "support",
    icon: Headset,
    title: "24×7 Support",
    description: "We are always here to help you",
  },
];

export const QUICK_LINKS: FooterLink[] = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "All Treks", href: "/treks" },
  { label: "Gallery", href: "/gallery" },
  { label: "Blog", href: "/blog" },
  { label: "Contact Us", href: "/contact" },
];

export const LEGAL_LINKS: FooterLink[] = [
  { label: "Privacy Policy", href: "/contact" },
  { label: "Terms & Conditions", href: "/contact" },
];

/**
 * The operator's real profiles. Tracking parameters that came from the shared
 * links (`utm_source=qr`, `mibextid`, `si`) are stripped — they identify where
 * a one-off share came from and mean nothing on a permanent site link.
 */
export const SOCIAL_LINKS: SocialLink[] = [
  {
    id: "instagram",
    label: "Instagram",
    href: "https://www.instagram.com/bhramanyatri",
  },
  {
    id: "facebook",
    label: "Facebook",
    href: "https://www.facebook.com/share/1J84ZmC9Ah/",
  },
  {
    id: "youtube",
    label: "YouTube",
    href: "https://www.youtube.com/@bhramanyatri",
  },
];

export const MONTH_OPTIONS: SelectOption[] = [
  { label: "Any Month", value: "any" },
  { label: "January", value: "1" },
  { label: "February", value: "2" },
  { label: "March", value: "3" },
  { label: "April", value: "4" },
  { label: "May", value: "5" },
  { label: "June", value: "6" },
  { label: "July", value: "7" },
  { label: "August", value: "8" },
  { label: "September", value: "9" },
  { label: "October", value: "10" },
  { label: "November", value: "11" },
  { label: "December", value: "12" },
];

/**
 * Customer reviews. Ships empty on purpose — testimonials must be real, so the
 * homepage section stays hidden until the operator adds entries here.
 */
export const TESTIMONIALS = testimonialsData as Testimonial[];
