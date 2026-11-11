/**
 * Codigo de origem do lead.
 *
 * A landing page de anuncios precisa dizer, dentro da propria mensagem de
 * WhatsApp, de onde a pessoa veio. Quem atende (a dona) le esse codigo na
 * primeira linha e aplica a etiqueta correspondente no WhatsApp Business.
 * O gclid, quando existe, segue junto para permitir, mais tarde, devolver a
 * venda fechada ao Google Ads como conversao offline.
 *
 * Tudo aqui e client-side e tolerante a falha: sem parametros na URL, o lead
 * continua funcionando normalmente, so sem codigo.
 */

const UNSAFE = /[^A-Za-z0-9._-]/g;

export type LeadOrigin = {
  /** Codigo curto e legivel, ex.: LP-ADS. Vazio quando nao ha origem. */
  code: string;
  /** Identificador do clique no Google Ads, quando a visita veio de um anuncio. */
  gclid: string | null;
};

function clean(value: string | null, maxLength: number): string | null {
  if (!value) return null;
  const cleaned = value.replace(UNSAFE, "").slice(0, maxLength);
  return cleaned.length > 0 ? cleaned : null;
}

/**
 * Quando a URL nao traz nada, a propria pagina ja diz de onde veio:
 * quem esta em /orcamento chegou pela landing page de campanha.
 */
function pathFallback(pathname: string): string {
  return pathname.startsWith("/orcamento") ? "LP-ORCAMENTO" : "";
}

export function readLeadOrigin(fallbackCode: string): LeadOrigin {
  if (typeof window === "undefined") return { code: fallbackCode, gclid: null };

  let params: URLSearchParams;
  try {
    params = new URLSearchParams(window.location.search);
  } catch {
    return { code: fallbackCode, gclid: null };
  }

  const gclid = clean(params.get("gclid"), 120);
  const code =
    clean(params.get("o"), 24) ??
    clean(params.get("utm_campaign"), 24) ??
    (gclid ? "LP-ADS" : null) ??
    (fallbackCode || pathFallback(window.location.pathname));

  return { code, gclid };
}

/** Linha de rodape que vai dentro da mensagem de WhatsApp. */
export function originLine(origin: LeadOrigin): string | undefined {
  if (!origin.code) return undefined;
  return origin.gclid
    ? `-- origem: ${origin.code} | ref: ${origin.gclid}`
    : `-- origem: ${origin.code}`;
}
