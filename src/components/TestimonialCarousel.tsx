"use client";

import Image from "next/image";
import { useState } from "react";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { Container } from "@/components/ui/Container";
import type { Testimonial } from "@/types/content";

export function TestimonialCarousel({
  testimonials,
}: {
  testimonials: Testimonial[];
}) {
  const [index, setIndex] = useState(0);

  if (testimonials.length === 0) return null;

  const current = testimonials[index];
  const go = (delta: number) =>
    setIndex((i) => (i + delta + testimonials.length) % testimonials.length);

  return (
    <section className="bg-navy-secondary py-20 text-white">
      <Container className="max-w-3xl text-center">
        <Quote className="mx-auto text-teal" size={36} />
        <p className="mt-6 text-lg italic text-white/90">
          &ldquo;{current.quote}&rdquo;
        </p>

        <div className="mt-6 flex items-center justify-center gap-3">
          {current.avatar && (
            <Image
              src={current.avatar.src}
              alt={current.avatar.alt}
              width={48}
              height={48}
              className="rounded-full"
            />
          )}
          <div className="text-left">
            <p className="font-semibold">{current.name}</p>
            <p className="text-sm text-white/60">{current.company}</p>
          </div>
        </div>

        {testimonials.length > 1 && (
          <div className="mt-8 flex items-center justify-center gap-6">
            <button
              onClick={() => go(-1)}
              aria-label="Depoimento anterior"
              className="rounded-full border border-white/20 p-2 hover:bg-white/10"
            >
              <ChevronLeft size={20} />
            </button>
            <div className="flex gap-2">
              {testimonials.map((t, i) => (
                <button
                  key={t._id}
                  onClick={() => setIndex(i)}
                  aria-label={`Ir para depoimento ${i + 1}`}
                  className={`h-2 w-2 rounded-full ${
                    i === index ? "bg-teal" : "bg-white/30"
                  }`}
                />
              ))}
            </div>
            <button
              onClick={() => go(1)}
              aria-label="Próximo depoimento"
              className="rounded-full border border-white/20 p-2 hover:bg-white/10"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        )}
      </Container>
    </section>
  );
}
