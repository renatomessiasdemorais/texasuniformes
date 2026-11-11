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
} from "lucide-react";
import { QualificadorWhatsApp } from "@/components/lp/QualificadorWhatsApp";
import { Container } from "@/components/ui/Container";
import { getAllSegments, getSiteSettings } from "@/lib/content";

export const metadata: Metadata = {
  title: "Orçamento de uniformes para empresas | Texas Uniformes",
  description:
    "Fábrica própria de uniformes em Ananindeua/PA desde 1995. Pedidos a partir de 30 peças, com bordado da sua logomarca. Peça orçamento pelo WhatsApp.",
  alternates: { canonical: "/orcamento" },
};

const ORIGIN_FALLBACK = "LP-ORCAMENTO";

const provas = [
  { icon: Factory, texto: "Fabricação própria, sem intermediários" },
  { icon: BadgeCheck, texto: "Desde 1995 atendendo empresas no Pará" },
  { icon: PackageOpen, texto: "Pedidos a partir de 30 peças" },
  { icon: MapPin, texto: "Fábrica em Ananindeua/PA" },
];

const etapas = [
  {
    icon: MessageCircle,
    title: "Você diz o que precisa",
    description:
      "Tipo de peça e quantidade. Se já tiver a logomarca e as cores, melhor ainda.",
  },
  {
    icon: Ruler,
    title: "A gente volta com preço e prazo",
    description:
      "Valor por peça, opções de tecido e a data real de entrega — direto da fábrica.",
  },
  {
    icon: PackageOpen,
    title: "Produzimos e entregamos",
    description:
      "Enviamos tabela de medidas para o RH e acompanhamos até a entrega.",
  },
];

const perguntas = [
  {
    q: "Qual a quantidade mínima por pedido?",
    a: "Nossos pedidos começam em 30 peças. Abaixo disso avaliamos caso a caso, conforme o modelo.",
  },
  {
    q: "Qual o prazo de produção?",
    a: "Depende da quantidade e da personalização. Assim que o orçamento é aprovado, informamos a data estimada de entrega.",
  },
  {
    q: "Como tirar as medidas dos funcionários?",
    a: "Enviamos uma tabela de medidas padrão e orientações simples para o RH coletar os dados da equipe.",
  },
  {
    q: "Dá para bordar a logomarca da empresa?",
    a: "Sim. Trabalhamos com bordado e estamparia, e dá para variar cor ou bordado por setor.",
  },
];

export default async function OrcamentoPage() {
  const [settings, segmentos] = await Promise.all([
    getSiteSettings(),
    getAllSegments(),
  ]);

  return (
    <>
      {/* Hero com a acao unica ao lado */}
      <section className="relative isolate bg-navy text-white">
        <div className="absolute inset-0 -z-10">
          <Image
            src="/images/hero-home-profissionais.png"
            alt=""
            aria-hidden
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-navy/85" />
        </div>

        {/* No celular a ordem e: titulo, formulario, provas — para a acao
            aparecer sem rolagem. No desktop vira duas colunas. */}
        <Container className="grid items-center gap-8 py-12 lg:grid-cols-[1.1fr_minmax(0,420px)] lg:gap-16 lg:py-20">
          <div className="lg:order-1">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-teal">
              Fábrica própria · Ananindeua/PA
            </p>
            <h1 className="mt-3 text-[1.75rem] font-bold leading-[1.15] sm:text-4xl lg:mt-4 lg:text-[2.75rem]">
              Uniformes sob medida para a sua equipe
            </h1>
            <p className="mt-3 max-w-xl text-base text-white/85 lg:mt-4 lg:text-lg">
              Fabricação própria desde 1995, com bordado da sua logomarca.
              Pedidos a partir de 30 peças.
            </p>
          </div>

          <div className="lg:order-3 lg:pl-4">
            <QualificadorWhatsApp
              whatsapp={settings.whatsapp}
              fallbackCode={ORIGIN_FALLBACK}
            />
          </div>

          <ul className="grid gap-3 text-sm text-white/85 sm:grid-cols-2 lg:order-2 lg:-mt-4 lg:self-start">
            {provas.map((prova) => (
              <li key={prova.texto} className="flex items-center gap-2.5">
                <prova.icon size={18} className="shrink-0 text-teal" />
                {prova.texto}
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* O que fabricamos */}
      <section className="bg-white py-16">
        <Container>
          <h2 className="text-2xl font-bold uppercase tracking-wide text-navy">
            O que fabricamos
          </h2>
          <p className="mt-2 max-w-2xl text-text-dark/80">
            Cada peça sai da nossa unidade em Ananindeua, personalizada com a
            identidade da sua marca.
          </p>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {segmentos.map((segmento) => (
              <article
                key={segmento.slug}
                className="overflow-hidden rounded-xl border border-black/10"
              >
                <div className="relative aspect-[4/3] bg-light-bg">
                  <Image
                    src={segmento.categoryImage.src}
                    alt={segmento.categoryImage.alt}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover"
                  />
                </div>
                <div className="p-5">
                  <h3 className="text-base font-bold text-navy">
                    {segmento.title}
                  </h3>
                  <p className="mt-2 text-sm text-text-dark/80">
                    {segmento.intro ||
                      "Produção sob encomenda, com personalização completa."}
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
          <ol className="mt-10 grid gap-8 lg:grid-cols-3">
            {etapas.map((etapa, indice) => (
              <li key={etapa.title} className="flex gap-4">
                <span className="grid size-11 shrink-0 place-items-center rounded-full bg-teal text-white">
                  <etapa.icon size={20} />
                </span>
                <div>
                  <h3 className="text-base font-bold text-navy">
                    <span className="text-teal">{indice + 1}.</span>{" "}
                    {etapa.title}
                  </h3>
                  <p className="mt-2 text-sm text-text-dark/80">
                    {etapa.description}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      {/* Perguntas frequentes */}
      <section className="bg-white py-16">
        <Container className="max-w-3xl">
          <h2 className="text-2xl font-bold uppercase tracking-wide text-navy">
            Perguntas frequentes
          </h2>
          <dl className="mt-8 divide-y divide-black/10 border-y border-black/10">
            {perguntas.map((item) => (
              <div key={item.q} className="py-5">
                <dt className="text-base font-semibold text-navy">{item.q}</dt>
                <dd className="mt-2 text-sm text-text-dark/80">{item.a}</dd>
              </div>
            ))}
          </dl>
        </Container>
      </section>

      {/* Fechamento */}
      <section className="bg-navy py-16 text-white">
        <Container className="grid gap-10 lg:grid-cols-[1fr_minmax(0,420px)] lg:items-center lg:gap-16">
          <div>
            <h2 className="text-2xl font-bold uppercase tracking-wide">
              Vamos ao seu orçamento
            </h2>
            <p className="mt-3 max-w-lg text-white/80">
              Atendemos de segunda a sexta, das 8h às 17h, e aos sábados das 8h
              às 12h. A fábrica fica na Alameda Doze, 113 — Centro, Ananindeua/PA.
            </p>
            <p className="mt-4 flex items-center gap-2 text-sm text-white/70">
              <Clock size={18} className="shrink-0 text-teal" />
              Mensagens fora do horário são respondidas no próximo dia útil.
            </p>
          </div>
          <div className="lg:pl-4">
            <QualificadorWhatsApp
              whatsapp={settings.whatsapp}
              fallbackCode={ORIGIN_FALLBACK}
            />
          </div>
        </Container>
      </section>
    </>
  );
}
