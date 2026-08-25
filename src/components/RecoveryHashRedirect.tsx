"use client";

import { createBrowserClient } from "@supabase/ssr";
import { useEffect } from "react";

/**
 * Handles recovery links that Supabase redirects to the configured Site URL.
 * The recovery session arrives in the URL hash, which is not sent to the server.
 */
export function RecoveryHashRedirect() {
  useEffect(() => {
    const hash = new URLSearchParams(window.location.hash.slice(1));
    const accessToken = hash.get("access_token");
    const refreshToken = hash.get("refresh_token");

    if (hash.get("type") !== "recovery" || !accessToken || !refreshToken) {
      return;
    }

    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const publishableKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

    if (!url || !publishableKey) {
      window.location.replace("/admin/login?error=link-invalido");
      return;
    }

    const supabase = createBrowserClient(url, publishableKey);

    void supabase.auth
      .setSession({ access_token: accessToken, refresh_token: refreshToken })
      .then(({ error }) => {
        window.location.replace(
          error
            ? "/admin/login?error=link-invalido"
            : "/admin/redefinir-senha",
        );
      });
  }, []);

  return null;
}
