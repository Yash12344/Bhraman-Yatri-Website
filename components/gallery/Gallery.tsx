import Image from "next/image";
import { cn } from "@/lib/utils";
import type { GalleryImage } from "@/lib/gallery";


interface GalleryProps {
  images: GalleryImage[];
  /** Tighter grid for in-page galleries, roomier for the gallery route. */
  columns?: 3 | 4;
  className?: string;
}

/** Responsive masonry-style photo grid, shared by the gallery page and trek pages. */
export function Gallery({ images, columns = 3, className }: GalleryProps) {
  if (images.length === 0) return null;

  return (
    <ul
      className={cn(
        "grid gap-4 sm:grid-cols-2",
        columns === 3 ? "lg:grid-cols-3" : "lg:grid-cols-4",
        className
      )}
    >
      {images.map((image, index) => (
        <li
          key={`${image.src}-${index}`}
          className="group relative aspect-4/3 overflow-hidden rounded-2xl bg-neutral-100"
        >
          <Image
            src={image.src}
            alt={image.alt}
            fill
            loading="lazy"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </li>
      ))}
    </ul>
  );
}
