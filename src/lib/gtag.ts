export const GOOGLE_ADS_TAG_ID = "AW-17241540832";
export const GA4_MEASUREMENT_ID = "G-YRLEY2VKXF";

/**
 * Rotulos das acoes de conversao criadas na conta do Google Ads.
 * Sao identificadores publicos de client-side, nao sao segredo.
 */
export const conversionLabels = {
  whatsappClick: `${GOOGLE_ADS_TAG_ID}/mwlZCJ6GurMdEOCRtJ1A`,
  quoteFormSubmit: `${GOOGLE_ADS_TAG_ID}/E_QlCPyCubMdEOCRtJ1A`,
} as const;

type GtagFn = (...args: unknown[]) => void;

function getGtag(): GtagFn | undefined {
  if (typeof window === "undefined") return undefined;
  return (window as unknown as { gtag?: GtagFn }).gtag;
}

/**
 * Registra um lead: manda a conversao para o Google Ads e um evento nomeado
 * para o GA4.
 *
 * Nunca lanca: se o gtag nao tiver carregado, ou estiver bloqueado por um
 * ad blocker, a funcao sai em silencio. Medicao nao pode quebrar a pagina
 * nem impedir o usuario de chegar ao WhatsApp.
 */
export function trackLead(sendTo: string, ga4EventName: string): void {
  const gtag = getGtag();
  if (!gtag) return;

  try {
    gtag("event", "conversion", {
      send_to: sendTo,
      value: 1.0,
      currency: "BRL",
    });
    gtag("event", ga4EventName);
  } catch {
    // Falha de medicao e silenciosa de proposito.
  }
}
