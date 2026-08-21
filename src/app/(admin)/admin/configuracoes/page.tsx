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
