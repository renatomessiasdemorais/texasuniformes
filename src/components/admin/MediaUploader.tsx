"use client";

import { createBrowserClient } from "@supabase/ssr";
import { useRef, useState } from "react";

const maxFiles = 5;
const maxFileSize = 5 * 1024 * 1024;
const allowedTypes = new Set(["image/jpeg", "image/png", "image/webp"]);

export function MediaUploader() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const files = Array.from(inputRef.current?.files ?? []);

    if (!files.length || files.length > maxFiles || files.some((file) => !allowedTypes.has(file.type) || file.size > maxFileSize)) {
      setMessage("Selecione de 1 a 5 imagens JPG, PNG ou WebP, com até 5 MB cada.");
      return;
    }

    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const publishableKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
    if (!url || !publishableKey) {
      setMessage("Não foi possível iniciar o envio. Atualize a página e tente novamente.");
      return;
    }

    setUploading(true);
    setMessage(null);
    const supabase = createBrowserClient(url, publishableKey);
    const results = await Promise.all(files.map(async (file) => {
      const safeName = file.name.toLowerCase().replace(/[^a-z0-9._-]/g, "-");
      const path = `uploads/${Date.now()}-${crypto.randomUUID()}-${safeName}`;
      return supabase.storage.from("site-media").upload(path, file, { contentType: file.type, upsert: false });
    }));

    if (results.some(({ error }) => error)) {
      setUploading(false);
      setMessage("Não foi possível enviar uma das imagens. Verifique sua sessão e tente novamente.");
      return;
    }

    window.location.assign(`/admin/imagens?success=upload&count=${files.length}`);
  }

  return (
    <form onSubmit={handleSubmit} className="mt-7 flex flex-wrap items-center gap-4 rounded-xl border border-dashed border-teal/40 bg-white p-6">
      <input ref={inputRef} type="file" accept="image/jpeg,image/png,image/webp" multiple disabled={uploading} className="text-sm" />
      <button type="submit" disabled={uploading} className="rounded-lg bg-navy px-4 py-2.5 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-60">
        {uploading ? "Enviando imagens..." : "Enviar imagens"}
      </button>
      {message && <p role="alert" className="basis-full text-sm text-red-700">{message}</p>}
    </form>
  );
}
