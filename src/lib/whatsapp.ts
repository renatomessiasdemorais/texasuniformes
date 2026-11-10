import { originLine, readLeadOrigin } from "./lead-origin";
import type { LeadInput } from "./validation/lead";

export function buildWhatsAppUrl(whatsapp: string, message: string) {
  const digits = whatsapp.replace(/\D/g, "");
  return `https://wa.me/${digits}?text=${encodeURIComponent(message)}`;
}

export function buildQuoteMessage(data: LeadInput, segmentLabel: string) {
  const lines = [
    "Olá! Gostaria de solicitar um orçamento de uniformes.",
    "",
    `*Nome:* ${data.name}`,
    `*Empresa:* ${data.company}`,
    `*Telefone:* ${data.phone}`,
    `*Segmento:* ${segmentLabel}`,
    `*Quantidade estimada:* ${data.quantity}`,
    `*Mensagem:* ${data.message?.trim() || "-"}`,
  ];

  // A origem so aparece quando a visita trouxe algum rastro (parametro da
  // URL ou landing page de campanha). Em visita organica a mensagem fica
  // exatamente como era antes.
  const origin = originLine(readLeadOrigin(""));
  if (origin) lines.push("", origin);

  return lines.join("\n");
}
