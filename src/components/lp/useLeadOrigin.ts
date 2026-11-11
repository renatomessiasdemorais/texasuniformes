"use client";

import { useEffect, useState } from "react";
import { type LeadOrigin, readLeadOrigin } from "@/lib/lead-origin";

/**
 * Le a origem depois da montagem, de proposito: a pagina e estatica e a
 * leitura da query string no primeiro render causaria divergencia de
 * hidratacao.
 */
export function useLeadOrigin(fallbackCode: string): LeadOrigin {
  const [origin, setOrigin] = useState<LeadOrigin>({
    code: fallbackCode,
    gclid: null,
  });

  useEffect(() => {
    setOrigin(readLeadOrigin(fallbackCode));
  }, [fallbackCode]);

  return origin;
}
