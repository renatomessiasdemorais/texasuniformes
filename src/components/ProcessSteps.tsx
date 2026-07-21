import { Container } from "@/components/ui/Container";
import type { ProcessStep } from "@/types/content";

export function ProcessSteps({ steps }: { steps: ProcessStep[] }) {
  return (
    <section className="bg-white py-20">
      <Container>
        <h2 className="text-center text-2xl font-bold uppercase tracking-wide text-navy sm:text-3xl">
          Como funciona
        </h2>
        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, i) => (
            <div key={step.title} className="relative pl-16 sm:pl-0">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-teal text-lg font-bold text-white sm:mx-auto">
                {i + 1}
              </div>
              <h3 className="font-bold uppercase tracking-wide text-navy sm:text-center">
                {step.title}
              </h3>
              <p className="mt-2 text-sm text-text-dark/80 sm:text-center">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
