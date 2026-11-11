import { getSiteSettings } from "@/lib/content";
import { WhatsAppLink } from "@/components/WhatsAppLink";

export async function WhatsAppFloatButton() {
  const settings = await getSiteSettings();

  return (
    <WhatsAppLink
      whatsapp={settings.whatsapp}
      message={settings.whatsappMessage}
    />
  );
}
