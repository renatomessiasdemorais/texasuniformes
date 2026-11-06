"use client";

import { MessageCircle } from "lucide-react";
import { conversionLabels, trackLead } from "@/lib/gtag";

/**
 * Parte client do botao flutuante de WhatsApp. Existe separada do
 * WhatsAppFloatButton para que o componente de servidor siga buscando as
 * configuracoes do site, e so o anchor precise rodar no navegador para
 * disparar a conversao.
 */
export function WhatsAppLink({ href }: { href: string }) {
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
      <span className="hidden text-sm font-semibold sm:inline">WhatsApp</span>
    </a>
  );
}
