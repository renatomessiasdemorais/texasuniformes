import { MessageCircle } from "lucide-react";
import { getSiteSettings } from "@/lib/content";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

export async function WhatsAppFloatButton() {
  const settings = await getSiteSettings();
  const href = buildWhatsAppUrl(settings.whatsapp, settings.whatsappMessage);

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Falar no WhatsApp"
      className="fixed bottom-6 right-6 z-40 flex items-center gap-2 rounded-full bg-teal px-5 py-4 text-white shadow-lg transition-transform hover:scale-105"
    >
      <MessageCircle size={24} />
      <span className="hidden text-sm font-semibold sm:inline">WhatsApp</span>
    </a>
  );
}
