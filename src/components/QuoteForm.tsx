"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { CheckCircle2 } from "lucide-react";
import { type LeadInput, leadSchema, segmentOptions } from "@/lib/validation/lead";
import { buildQuoteMessage, buildWhatsAppUrl } from "@/lib/whatsapp";
import type { SegmentSlug } from "@/types/content";

export function QuoteForm({
  defaultSegment,
  whatsapp,
}: {
  defaultSegment?: SegmentSlug;
  whatsapp: string;
}) {
  const [waHref, setWaHref] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LeadInput>({
    resolver: zodResolver(leadSchema),
    defaultValues: {
      segment: defaultSegment ?? "outro",
    },
  });

  const onSubmit = (data: LeadInput) => {
    const segmentLabel =
      segmentOptions.find((s) => s.value === data.segment)?.label ??
      data.segment;
    const href = buildWhatsAppUrl(whatsapp, buildQuoteMessage(data, segmentLabel));

    // Open synchronously (no awaits before this) so browsers don't treat it as a popup.
    window.open(href, "_blank", "noopener,noreferrer");
    setWaHref(href);
  };

  if (waHref) {
    return (
      <div className="rounded-xl bg-light-bg p-8 text-center">
        <CheckCircle2 className="mx-auto text-teal" size={40} />
        <h3 className="mt-4 text-lg font-bold uppercase tracking-wide text-navy">
          Quase lá!
        </h3>
        <p className="mt-2 text-sm text-text-dark/80">
          Abrimos o WhatsApp com sua mensagem pronta — é só conferir e apertar
          enviar. Se não abriu automaticamente, use o botão abaixo.
        </p>
        <a
          href={waHref}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-5 inline-block rounded-full bg-teal px-6 py-3 text-sm font-semibold uppercase tracking-wide text-white hover:opacity-90"
        >
          Abrir WhatsApp
        </a>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1 block text-sm font-medium text-navy">
            Nome
          </label>
          <input
            {...register("name")}
            className="w-full rounded-lg border border-black/10 px-4 py-2.5 text-sm focus:border-teal focus:outline-none"
          />
          {errors.name && (
            <p className="mt-1 text-xs text-red-600">{errors.name.message}</p>
          )}
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-navy">
            Empresa
          </label>
          <input
            {...register("company")}
            className="w-full rounded-lg border border-black/10 px-4 py-2.5 text-sm focus:border-teal focus:outline-none"
          />
          {errors.company && (
            <p className="mt-1 text-xs text-red-600">{errors.company.message}</p>
          )}
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1 block text-sm font-medium text-navy">
            Telefone / WhatsApp
          </label>
          <input
            {...register("phone")}
            className="w-full rounded-lg border border-black/10 px-4 py-2.5 text-sm focus:border-teal focus:outline-none"
          />
          {errors.phone && (
            <p className="mt-1 text-xs text-red-600">{errors.phone.message}</p>
          )}
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-navy">
            Segmento
          </label>
          <select
            {...register("segment")}
            className="w-full rounded-lg border border-black/10 px-4 py-2.5 text-sm focus:border-teal focus:outline-none"
          >
            {segmentOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium text-navy">
          Quantidade estimada
        </label>
        <input
          {...register("quantity")}
          placeholder="Ex: 50 peças, 200 peças..."
          className="w-full rounded-lg border border-black/10 px-4 py-2.5 text-sm focus:border-teal focus:outline-none"
        />
        {errors.quantity && (
          <p className="mt-1 text-xs text-red-600">{errors.quantity.message}</p>
        )}
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium text-navy">
          Mensagem (opcional)
        </label>
        <textarea
          {...register("message")}
          rows={4}
          className="w-full rounded-lg border border-black/10 px-4 py-2.5 text-sm focus:border-teal focus:outline-none"
        />
      </div>

      <button
        type="submit"
        className="w-full rounded-full bg-teal px-6 py-3.5 text-sm font-semibold uppercase tracking-wide text-white transition-opacity hover:opacity-90"
      >
        Solicitar orçamento
      </button>
    </form>
  );
}
