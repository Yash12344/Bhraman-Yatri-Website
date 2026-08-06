import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { CalendarDays, PenLine } from "lucide-react";
import { Container } from "@/components/shared/Container";
import { PageHero } from "@/components/shared/PageHero";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BLOG_POSTS, HERO_SLIDES, SITE } from "@/lib/data";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Trail notes, packing guides and season advice from the Bhraman Yatri team.",
  alternates: { canonical: `${SITE.url}/blog` },
  openGraph: {
    title: `Blog | ${SITE.name}`,
    description: "Trail notes, packing guides and season advice.",
    url: `${SITE.url}/blog`,
    images: [HERO_SLIDES[1].image],
  },
};

export default function BlogPage() {
  return (
    <>
      <PageHero
        title="Blog"
        subtitle="Trail notes, packing guides and season advice from our team."
        image={HERO_SLIDES[1].image}
        imageAlt={HERO_SLIDES[1].imageAlt}
        crumbs={[{ label: "Home", href: "/" }, { label: "Blog" }]}
      />

      <section className="py-12">
        <Container>
          {BLOG_POSTS.length > 0 ? (
            <ul className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {BLOG_POSTS.map((post) => (
                <li key={post.slug}>
                  <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-neutral-100 bg-white shadow-[0_10px_30px_-20px_rgba(0,0,0,0.25)] transition-shadow hover:shadow-[0_18px_40px_-22px_rgba(0,0,0,0.32)]">
                    {post.image && (
                      <div className="relative h-48 overflow-hidden">
                        <Image
                          src={post.image}
                          alt={post.title}
                          fill
                          sizes="(max-width: 768px) 100vw, 33vw"
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      </div>
                    )}
                    <div className="flex flex-1 flex-col p-5">
                      <div className="flex flex-wrap gap-2">
                        {post.tags.map((tag) => (
                          <Badge key={tag} variant="saffron">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      <h2 className="mt-3 text-base font-semibold text-gray-900">
                        {post.title}
                      </h2>
                      <p className="mt-2 flex-1 text-sm leading-relaxed text-gray-600">
                        {post.excerpt}
                      </p>
                      <p className="mt-4 flex items-center gap-2 text-xs text-gray-500">
                        <CalendarDays aria-hidden="true" className="size-3.5" />
                        <time dateTime={post.date}>
                          {new Date(post.date).toLocaleDateString("en-IN", {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                          })}
                        </time>
                        <span aria-hidden="true">·</span>
                        <span>{post.author}</span>
                      </p>
                    </div>
                  </article>
                </li>
              ))}
            </ul>
          ) : (
            <div className="mx-auto max-w-lg rounded-2xl border border-dashed border-neutral-300 bg-neutral-50 px-6 py-16 text-center">
              <PenLine
                aria-hidden="true"
                className="mx-auto size-10 text-neutral-400"
              />
              <h2 className="mt-4 text-lg font-semibold text-gray-900">
                Stories coming soon
              </h2>
              <p className="mt-2 text-sm text-gray-500">
                We&apos;re writing up trail notes and packing guides from our recent
                expeditions. In the meantime, browse the treks themselves.
              </p>
              <Link href="/treks" className="mt-6 inline-block">
                <Button variant="primary" size="md" tabIndex={-1}>
                  Explore Treks
                </Button>
              </Link>
            </div>
          )}
        </Container>
      </section>
    </>
  );
}
