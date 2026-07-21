"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { CheckCircle2 } from "lucide-react";
import { type LeadInput, leadSchema, segmentOptions } from "@/lib/validation/lead";
import { buildWhatsAppUrl } from "@/lib/whatsapp";
import type { SegmentSlug } from "@/types/content";

export function QuoteForm({
  defaultSegment,
  whatsapp,
}: {
  defaultSegment?: SegmentSlug;
  whatsapp: string;
}) {
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">(
    "idle"
  );

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

  const onSubmit = async (data: LeadInput) => {
    setStatus("sending");
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("request failed");
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  if (status === "success") {
    const waHref = buildWhatsAppUrl(
      whatsapp,
      "Olá! Acabei de enviar um pedido de orçamento pelo site."
    );
    return (
      <div className="rounded-xl bg-light-bg p-8 text-center">
        <CheckCircle2 className="mx-auto text-teal" size={40} />
        <h3 className="mt-4 text-lg font-bold uppercase tracking-wide text-navy">
          Pedido enviado com sucesso!
        </h3>
        <p className="mt-2 text-sm text-text-dark/80">
          Nossa equipe vai retornar em breve. Se preferir, fale com a gente
          agora mesmo pelo WhatsApp.
        </p>
        <a
          href={waHref}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-5 inline-block rounded-full bg-teal px-6 py-3 text-sm font-semibold uppercase tracking-wide text-white hover:opacity-90"
        >
          Chamar no WhatsApp
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

      {status === "error" && (
        <p className="text-sm text-red-600">
          Não foi possível enviar seu pedido agora. Tente novamente ou fale
          pelo WhatsApp.
        </p>
      )}

      <button
        type="submit"
        disabled={status === "sending"}
        className="w-full rounded-full bg-teal px-6 py-3.5 text-sm font-semibold uppercase tracking-wide text-white transition-opacity hover:opacity-90 disabled:opacity-60"
      >
        {status === "sending" ? "Enviando..." : "Solicitar orçamento"}
      </button>
    </form>
  );
}
