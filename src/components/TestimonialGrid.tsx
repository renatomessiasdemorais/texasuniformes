import Image from "next/image";
import { Quote } from "lucide-react";
import type { Testimonial } from "@/types/content";

export function TestimonialGrid({
  testimonials,
}: {
  testimonials: Testimonial[];
}) {
  if (testimonials.length === 0) return null;

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {testimonials.map((t) => (
        <div key={t._id} className="rounded-xl bg-light-bg p-6">
          <Quote className="text-teal" size={24} />
          <p className="mt-4 text-sm text-text-dark/85">&ldquo;{t.quote}&rdquo;</p>
          <div className="mt-5 flex items-center gap-3">
            {t.avatar && (
              <Image
                src={t.avatar.src}
                alt={t.avatar.alt}
                width={40}
                height={40}
                className="rounded-full"
              />
            )}
            <div>
              <p className="text-sm font-semibold text-navy">{t.name}</p>
              <p className="text-xs text-text-dark/60">{t.company}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
