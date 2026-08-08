import Image from "next/image";
import Link from "next/link";
import { CalendarDays, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/lib/utils";
import { readingTime } from "@/lib/blog";
import type { BlogPost } from "@/lib/types";

interface BlogCardProps {
  post: BlogPost;
  /** Resolved header image — the client's override if one exists. */
  image: string | null;
  priority?: boolean;
}

/** The single blog card, shared by the listing and the related-posts strip. */
export function BlogCard({ post, image, priority = false }: BlogCardProps) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-neutral-100 bg-white shadow-[0_10px_30px_-20px_rgba(0,0,0,0.25)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_40px_-22px_rgba(0,0,0,0.32)]">
      {image && (
        <Link
          href={`/blog/${post.slug}`}
          className="relative block h-48 overflow-hidden"
          tabIndex={-1}
          aria-hidden="true"
        >
          <Image
            src={image}
            alt={post.title}
            fill
            priority={priority}
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </Link>
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
          <Link
            href={`/blog/${post.slug}`}
            className="transition-colors hover:text-saffron-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-saffron-500"
          >
            {post.title}
          </Link>
        </h2>

        <p className="mt-2 flex-1 text-sm leading-relaxed text-gray-600">
          {post.excerpt}
        </p>

        <p className="mt-4 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-gray-500">
          <CalendarDays aria-hidden="true" className="size-3.5" />
          <time dateTime={post.date}>{formatDate(post.date)}</time>
          <span aria-hidden="true">·</span>
          <span>{post.author}</span>
          <span aria-hidden="true">·</span>
          <Clock aria-hidden="true" className="size-3.5" />
          <span>{readingTime(post)} min read</span>
        </p>
      </div>
    </article>
  );
}
