import type { Metadata } from "next";
import Link from "next/link";
import { BenefitsBar } from "@/components/BenefitsBar";
import { PageHeader } from "@/components/PageHeader";
import { Container } from "@/components/ui/Container";
import { fallbackBenefits } from "@/lib/content";
import { segmentNavLinks } from "@/lib/nav-links";

export const metadata: Metadata = {
  title: "Empresa",
  description:
    "Conheça a Texas Uniformes: fabricação própria de uniformes profissionais desde 1995 em Ananindeua/PA.",
};

export default function EmpresaPage() {
  return (
    <>
      <PageHeader
        title="Empresa"
        subtitle="Fabricação própria de uniformes profissionais desde 1995."
      />

      <section className="bg-white py-16">
        <Container className="max-w-3xl space-y-5 text-text-dark/85">
          <h2 className="text-2xl font-bold uppercase tracking-wide text-navy">
            Nossa história
          </h2>
          <p>
            A Texas Uniformes atua desde 1995 em Ananindeua, no Pará,
            fabricando uniformes profissionais sob encomenda para empresas,
            hospitais, escolas e hotelaria. Ao longo desses anos, construímos
            uma estrutura de fabricação própria que nos permite acompanhar de
            perto cada etapa da produção — do corte e costura ao bordado e à
            estamparia personalizados.
          </p>
          <p>
            Diferente de um modelo de prateleira, trabalhamos sempre sob
            encomenda: entendemos a necessidade de cada cliente, alinhamos
            modelo, tecido e personalização antes de iniciar a produção, e
            entregamos um uniforme que representa a identidade da empresa,
            instituição ou estabelecimento que atendemos.
          </p>
        </Container>
      </section>

      <BenefitsBar benefits={fallbackBenefits} />

      <section className="bg-white py-16">
        <Container>
          <h2 className="mb-8 text-center text-2xl font-bold uppercase tracking-wide text-navy sm:text-3xl">
            Linhas de produto
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {segmentNavLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-xl border border-black/10 p-6 text-center font-semibold uppercase tracking-wide text-navy transition-colors hover:border-teal hover:text-teal"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
