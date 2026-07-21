import { Container } from "@/components/ui/Container";

export function PageHeader({
  title,
  subtitle,
}: {
  title: string;
  subtitle?: string;
}) {
  return (
    <section className="bg-navy py-16 text-white">
      <Container>
        <h1 className="text-3xl font-bold uppercase tracking-wide sm:text-4xl">
          {title}
        </h1>
        {subtitle && <p className="mt-3 max-w-2xl text-white/80">{subtitle}</p>}
      </Container>
    </section>
  );
}
