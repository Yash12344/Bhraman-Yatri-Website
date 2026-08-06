import Image from "next/image";
import { Container } from "@/components/shared/Container";
import { Breadcrumbs, type Crumb } from "@/components/shared/Breadcrumbs";

interface PageHeroProps {
  title: string;
  subtitle?: string;
  image: string;
  imageAlt: string;
  crumbs: Crumb[];
}

/** Compact banner used at the top of every inner page. */
export function PageHero({
  title,
  subtitle,
  image,
  imageAlt,
  crumbs,
}: PageHeroProps) {
  return (
    <section className="relative h-[260px] md:h-[320px]">
      <Image
        src={image}
        alt={imageAlt}
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/45 to-black/20"
      />
      <div className="absolute inset-0 flex items-center">
        <Container>
          <Breadcrumbs items={crumbs} tone="light" className="mb-3" />
          <h1 className="max-w-3xl text-3xl font-extrabold uppercase leading-tight tracking-tight text-white md:text-5xl">
            {title}
          </h1>
          {subtitle && (
            <p className="mt-3 max-w-xl text-sm text-white/90 md:text-base">
              {subtitle}
            </p>
          )}
        </Container>
      </div>
    </section>
  );
}
