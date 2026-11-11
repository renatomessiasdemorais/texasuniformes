"use client";

import { MessageCircle } from "lucide-react";
import { useLeadOrigin } from "@/components/lp/useLeadOrigin";
import { conversionLabels, trackLead } from "@/lib/gtag";
import { originLine } from "@/lib/lead-origin";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

/**
 * Parte client do botao flutuante de WhatsApp. Existe separada do
 * WhatsAppFloatButton para que o componente de servidor siga buscando as
 * configuracoes do site, e so o anchor precise rodar no navegador para
 * montar a mensagem e disparar a conversao.
 *
 * A linha de origem e a mesma usada na landing page /orcamento: sem rastro
 * na URL ela nao aparece, e a mensagem fica identica a de antes.
 */
export function WhatsAppLink({
  whatsapp,
  message,
}: {
  whatsapp: string;
  message: string;
}) {
  const origin = useLeadOrigin("");
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
      aria-label="Falar no WhatsApp"
      onClick={() => trackLead(conversionLabels.whatsappClick, "clique_whatsapp")}
      className="fixed bottom-6 right-6 z-40 flex items-center gap-2 rounded-full bg-teal px-5 py-4 text-white shadow-lg transition-transform hover:scale-105"
    >
      <MessageCircle size={24} />
      <span className="text-sm font-semibold">WhatsApp</span>
    </a>
  );
}
