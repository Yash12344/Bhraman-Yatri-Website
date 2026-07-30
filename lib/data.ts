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
  SeasonSection,
  SelectOption,
  SocialLink,
  Trek,
} from "@/lib/types";

export const SITE = {
  name: "Bhraman Yatri",
  tagline: "Explore Beyond Limitts",
  email: "info@bhramanyatri.com",
  phone: "+91 98765 43210",
  phoneHref: "tel:+919876543210",
  whatsappHref: "https://wa.me/919876543210",
  address: "Dehradun, Uttarakhand, India - 248001",
  description:
    "Bhraman Yatri is a travel community for explorers and adventure seekers. We organize treks and tours across the Himalayas.",
  copyright: "© 2024 Bhraman Yatri. All Rights Reserved.",
};

export const TREKS: Trek[] = [
  {
    id: "hampta-pass",
    name: "Hampta Pass Trek",
    days: 5,
    difficulty: "Moderate",
    price: 5499,
    image: "/images/trek-hampta-pass.jpg",
    imageAlt: "Trekkers walking through the snow-covered Hampta Pass valley",
    badge: "Bestseller",
    popular: true,
  },
  {
    id: "kedarkantha",
    name: "Kedarkantha Trek",
    days: 6,
    difficulty: "Moderate",
    price: 5999,
    image: "/images/trek-kedarkantha.jpg",
    imageAlt: "Snow-laden pine forest and campsites on the Kedarkantha trail",
    popular: true,
  },
  {
    id: "valley-of-flowers",
    name: "Valley of Flowers Trek",
    days: 6,
    difficulty: "Easy",
    price: 6499,
    image: "/images/trek-valley-of-flowers.jpg",
    imageAlt: "Blooming alpine meadows in the Valley of Flowers national park",
    popular: true,
  },
  {
    id: "kuari-pass",
    name: "Kuari Pass Trek",
    days: 6,
    difficulty: "Moderate",
    price: 5999,
    image: "/images/trek-kuari-pass.jpg",
    imageAlt: "A lone trekker facing the snowy peaks of Kuari Pass",
    popular: true,
  },
  {
    id: "chopta-tungnath",
    name: "Chopta Tungnath Trek",
    days: 4,
    difficulty: "Easy",
    price: 4499,
    image: "/images/trek-chopta-tungnath.jpg",
    imageAlt: "The ancient Tungnath temple against Himalayan peaks at Chopta",
    popular: true,
  },
  {
    id: "brahmatal",
    name: "Brahmatal Trek",
    days: 6,
    difficulty: "Moderate",
    price: 5750,
    image: "/images/trek-brahmatal.jpg",
    imageAlt: "Frozen Brahmatal lake surrounded by snow-covered ridges",
    popular: true,
  },
  {
    id: "dayara-bugyal",
    name: "Dayara Bugyal Trek",
    days: 4,
    difficulty: "Easy",
    price: 4999,
    image: "/images/trek-dayara-bugyal.jpg",
    imageAlt: "Rolling high-altitude meadows of Dayara Bugyal",
  },
  {
    id: "bhrigu-lake",
    name: "Bhrigu Lake Trek",
    days: 4,
    difficulty: "Moderate",
    price: 6999,
    image: "/images/trek-bhrigu-lake.jpg",
    imageAlt: "The glacial Bhrigu lake nestled between grassy ridgelines",
  },
  {
    id: "sar-pass",
    name: "Sar Pass Trek",
    days: 6,
    difficulty: "Moderate",
    price: 7499,
    image: "/images/trek-sar-pass.jpg",
    imageAlt: "Snow fields leading up to the Sar Pass crossing",
  },
  {
    id: "har-ki-dun",
    name: "Har Ki Dun Trek",
    days: 6,
    difficulty: "Moderate",
    price: 8999,
    image: "/images/trek-har-ki-dun.jpg",
    imageAlt: "The cradle-shaped Har Ki Dun valley in golden light",
    popular: true,
  },
];

export const POPULAR_TREKS: Trek[] = TREKS.filter((trek) => trek.popular);

export function getTrekById(id: string): Trek {
  const trek = TREKS.find((item) => item.id === id);
  if (!trek) throw new Error(`Unknown trek id: ${id}`);
  return trek;
}

