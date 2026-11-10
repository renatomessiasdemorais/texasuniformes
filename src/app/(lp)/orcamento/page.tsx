import type { Metadata } from "next";
import Image from "next/image";
import {
  BadgeCheck,
  Clock,
  Factory,
  MapPin,
  MessageCircle,
  PackageOpen,
  Ruler,
  ShieldCheck,
} from "lucide-react";
import { LpWhatsAppCta } from "@/components/lp/LpWhatsAppCta";
import { QuoteForm } from "@/components/QuoteForm";
import { Container } from "@/components/ui/Container";
import { getSiteSettings } from "@/lib/content";

export const metadata: Metadata = {
  title: "Orçamento de uniformes para empresas | Texas Uniformes",
  description:
    "Uniformes profissionais sob medida com fabricação própria em Ananindeua/PA desde 1995. Peça seu orçamento pelo WhatsApp e receba prazo e preço.",
  alternates: { canonical: "/orcamento" },
};

const WHATSAPP_MESSAGE =
  "Olá! Quero um orçamento de uniformes para a minha empresa.";

const ORIGIN_FALLBACK = "LP-ORCAMENTO";

const segments = [
  {
    title: "Uniformes profissionais",
    description:
      "Camisas, calças e jalecos para equipes administrativas, operacionais e de atendimento.",
    image: "/images/galeria-uniformes-corporativos.png",
    alt: "Equipe com uniformes corporativos da Texas Uniformes",
  },
  {
    title: "Linha hospitalar",
    description:
      "Scrubs, jalecos e aventais para clínicas, laboratórios e hospitais.",
    image: "/images/galeria-linha-hospitalar.png",
    alt: "Profissionais de saúde com uniformes da linha hospitalar",
  },
  {
    title: "Uniformes escolares",
    description:
      "Kits completos para escolas e creches, com a identidade da instituição.",
    image: "/images/galeria-uniformes-escolares.png",
    alt: "Alunos com uniformes escolares da Texas Uniformes",
  },
  {
    title: "Têxteis para hotelaria",
    description:
      "Enxoval e uniformes para hotéis, pousadas e restaurantes.",
    image: "/images/galeria-enxoval-hotelaria.png",
    alt: "Enxoval e têxteis para hotelaria",
  },
];

const steps = [
  {
    icon: MessageCircle,
    title: "1. Você conta o que precisa",
    description:
      "Tipo de peça, quantidade estimada e se vai levar bordado ou estampa. Pelo WhatsApp, em dois minutos.",
  },
  {
    icon: Ruler,
    title: "2. A gente monta o orçamento",
    description:
      "Você recebe preço por peça, opções de tecido e o prazo real de produção.",
  },
  {
    icon: PackageOpen,
    title: "3. Produzimos e entregamos",
    description:
      "Fabricação na nossa própria unidade em Ananindeua, com acompanhamento até a entrega.",
  },
];

