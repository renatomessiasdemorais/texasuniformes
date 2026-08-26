import type { Metadata } from "next";
import { Mail, MapPin, Phone } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { QuoteForm } from "@/components/QuoteForm";
import { Container } from "@/components/ui/Container";
import { getSiteSettings } from "@/lib/content";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Contato",
  description:
    "Fale com a Texas Uniformes pelo WhatsApp, telefone, e-mail ou formulário de orçamento.",
};

export default async function ContatoPage() {
  const settings = await getSiteSettings();
  if (!settings.visibility.contactPage) redirect("/");
  const showPhone = settings.visibility.phone && Boolean(settings.phone);
  const showEmail = settings.visibility.email && Boolean(settings.email);
  const showAddress = settings.visibility.address && Boolean(settings.address.line1 || settings.address.line2);
  const showMap = settings.visibility.map && Boolean(settings.address.mapUrl);
  const hasContactInfo = showPhone || showEmail || showAddress || showMap;
  const placeFromMapUrl = settings.address.mapUrl.match(/\/maps\/place\/([^/?]+)/)?.[1];
  const mapQuery = encodeURIComponent(
    placeFromMapUrl ? decodeURIComponent(placeFromMapUrl).replace(/\+/g, " ") : settings.address.mapUrl
  );

  return (
    <>
      <PageHeader
        title="Contato"
        subtitle="Fale com a nossa equipe e solicite seu orçamento."
      />

      <section className="bg-white py-16">
        <Container className={`grid gap-12 ${hasContactInfo ? "lg:grid-cols-2" : "max-w-2xl"}`}>
          <div>
            <h2 className="mb-6 text-2xl font-bold uppercase tracking-wide text-navy">
              Solicite seu orçamento
            </h2>
            <QuoteForm whatsapp={settings.whatsapp} />
          </div>

          {hasContactInfo && <div>
            <h2 className="mb-6 text-2xl font-bold uppercase tracking-wide text-navy">
              Informações de contato
            </h2>
            <ul className="space-y-4 text-text-dark/85">
              {showPhone && <li className="flex items-start gap-3">
                <Phone size={20} className="mt-0.5 shrink-0 text-teal" />
                <span>{settings.phone}</span>
              </li>}
              {showEmail && <li className="flex items-start gap-3">
                <Mail size={20} className="mt-0.5 shrink-0 text-teal" />
                <span>{settings.email}</span>
              </li>}
              {showAddress && <li className="flex items-start gap-3">
                <MapPin size={20} className="mt-0.5 shrink-0 text-teal" />
                <span>
                  {settings.address.line1}
                  <br />
                  {settings.address.line2}
                </span>
              </li>}
            </ul>

            {showMap && <div className="mt-6 overflow-hidden rounded-xl border border-black/10">
              <iframe
                title="Localização Texas Uniformes"
                src={`https://www.google.com/maps?q=${mapQuery}&output=embed`}
                width="100%"
                height="280"
                loading="lazy"
                className="border-0"
              />
            </div>}
          </div>}
        </Container>
      </section>
    </>
  );
}
