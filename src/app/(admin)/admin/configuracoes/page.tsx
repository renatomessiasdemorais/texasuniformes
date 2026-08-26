import Link from "next/link";
import { ArrowLeft, Save } from "lucide-react";
import { requireContentManager } from "@/lib/supabase/admin";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { saveSiteSettingsAction } from "./actions";

type SearchParams = Promise<{ success?: string; error?: string }>;

export default async function SiteSettingsPage({ searchParams }: { searchParams: SearchParams }) {
  await requireContentManager();
  const supabase = await createSupabaseServerClient();
  const [{ data: settings }, params] = await Promise.all([
    supabase.from("site_settings").select("*").eq("id", true).maybeSingle(),
    searchParams,
  ]);

  const value = (key: string) => (settings?.[key] as string | null | undefined) ?? "";
  const isEnabled = (key: string, fallback = false) => (settings?.[key] as boolean | null | undefined) ?? fallback;

  return (
    <main className="mx-auto max-w-4xl px-6 py-10 lg:px-8">
      <Link href="/admin" className="inline-flex items-center gap-2 text-sm font-semibold text-teal hover:underline">
        <ArrowLeft size={16} /> Voltar ao painel
      </Link>
      <h1 className="mt-5 text-3xl font-bold text-navy">Configurações do site</h1>
      <p className="mt-2 text-text-dark/70">Atualize os dados que aparecem em todo o site e no destaque da página inicial.</p>

      {params.success && <p className="mt-6 rounded-lg bg-emerald-50 px-4 py-3 text-sm text-emerald-700">Alterações salvas com sucesso.</p>}
      {params.error && <p className="mt-6 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">Não foi possível salvar. Tente novamente.</p>}

      <form action={saveSiteSettingsAction} className="mt-8 space-y-8">
        <fieldset className="rounded-xl bg-white p-6 shadow-sm">
          <legend className="px-1 text-lg font-bold text-navy">Contato</legend>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <Field label="Telefone" name="phone" defaultValue={value("phone")} />
            <Field label="WhatsApp (com DDI)" name="whatsapp" defaultValue={value("whatsapp")} />
            <Field label="E-mail" name="email" type="email" defaultValue={value("email")} />
            <Field label="Mensagem inicial do WhatsApp" name="whatsapp_message" defaultValue={value("whatsapp_message")} />
            <Field label="Endereço — linha 1" name="address_line1" defaultValue={value("address_line1")} />
            <Field label="Endereço — linha 2" name="address_line2" defaultValue={value("address_line2")} />
            <Field label="Link do Google Maps" name="map_url" type="url" defaultValue={value("map_url")} className="sm:col-span-2" />
          </div>
        </fieldset>

        <fieldset className="rounded-xl bg-white p-6 shadow-sm">
          <legend className="px-1 text-lg font-bold text-navy">Disponibilidade no site público</legend>
          <p className="mt-2 text-sm text-text-dark/70">Desmarque uma área enquanto o conteúdo estiver incompleto. Os dados continuam salvos no painel e podem ser publicados novamente a qualquer momento.</p>
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            <PublicationToggle name="show_home_hero" label="Destaque da página inicial" description="Banner principal da home." defaultChecked={isEnabled("show_home_hero", true)} />
            <PublicationToggle name="show_phone" label="Telefone" description="Exibir telefone/WhatsApp onde houver contato." defaultChecked={isEnabled("show_phone", true)} />
            <PublicationToggle name="show_email" label="E-mail" description="Exibir somente quando o e-mail estiver preenchido." defaultChecked={isEnabled("show_email")} />
            <PublicationToggle name="show_address" label="Endereço" description="Exibir as linhas de endereço preenchidas." defaultChecked={isEnabled("show_address")} />
            <PublicationToggle name="show_map" label="Mapa" description="Exibir o mapa somente quando houver endereço." defaultChecked={isEnabled("show_map")} />
            <PublicationToggle name="show_instagram" label="Instagram" description="Exibir o link somente quando estiver preenchido." defaultChecked={isEnabled("show_instagram")} />
            <PublicationToggle name="show_facebook" label="Facebook" description="Exibir o link somente quando estiver preenchido." defaultChecked={isEnabled("show_facebook")} />
            <PublicationToggle name="show_linkedin" label="LinkedIn" description="Exibir o link somente quando estiver preenchido." defaultChecked={isEnabled("show_linkedin")} />
            <PublicationToggle name="show_client_logos" label="Logos de clientes na home" description="Exibir a faixa de logos na página inicial." defaultChecked={isEnabled("show_client_logos")} />
            <PublicationToggle name="show_clients_page" label="Página Clientes" description="Exibir ou ocultar a página e os links Clientes." defaultChecked={isEnabled("show_clients_page", true)} />
            <PublicationToggle name="show_company_page" label="Página Empresa" description="Exibir ou ocultar a página e os links Empresa." defaultChecked={isEnabled("show_company_page", true)} />
            <PublicationToggle name="show_contact_page" label="Página Contato" description="Exibir ou ocultar a página e os links Contato." defaultChecked={isEnabled("show_contact_page", true)} />
            <PublicationToggle name="show_testimonials" label="Depoimentos" description="Avaliações cadastradas e publicadas." defaultChecked={isEnabled("show_testimonials")} />
            <PublicationToggle name="show_product_galleries" label="Galerias de produtos" description="Fotos nas páginas de cada linha." defaultChecked={isEnabled("show_product_galleries")} />
            <PublicationToggle name="show_faqs" label="Perguntas frequentes" description="Perguntas nas páginas de cada linha." defaultChecked={isEnabled("show_faqs")} />
          </div>
        </fieldset>

        <fieldset className="rounded-xl bg-white p-6 shadow-sm">
          <legend className="px-1 text-lg font-bold text-navy">Redes sociais</legend>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <Field label="Instagram" name="instagram_url" type="url" defaultValue={value("instagram_url")} />
            <Field label="Facebook" name="facebook_url" type="url" defaultValue={value("facebook_url")} />
            <Field label="LinkedIn" name="linkedin_url" type="url" defaultValue={value("linkedin_url")} />
          </div>
        </fieldset>

        <fieldset className="rounded-xl bg-white p-6 shadow-sm">
          <legend className="px-1 text-lg font-bold text-navy">Destaque da home</legend>
          <div className="mt-4 space-y-4">
            <Field label="Título" name="home_hero_headline" defaultValue={value("home_hero_headline")} required />
            <TextArea label="Subtítulo" name="home_hero_subheadline" defaultValue={value("home_hero_subheadline")} />
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Caminho da imagem" name="home_hero_image_path" defaultValue={value("home_hero_image_path")} placeholder="Será preenchido pela biblioteca de imagens" />
              <Field label="Descrição da imagem" name="home_hero_image_alt" defaultValue={value("home_hero_image_alt")} />
            </div>
          </div>
        </fieldset>

        <button className="inline-flex items-center gap-2 rounded-lg bg-teal px-5 py-3 font-semibold text-white transition hover:bg-teal/90">
          <Save size={18} /> Salvar alterações
        </button>
      </form>
    </main>
  );
}

