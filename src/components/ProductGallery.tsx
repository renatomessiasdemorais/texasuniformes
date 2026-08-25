import Image from "next/image";
import type { SanityImage } from "@/types/content";

export function ProductGallery({ images }: { images: SanityImage[] }) {
  if (images.length === 0) return null;

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
      {images.map((image, i) => (
        <div
          key={`${image.src}-${i}`}
          className="relative aspect-[4/5] overflow-hidden rounded-xl bg-light-bg"
        >
          <Image
            src={image.src}
            alt={image.alt}
            fill
            sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
            className="object-cover"
            placeholder={image.blurDataURL ? "blur" : "empty"}
            blurDataURL={image.blurDataURL}
          />
        </div>
      ))}
    </div>
  );
}
