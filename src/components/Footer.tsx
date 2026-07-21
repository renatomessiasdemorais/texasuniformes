import Link from "next/link";
import { cacheLife, cacheTag } from "next/cache";
import { AtSign, Briefcase, Globe, Mail, MapPin, Phone } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { getSiteSettings, SANITY_CONTENT_TAG } from "@/lib/content";
import { mainNavLinks, segmentNavLinks } from "@/lib/nav-links";

export async function Footer() {
  "use cache";
  cacheLife("max");
  cacheTag(SANITY_CONTENT_TAG);

  const settings = await getSiteSettings();
  const year = new Date().getFullYear();

  return (
    <footer className="bg-navy-secondary text-white">
      <Container className="grid gap-10 py-14 md:grid-cols-4">
        <div>
          <p className="font-bold uppercase tracking-wide">
            <span className="text-lg">Texas</span>{" "}
            <span className="text-lg text-teal">Uniformes</span>
          </p>
          <p className="mt-3 text-sm text-white/70">
            Fabricação própria de uniformes profissionais desde 1995.
          </p>
        </div>

        <div>
          <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-teal">
            Produtos
          </p>
          <ul className="space-y-2 text-sm text-white/80">
            {segmentNavLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="hover:text-white">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-teal">
            Institucional
          </p>
          <ul className="space-y-2 text-sm text-white/80">
            {mainNavLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="hover:text-white">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-teal">
            Contato
          </p>
          <ul className="space-y-3 text-sm text-white/80">
            <li className="flex items-start gap-2">
              <Phone size={16} className="mt-0.5 shrink-0" />
              <span>{settings.phone}</span>
            </li>
            <li className="flex items-start gap-2">
              <Mail size={16} className="mt-0.5 shrink-0" />
              <span>{settings.email}</span>
            </li>
            <li className="flex items-start gap-2">
              <MapPin size={16} className="mt-0.5 shrink-0" />
              <span>
                {settings.address.line1}
                <br />
                {settings.address.line2}
              </span>
            </li>
          </ul>
          <div className="mt-4 flex gap-4">
            {settings.social.instagram && (
              <a
                href={settings.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="text-white/70 hover:text-teal"
              >
                <AtSign size={20} />
              </a>
            )}
            {settings.social.facebook && (
              <a
                href={settings.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="text-white/70 hover:text-teal"
              >
                <Globe size={20} />
              </a>
            )}
            {settings.social.linkedin && (
              <a
                href={settings.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="text-white/70 hover:text-teal"
              >
                <Briefcase size={20} />
              </a>
            )}
          </div>
        </div>
      </Container>

      <div className="border-t border-white/10 py-6">
        <Container>
          <p className="text-center text-xs text-white/50">
            © {year} Texas Uniformes. Todos os direitos reservados.
          </p>
        </Container>
      </div>
    </footer>
  );
}
