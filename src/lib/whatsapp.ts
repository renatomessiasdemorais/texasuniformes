import type { LeadInput } from "./validation/lead";

export function buildWhatsAppUrl(whatsapp: string, message: string) {
  const digits = whatsapp.replace(/\D/g, "");
  return `https://wa.me/${digits}?text=${encodeURIComponent(message)}`;
}

export function buildQuoteMessage(data: LeadInput, segmentLabel: string) {
  return [
    "Olá! Gostaria de solicitar um orçamento de uniformes.",
    "",
    `*Nome:* ${data.name}`,
    `*Empresa:* ${data.company}`,
    `*Telefone:* ${data.phone}`,
    `*Segmento:* ${segmentLabel}`,
    `*Quantidade estimada:* ${data.quantity}`,
    `*Mensagem:* ${data.message?.trim() || "-"}`,
  ].join("\n");
}
