import type { Metadata } from "next";
import { Container } from "@/components/shared/Container";
import { PageHero } from "@/components/shared/PageHero";
import { BlogCard } from "@/components/blog/BlogCard";
import { getBlogPosts } from "@/lib/blog";
import { blogImage } from "@/lib/gallery";
import { HERO_SLIDES, SITE } from "@/lib/data";

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
  const posts = getBlogPosts();

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
          <ul className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post, index) => (
              <li key={post.slug}>
                <BlogCard
                  post={post}
                  image={blogImage(post.slug, post.image)}
                  priority={index < 3}
                />
              </li>
            ))}
          </ul>
        </Container>
      </section>
    </>
  );
}
