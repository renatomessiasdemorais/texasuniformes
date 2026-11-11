"use client";

import { MessageCircle } from "lucide-react";
import { conversionLabels, trackLead } from "@/lib/gtag";
import { originLine } from "@/lib/lead-origin";
import { buildWhatsAppUrl } from "@/lib/whatsapp";
import { useLeadOrigin } from "./useLeadOrigin";

/**
 * Botao de WhatsApp da landing page. Monta a mensagem ja com o codigo de
 * origem e dispara a conversao "WhatsApp - clique no site" do Google Ads.
 */
export function LpWhatsAppCta({
  whatsapp,
  message,
  label = "Falar no WhatsApp",
  fallbackCode = "LP-ORCAMENTO",
  className = "",
}: {
  whatsapp: string;
  message: string;
  label?: string;
  fallbackCode?: string;
  className?: string;
}) {
  const origin = useLeadOrigin(fallbackCode);
  const footer = originLine(origin);
  const href = buildWhatsAppUrl(
    whatsapp,
    footer ? `${message}\n\n${footer}` : message
  );

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => trackLead(conversionLabels.whatsappClick, "clique_whatsapp")}
      className={`inline-flex items-center justify-center gap-2 rounded-full bg-teal px-7 py-4 text-sm font-semibold uppercase tracking-wide text-white transition-opacity hover:opacity-90 ${className}`}
    >
      <MessageCircle size={20} />
      {label}
    </a>
  );
}