export const HERO_SLIDES: HeroSlide[] = [
  {
    id: "explore-beyond-limits",
    image: "/images/hero-himalayan-trekker.jpg",
    imageAlt:
      "A trekker with an orange jacket and backpack facing snow-covered Himalayan peaks",
    titleTop: "Explore",
    titleHighlight: "Beyond Limits",
    subtitle: "Discover India's Most Beautiful Treks with Bhraman Yatri.",
  },
  {
    id: "walk-the-himalayas",
    image: "/images/hero-snow-peaks-sunrise.jpg",
    imageAlt: "Golden sunrise over a chain of snow-covered Himalayan summits",
    titleTop: "Walk The",
    titleHighlight: "Himalayas",
    subtitle: "Handcrafted trekking experiences led by certified local guides.",
  },
  {
    id: "adventure-awaits",
    image: "/images/hero-alpine-valley.jpg",
    imageAlt: "A lush alpine valley beneath mist-covered mountain ridges",
    titleTop: "Adventure",
    titleHighlight: "Awaits You",
    subtitle: "Small groups, big memories — trek safely with Bhraman Yatri.",
  },
];

export const NAV_LINKS: NavLink[] = [
  { label: "Home", href: "#home" },
  { label: "About Us", href: "#why-choose-us" },
  {
    label: "All Treks",
    href: "#popular-treks",
    children: [
      { label: "Hampta Pass Trek", href: "#popular-treks" },
      { label: "Kedarkantha Trek", href: "#popular-treks" },
      { label: "Valley of Flowers Trek", href: "#popular-treks" },
      { label: "Kuari Pass Trek", href: "#popular-treks" },
      { label: "Chopta Tungnath Trek", href: "#popular-treks" },
    ],
  },
  { label: "Contact Us", href: "#enquiry" },
];

export const SEASONS: SeasonSection[] = [
  {
    id: "winter",
    title: "Winter Treks",
    viewAllLabel: "View All Winter Treks",
    viewAllHref: "#popular-treks",
    trekIds: [
      "kedarkantha",
      "dayara-bugyal",
      "brahmatal",
      "chopta-tungnath",
      "kuari-pass",
    ],
  },
  {
    id: "summer",
    title: "Summer Treks",
    viewAllLabel: "View All Summer Treks",
    viewAllHref: "#popular-treks",
    trekIds: [
      "hampta-pass",
      "bhrigu-lake",
      "valley-of-flowers",
      "sar-pass",
      "bhrigu-lake",
      "har-ki-dun",
    ],
  },
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
  { label: "Home", href: "#home" },
  { label: "About Us", href: "#why-choose-us" },
  { label: "All Treks", href: "#popular-treks" },
  { label: "Gallery", href: "#home" },
  { label: "Blog", href: "#home" },
  { label: "Contact Us", href: "#enquiry" },
];

export const FOOTER_TREK_LINKS: FooterLink[] = [
  { label: "Hampta Pass Trek", href: "#popular-treks" },
  { label: "Kedarkantha Trek", href: "#popular-treks" },
  { label: "Valley of Flowers Trek", href: "#popular-treks" },
  { label: "Kuari Pass Trek", href: "#popular-treks" },
  { label: "Chopta Tungnath Trek", href: "#popular-treks" },
];

export const LEGAL_LINKS: FooterLink[] = [
  { label: "Privacy Policy", href: "#home" },
  { label: "Terms & Conditions", href: "#home" },
];

export const SOCIAL_LINKS: SocialLink[] = [
  { id: "instagram", label: "Instagram", href: "https://instagram.com" },
  { id: "facebook", label: "Facebook", href: "https://facebook.com" },
  { id: "youtube", label: "YouTube", href: "https://youtube.com" },
];

export const MONTH_OPTIONS: SelectOption[] = [
  { label: "Any Month", value: "any" },
  { label: "January", value: "january" },
  { label: "February", value: "february" },
  { label: "March", value: "march" },
  { label: "April", value: "april" },
  { label: "May", value: "may" },
  { label: "June", value: "june" },
  { label: "July", value: "july" },
  { label: "August", value: "august" },
  { label: "September", value: "september" },
  { label: "October", value: "october" },
  { label: "November", value: "november" },
  { label: "December", value: "december" },
];

export const DIFFICULTY_OPTIONS: SelectOption[] = [
  { label: "Any Level", value: "any" },
  { label: "Easy", value: "easy" },
  { label: "Moderate", value: "moderate" },
  { label: "Difficult", value: "difficult" },
];
