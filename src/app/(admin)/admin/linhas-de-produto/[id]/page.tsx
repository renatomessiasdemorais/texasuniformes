import Link from "next/link";
import { notFound } from "next/navigation";
import { deleteSegmentAction, saveSegmentAction } from "../actions";
import { requireContentManager } from "@/lib/supabase/admin";
import { createSupabaseServerClient } from "@/lib/supabase/server";

type PageProps = { params: Promise<{ id: string }>; searchParams: Promise<{ error?: string; success?: string }> };

const emptySegment = {
  id: "",
  slug: "",
  title: "",
  short_name: "",
  hero_headline: "",
  hero_subheadline: "",
  hero_image_path: "",
  hero_image_alt: "",
  category_image_path: "",
  category_image_alt: "",
  intro: "",
  position: 0,
  is_published: false,
};

export default async function SegmentEditorPage({ params, searchParams }: PageProps) {
  const { id } = await params;
  await requireContentManager();
  const supabase = await createSupabaseServerClient();
  const isNew = id === "nova";
  const { error, success } = await searchParams;
  const { data } = isNew ? { data: emptySegment } : await supabase.from("segments").select("*").eq("id", id).maybeSingle();
  if (!data) notFound();
  const segment = data as typeof emptySegment;

  return (
    <main className="mx-auto max-w-4xl px-6 py-10 lg:px-8">
      <Link href="/admin/linhas-de-produto" className="text-sm font-semibold text-teal hover:underline">← Linhas de produto</Link>
      <h1 className="mt-5 text-3xl font-bold text-navy">{isNew ? "Nova linha" : `Editar ${segment.title}`}</h1>
      <p className="mt-2 text-text-dark/70">Os campos abaixo definem as informações principais da página pública.</p>
      {error && <p className="mt-6 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">{error === "slug" ? "Use apenas letras minúsculas, números e hífens no endereço." : "Preencha os campos obrigatórios e tente novamente."}</p>}
      {success && <p className="mt-6 rounded-lg bg-teal/10 px-4 py-3 text-sm font-medium text-teal">Linha salva com sucesso.</p>}

      <form action={saveSegmentAction} className="mt-8 space-y-8">
        <input type="hidden" name="id" value={isNew ? "" : segment.id} />
        <section className="rounded-xl border border-black/5 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-bold text-navy">Identificação</h2>
          <div className="mt-5 grid gap-5 sm:grid-cols-2">
            <Field name="title" label="Título" defaultValue={segment.title} required />
            <Field name="short_name" label="Nome curto" defaultValue={segment.short_name} required />
            <Field name="slug" label="Endereço da página" defaultValue={segment.slug} required hint="Ex.: uniformes-profissionais" />
            <Field name="position" label="Ordem de exibição" type="number" defaultValue={String(segment.position)} />
          </div>
          <label className="mt-5 flex items-center gap-3 text-sm font-medium text-text-dark"><input name="is_published" type="checkbox" defaultChecked={segment.is_published} className="size-4 accent-teal" /> Publicar esta linha no site</label>
        </section>

        <section className="rounded-xl border border-black/5 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-bold text-navy">Destaque e apresentação</h2>
          <div className="mt-5 space-y-5">
            <TextArea name="hero_headline" label="Título de destaque" defaultValue={segment.hero_headline} required />
            <TextArea name="hero_subheadline" label="Subtítulo de destaque" defaultValue={segment.hero_subheadline} />
            <TextArea name="intro" label="Texto introdutório" defaultValue={segment.intro} />
          </div>
        </section>

        <section className="rounded-xl border border-black/5 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-bold text-navy">Imagens</h2>
          <p className="mt-2 text-sm text-text-dark/60">Por enquanto, informe a URL pública da imagem. A biblioteca com envio de arquivos será liberada em seguida.</p>
          <div className="mt-5 grid gap-5 sm:grid-cols-2">
            <Field name="hero_image_path" label="URL da imagem de destaque" defaultValue={segment.hero_image_path} />
            <Field name="hero_image_alt" label="Descrição da imagem de destaque" defaultValue={segment.hero_image_alt} />
            <Field name="category_image_path" label="URL da imagem do card" defaultValue={segment.category_image_path} />
            <Field name="category_image_alt" label="Descrição da imagem do card" defaultValue={segment.category_image_alt} />
          </div>
        </section>

        <div className="flex flex-wrap gap-3">
          <button className="rounded-lg bg-navy px-5 py-3 text-sm font-semibold text-white hover:bg-navy/90">Salvar linha</button>
          <Link href="/admin/linhas-de-produto" className="rounded-lg border border-black/10 px-5 py-3 text-sm font-semibold text-text-dark hover:bg-light-bg">Cancelar</Link>
        </div>
      </form>

      {!isNew && <form action={deleteSegmentAction} className="mt-10 border-t border-black/10 pt-6"><input type="hidden" name="id" value={segment.id} /><button className="text-sm font-semibold text-red-700 hover:underline">Excluir esta linha</button></form>}
    </main>
  );
}

function Field({ name, label, defaultValue, required, hint, type = "text" }: { name: string; label: string; defaultValue?: string; required?: boolean; hint?: string; type?: string }) {
  return <label className="block text-sm font-semibold text-navy">{label}<input name={name} type={type} defaultValue={defaultValue ?? ""} required={required} className="mt-2 w-full rounded-lg border border-black/10 bg-white px-3 py-2.5 font-normal text-text-dark outline-none focus:border-teal" />{hint && <span className="mt-1 block text-xs font-normal text-text-dark/55">{hint}</span>}</label>;
}

function TextArea({ name, label, defaultValue, required }: { name: string; label: string; defaultValue?: string; required?: boolean }) {
  return <label className="block text-sm font-semibold text-navy">{label}<textarea name={name} defaultValue={defaultValue ?? ""} required={required} rows={4} className="mt-2 w-full rounded-lg border border-black/10 bg-white px-3 py-2.5 font-normal leading-6 text-text-dark outline-none focus:border-teal" /></label>;
}
