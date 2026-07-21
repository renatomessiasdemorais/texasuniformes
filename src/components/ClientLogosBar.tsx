import Image from "next/image";
import { Container } from "@/components/ui/Container";
import type { ClientLogo } from "@/types/content";

export function ClientLogosBar({ logos }: { logos: ClientLogo[] }) {
  return (
    <section className="bg-white py-16">
      <Container>
        <h2 className="text-center text-sm font-semibold uppercase tracking-widest text-text-dark/60">
          Empresas que confiam na Texas Uniformes
        </h2>
        <div className="mt-10 grid grid-cols-2 items-center gap-8 sm:grid-cols-3 lg:grid-cols-6">
          {logos.map((logo) => (
            <div key={logo._id} className="flex items-center justify-center grayscale transition hover:grayscale-0">
              <Image
                src={logo.logo.src}
                alt={logo.logo.alt}
                width={150}
                height={75}
                className="h-auto w-full max-w-[150px] object-contain"
              />
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
