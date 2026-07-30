import type { LucideIcon } from "lucide-react";

export type Difficulty = "Easy" | "Moderate" | "Difficult";

export interface Trek {
  id: string;
  name: string;
  days: number;
  difficulty: Difficulty;
  price: number;
  image: string;
  imageAlt: string;
  badge?: string;
  popular?: boolean;
}

export interface HeroSlide {
  id: string;
  image: string;
  imageAlt: string;
  titleTop: string;
  titleHighlight: string;
  subtitle: string;
}

export interface NavLink {
  label: string;
  href: string;
  children?: { label: string; href: string }[];
}

export interface Feature {
  id: string;
  icon: LucideIcon;
  title: string;
  description: string;
}

export interface SeasonSection {
  id: "winter" | "summer";
  title: string;
  viewAllLabel: string;
  viewAllHref: string;
  trekIds: string[];
}

export interface FooterLink {
  label: string;
  href: string;
}

export interface SocialLink {
  id: string;
  label: string;
  href: string;
}

export interface SelectOption {
  label: string;
  value: string;
}
