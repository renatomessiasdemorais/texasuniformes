import { Container } from "@/components/ui/Container";
import { getIcon } from "@/lib/icon-map";
import type { Benefit } from "@/types/content";

export function BenefitsBar({
  benefits,
  className = "",
}: {
  benefits: Benefit[];
  className?: string;
}) {
  return (
    <section className={`bg-light-bg py-16 ${className}`}>
      <Container className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {benefits.map((benefit) => {
          const Icon = getIcon(benefit.icon);
          return (
            <div key={benefit.title} className="text-center sm:text-left">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-navy text-teal sm:mx-0">
                <Icon size={28} />
              </div>
              <h3 className="mt-4 font-bold uppercase tracking-wide text-navy">
                {benefit.title}
              </h3>
              <p className="mt-2 text-sm text-text-dark/80">
                {benefit.description}
              </p>
            </div>
          );
        })}
      </Container>
    </section>
  );
}