export default async function OrcamentoPage() {
  const settings = await getSiteSettings();

  return (
    <>
      {/* Hero */}
      <section className="relative bg-navy text-white">
        <div className="absolute inset-0">
          <Image
            src="/images/hero-home-profissionais.png"
            alt="Profissionais de diferentes setores com uniformes Texas Uniformes"
            fill
            priority
            sizes="100vw"
            className="object-cover opacity-25"
          />
        </div>
        <Container className="relative py-16 lg:py-24">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-teal">
              Fábrica própria em Ananindeua/PA
            </p>
            <h1 className="mt-4 text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl">
              Uniformes sob medida para a sua empresa, com preço e prazo na
              mesma conversa
            </h1>
            <p className="mt-5 text-base text-white/85 sm:text-lg">
              Fabricamos desde 1995 para empresas, hospitais, escolas e
              hotelaria — com bordado e estamparia personalizados. Mande sua
              necessidade pelo WhatsApp e receba o orçamento.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <LpWhatsAppCta
                whatsapp={settings.whatsapp}
                message={WHATSAPP_MESSAGE}
                label="Pedir orçamento no WhatsApp"
                fallbackCode={ORIGIN_FALLBACK}
              />
              <a
                href="#formulario"
                className="inline-flex items-center justify-center rounded-full border border-white/40 px-7 py-4 text-sm font-semibold uppercase tracking-wide text-white transition-colors hover:border-teal hover:text-teal"
              >
                Prefiro preencher um formulário
              </a>
            </div>

            <ul className="mt-10 grid gap-3 text-sm text-white/85 sm:grid-cols-2">
              <li className="flex items-center gap-2">
                <Factory size={18} className="shrink-0 text-teal" />
                Fabricação própria, sem intermediários
              </li>
              <li className="flex items-center gap-2">
                <BadgeCheck size={18} className="shrink-0 text-teal" />
                Mais de 25 anos atendendo empresas no Pará
              </li>
              <li className="flex items-center gap-2">
                <ShieldCheck size={18} className="shrink-0 text-teal" />
                Avaliação 4,7 no Google
              </li>
              <li className="flex items-center gap-2">
                <Clock size={18} className="shrink-0 text-teal" />
                Seg a sex, 8h às 17h · Sáb, 8h às 12h
              </li>
            </ul>
          </div>
        </Container>
      </section>

      {/* Segmentos */}
      <section className="bg-white py-16">
        <Container>
          <h2 className="text-2xl font-bold uppercase tracking-wide text-navy">
            O que fabricamos
          </h2>
          <p className="mt-2 max-w-2xl text-text-dark/80">
            Atendemos pedidos a partir de pequenos lotes até produções
            completas, com a identidade visual da sua marca em cada peça.
          </p>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {segments.map((segment) => (
              <article
                key={segment.title}
                className="overflow-hidden rounded-xl border border-black/10 bg-white"
              >
                <div className="relative aspect-[4/3]">
                  <Image
                    src={segment.image}
                    alt={segment.alt}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover"
                  />
                </div>
                <div className="p-5">
                  <h3 className="text-base font-bold text-navy">
                    {segment.title}
                  </h3>
                  <p className="mt-2 text-sm text-text-dark/80">
                    {segment.description}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </Container>
      </section>

      {/* Como funciona */}
      <section className="bg-light-bg py-16">
        <Container>
          <h2 className="text-2xl font-bold uppercase tracking-wide text-navy">
            Como funciona
          </h2>
          <div className="mt-10 grid gap-8 lg:grid-cols-3">
            {steps.map((step) => (
              <div key={step.title} className="flex gap-4">
                <span className="grid size-11 shrink-0 place-items-center rounded-full bg-teal text-white">
                  <step.icon size={20} />
                </span>
                <div>
                  <h3 className="text-base font-bold text-navy">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-sm text-text-dark/80">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Formulario */}
      <section id="formulario" className="scroll-mt-20 bg-white py-16">
        <Container className="grid gap-12 lg:grid-cols-2">
          <div>
            <h2 className="text-2xl font-bold uppercase tracking-wide text-navy">
              Peça seu orçamento
            </h2>
            <p className="mt-2 text-text-dark/80">
              Preencha os campos e a gente abre o WhatsApp com a mensagem
              pronta — você só confere e envia.
            </p>
            <div className="mt-8">
              <QuoteForm whatsapp={settings.whatsapp} />
            </div>
          </div>

          <div className="rounded-xl bg-light-bg p-8">
            <h3 className="text-lg font-bold uppercase tracking-wide text-navy">
              Prefere falar direto?
            </h3>
            <p className="mt-2 text-sm text-text-dark/80">
              O WhatsApp é o caminho mais rápido. Respondemos dentro do horário
              comercial.
            </p>
            <LpWhatsAppCta
              whatsapp={settings.whatsapp}
              message={WHATSAPP_MESSAGE}
              label="Chamar no WhatsApp"
              fallbackCode={ORIGIN_FALLBACK}
              className="mt-6 w-full"
            />

            <ul className="mt-8 space-y-4 text-sm text-text-dark/85">
              <li className="flex items-start gap-3">
                <Clock size={18} className="mt-0.5 shrink-0 text-teal" />
                <span>
                  Segunda a sexta, 8h às 17h
                  <br />
                  Sábado, 8h às 12h
                </span>
              </li>
              <li className="flex items-start gap-3">
                <MapPin size={18} className="mt-0.5 shrink-0 text-teal" />
                <span>Alameda Doze, 113 — Centro, Ananindeua/PA</span>
              </li>
            </ul>
          </div>
        </Container>
      </section>

      {/* Barra fixa no celular */}
      <div className="sticky bottom-0 z-40 border-t border-black/10 bg-white/95 p-3 backdrop-blur lg:hidden">
        <LpWhatsAppCta
          whatsapp={settings.whatsapp}
          message={WHATSAPP_MESSAGE}
          label="Pedir orçamento no WhatsApp"
          fallbackCode={ORIGIN_FALLBACK}
          className="w-full"
        />
      </div>
    </>
  );
}
