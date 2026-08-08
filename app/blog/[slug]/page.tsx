import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CalendarDays, Clock, PenLine } from "lucide-react";
import { Container } from "@/components/shared/Container";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import { BlogBody } from "@/components/blog/BlogBody";
import { BlogCard } from "@/components/blog/BlogCard";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  getBlogPost,
  getBlogSlugs,
  getRelatedPosts,
  readingTime,
} from "@/lib/blog";
import { blogImage } from "@/lib/gallery";
import { formatDate } from "@/lib/utils";
import { HERO_SLIDES, SITE } from "@/lib/data";

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

/** One static page per post in data/blog/posts.json. */
export function generateStaticParams() {
  return getBlogSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) return { title: "Article not found" };

  const image = blogImage(post.slug, post.image) ?? HERO_SLIDES[1].image;
  const url = `${SITE.url}/blog/${post.slug}`;

  return {
    title: post.title,
    description: post.excerpt,
    keywords: post.tags,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      title: `${post.title} | ${SITE.name}`,
      description: post.excerpt,
      url,
      images: [image],
      publishedTime: post.date,
      authors: [post.author],
      tags: post.tags,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: [image],
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) notFound();

  const headerImage = blogImage(post.slug, post.image);
  const related = getRelatedPosts(post.slug);
  const url = `${SITE.url}/blog/${post.slug}`;

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    author: { "@type": "Organization", name: post.author },
    publisher: { "@type": "Organization", name: SITE.name },
    mainEntityOfPage: url,
    ...(headerImage ? { image: [`${SITE.url}${headerImage}`] } : {}),
    keywords: post.tags.join(", "),
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE.url },
      {
        "@type": "ListItem",
        position: 2,
        name: "Blog",
        item: `${SITE.url}/blog`,
      },
      { "@type": "ListItem", position: 3, name: post.title, item: url },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      {/* Article titles run long and read as sentences, so this header uses
          normal case and grows with the text — unlike the uppercase, fixed
          height PageHero used on the section landing pages. */}
      <header className="relative isolate overflow-hidden bg-forest-900 py-14 md:py-20">
        {headerImage && (
          <>
            <Image
              src={headerImage}
              alt=""
              aria-hidden="true"
              fill
              priority
              sizes="100vw"
              className="-z-10 object-cover"
            />
            <div
              aria-hidden="true"
              className="absolute inset-0 -z-10 bg-gradient-to-r from-black/80 via-black/60 to-black/35"
            />
          </>
        )}

        <Container>
          <div className="max-w-3xl">
            <Breadcrumbs
              tone="light"
              className="mb-4"
              items={[
                { label: "Home", href: "/" },
                { label: "Blog", href: "/blog" },
                { label: post.title },
              ]}
            />
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <Badge key={tag} variant="saffron">
                  {tag}
                </Badge>
              ))}
            </div>
            <h1 className="mt-4 text-3xl font-extrabold leading-tight tracking-tight text-white md:text-4xl">
              {post.title}
            </h1>
            <p className="mt-4 text-sm leading-relaxed text-white/85 md:text-base">
              {post.excerpt}
            </p>
            <p className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-white/75">
              <span className="flex items-center gap-1.5">
                <CalendarDays aria-hidden="true" className="size-3.5" />
                <time dateTime={post.date}>{formatDate(post.date)}</time>
              </span>
              <span className="flex items-center gap-1.5">
                <PenLine aria-hidden="true" className="size-3.5" />
                {post.author}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock aria-hidden="true" className="size-3.5" />
                {readingTime(post)} min read
              </span>
            </p>
          </div>
        </Container>
      </header>

      <article className="py-12">
        <Container>
          <div className="mx-auto max-w-3xl">
            <BlogBody blocks={post.body} />

            <div className="mt-10 flex flex-wrap gap-3 border-t border-neutral-200 pt-8">
              <Link href="/treks">
                <Button variant="primary" size="md" tabIndex={-1}>
                  Browse all treks
                </Button>
              </Link>
              <Link href="/blog">
                <Button variant="ghost" size="md" tabIndex={-1}>
                  Back to blog
                </Button>
              </Link>
            </div>
          </div>
        </Container>
      </article>

      {related.length > 0 && (
        <section className="bg-neutral-50 py-12">
          <Container>
            <h2 className="text-xl font-bold text-gray-900">Keep reading</h2>
            <ul className="mt-6 grid gap-8 md:grid-cols-2">
              {related.map((item) => (
                <li key={item.slug}>
                  <BlogCard
                    post={item}
                    image={blogImage(item.slug, item.image)}
                  />
                </li>
              ))}
            </ul>
          </Container>
        </section>
      )}
    </>
  );
}
