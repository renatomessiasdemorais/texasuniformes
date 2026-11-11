"use client";

import { useState } from "react";
import { MessageCircle, TriangleAlert } from "lucide-react";
import { conversionLabels, trackLead } from "@/lib/gtag";
import { originLine } from "@/lib/lead-origin";
import { buildWhatsAppUrl } from "@/lib/whatsapp";
import { useLeadOrigin } from "./useLeadOrigin";

/**
 * Caminho unico da landing page.
 *
 * Em vez de oferecer "WhatsApp ou formulario", a pagina tem uma acao so:
 * tres perguntas curtas que montam a mensagem de WhatsApp ja qualificada.
 * Quem atende recebe segmento, quantidade e nome na primeira mensagem, em
 * vez de precisar perguntar tudo isso.
 */

const SEGMENTOS = [
  { value: "Uniformes profissionais", label: "Uniformes profissionais" },
  { value: "Linha hospitalar", label: "Linha hospitalar (jaleco, scrub)" },
  { value: "Uniformes escolares", label: "Uniformes escolares" },
  { value: "Têxteis para hotelaria", label: "Hotelaria (enxoval e equipe)" },
  { value: "Ainda não sei", label: "Ainda não sei" },
] as const;

const QUANTIDADES = [
  { value: "Menos de 30 peças", label: "Menos de 30 peças", abaixoDoMinimo: true },
  { value: "30 a 50 peças", label: "30 a 50 peças", abaixoDoMinimo: false },
  { value: "51 a 100 peças", label: "51 a 100 peças", abaixoDoMinimo: false },
  { value: "101 a 300 peças", label: "101 a 300 peças", abaixoDoMinimo: false },
  { value: "Mais de 300 peças", label: "Mais de 300 peças", abaixoDoMinimo: false },
  { value: "Ainda não sei", label: "Ainda não sei", abaixoDoMinimo: false },
] as const;

export function QualificadorWhatsApp({
  whatsapp,
  fallbackCode = "LP-ORCAMENTO",
}: {
  whatsapp: string;
  fallbackCode?: string;
}) {
  const [segmento, setSegmento] = useState<string>("");
  const [quantidade, setQuantidade] = useState<string>("");
  const [nome, setNome] = useState<string>("");
  const [erro, setErro] = useState<string | null>(null);

  const origin = useLeadOrigin(fallbackCode);
  const abaixoDoMinimo =
    QUANTIDADES.find((q) => q.value === quantidade)?.abaixoDoMinimo ?? false;

  const enviar = (evento: React.FormEvent) => {
    evento.preventDefault();

    if (!segmento || !quantidade) {
      setErro("Escolha o tipo de uniforme e a quantidade.");
      return;
    }
    setErro(null);

    const linhas = [
      "Olá! Quero um orçamento de uniformes.",
      "",
      `*Tipo:* ${segmento}`,
      `*Quantidade:* ${quantidade}`,
    ];
    if (nome.trim()) linhas.push(`*Nome:* ${nome.trim()}`);

    const rodape = originLine(origin);
    if (rodape) linhas.push("", rodape);

    const href = buildWhatsAppUrl(whatsapp, linhas.join("\n"));

    // Abre de forma sincrona para o navegador nao tratar como popup.
    window.open(href, "_blank", "noopener,noreferrer");

    // Depois da abertura, para a medicao nunca atrasar o usuario.
    trackLead(conversionLabels.quoteFormSubmit, "orcamento_enviado");
  };

  const campo =
    "w-full rounded-lg border border-black/15 bg-white px-4 py-3 text-sm text-text-dark focus:border-teal focus:outline-none";

  return (
    <form
      onSubmit={enviar}
      className="rounded-2xl bg-white p-6 shadow-xl sm:p-7"
      noValidate
    >
      <h2 className="text-lg font-bold text-navy">
        Receba seu orçamento pelo WhatsApp
      </h2>
      <p className="mt-1 text-sm text-text-dark/70">
        Duas perguntas e você já fala com a fábrica.
      </p>

      <div className="mt-5 space-y-4">
        <div>
          <label
            htmlFor="lp-segmento"
            className="mb-1.5 block text-sm font-medium text-navy"
          >
            Que tipo de uniforme?
          </label>
          <select
            id="lp-segmento"
            value={segmento}
            onChange={(e) => setSegmento(e.target.value)}
            className={campo}
          >
            <option value="">Selecione...</option>
            {SEGMENTOS.map((s) => (
              <option key={s.value} value={s.value}>
                {s.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label
            htmlFor="lp-quantidade"
            className="mb-1.5 block text-sm font-medium text-navy"
          >
            Quantas peças, mais ou menos?
          </label>
          <select
            id="lp-quantidade"
            value={quantidade}
            onChange={(e) => setQuantidade(e.target.value)}
            className={campo}
          >
            <option value="">Selecione...</option>
            {QUANTIDADES.map((q) => (
              <option key={q.value} value={q.value}>
                {q.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label
            htmlFor="lp-nome"
            className="mb-1.5 block text-sm font-medium text-navy"
          >
            Seu nome{" "}
            <span className="font-normal text-text-dark/50">(opcional)</span>
          </label>
          <input
            id="lp-nome"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            autoComplete="name"
            className={campo}
          />
        </div>
      </div>

      {abaixoDoMinimo && (
        <p className="mt-4 flex items-start gap-2 rounded-lg bg-light-bg p-3 text-xs text-text-dark/80">
          <TriangleAlert size={16} className="mt-0.5 shrink-0 text-teal" />
          <span>
            Nossos pedidos começam em 30 peças. Pode mandar mesmo assim — a
            gente avalia caso a caso.
          </span>
        </p>
      )}

      {erro && <p className="mt-4 text-xs text-red-600">{erro}</p>}

      <button
        type="submit"
        className="mt-5 flex w-full items-center justify-center gap-2 rounded-full bg-teal px-6 py-4 text-sm font-semibold uppercase tracking-wide text-white transition-opacity hover:opacity-90"
      >
        <MessageCircle size={20} />
        Continuar no WhatsApp
      </button>

      <p className="mt-3 text-center text-xs text-text-dark/60">
        Abrimos a conversa com a mensagem pronta. Você confere e envia.
      </p>
    </form>
  );
}