function Field({ label, name, defaultValue, type = "text", className = "", required = false, placeholder }: {
  label: string; name: string; defaultValue?: string; type?: string; className?: string; required?: boolean; placeholder?: string;
}) {
  return <label className={`block text-sm font-medium text-navy ${className}`}>{label}<input name={name} type={type} defaultValue={defaultValue} required={required} placeholder={placeholder} className="mt-1.5 w-full rounded-lg border border-black/10 px-3 py-2.5 text-text-dark outline-none focus:border-teal focus:ring-2 focus:ring-teal/20" /></label>;
}

function TextArea({ label, name, defaultValue }: { label: string; name: string; defaultValue?: string }) {
  return <label className="block text-sm font-medium text-navy">{label}<textarea name={name} defaultValue={defaultValue} rows={3} className="mt-1.5 w-full rounded-lg border border-black/10 px-3 py-2.5 text-text-dark outline-none focus:border-teal focus:ring-2 focus:ring-teal/20" /></label>;
}

function PublicationToggle({ name, label, description, defaultChecked }: { name: string; label: string; description: string; defaultChecked: boolean }) {
  return <label className="flex cursor-pointer items-start gap-3 rounded-lg border border-black/10 p-4 transition hover:border-teal/50"><input name={name} type="checkbox" defaultChecked={defaultChecked} className="mt-1 h-4 w-4 accent-teal"/><span><span className="block font-semibold text-navy">{label}</span><span className="mt-0.5 block text-sm text-text-dark/70">{description}</span></span></label>;
}
