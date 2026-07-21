import { NextResponse } from "next/server";
import { Resend } from "resend";
import { getSiteSettings } from "@/lib/content";
import { leadSchema, segmentOptions } from "@/lib/validation/lead";

export async function POST(request: Request) {
  const body = await request.json();
  const parsed = leadSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { error: "Dados inválidos", issues: parsed.error.issues },
      { status: 400 }
    );
  }

  const lead = parsed.data;
  const segmentLabel =
    segmentOptions.find((s) => s.value === lead.segment)?.label ?? lead.segment;

  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    console.warn(
      "[api/lead] RESEND_API_KEY não configurada — lead recebido mas e-mail não foi enviado:",
      lead
    );
    return NextResponse.json({ ok: true, emailSent: false });
  }

  const settings = await getSiteSettings();
  const to = process.env.LEAD_EMAIL_TO || settings.email;
  const from = process.env.LEAD_EMAIL_FROM || "Texas Uniformes <onboarding@resend.dev>";

  const resend = new Resend(apiKey);

  const { error } = await resend.emails.send({
    from,
    to,
    subject: `Novo orçamento — ${segmentLabel} — ${lead.company}`,
    html: `
      <h2>Novo pedido de orçamento</h2>
      <p><strong>Segmento:</strong> ${segmentLabel}</p>
      <p><strong>Nome:</strong> ${lead.name}</p>
      <p><strong>Empresa:</strong> ${lead.company}</p>
      <p><strong>Telefone/WhatsApp:</strong> ${lead.phone}</p>
      <p><strong>Quantidade estimada:</strong> ${lead.quantity}</p>
      <p><strong>Mensagem:</strong> ${lead.message || "—"}</p>
    `,
  });

  if (error) {
    console.error("[api/lead] Falha ao enviar e-mail via Resend:", error);
    return NextResponse.json(
      { error: "Não foi possível enviar seu pedido no momento." },
      { status: 502 }
    );
  }

  return NextResponse.json({ ok: true, emailSent: true });
}
