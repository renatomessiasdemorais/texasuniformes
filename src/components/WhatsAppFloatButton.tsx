import { getSiteSettings } from "@/lib/content";
import { buildWhatsAppUrl } from "@/lib/whatsapp";
import { WhatsAppLink } from "@/components/WhatsAppLink";

export async function WhatsAppFloatButton() {
  const settings = await getSiteSettings();
  const href = buildWhatsAppUrl(settings.whatsapp, settings.whatsappMessage);

  return <WhatsAppLink href={href} />;
}
