import Link from "next/link";
import { requireContentManager } from "@/lib/supabase/admin";
import { createSupabaseServerClient } from "@/lib/supabase/server";

type PageProps = { searchParams: Promise<{ success?: string }> };

export default async function SegmentsPage({ searchParams }: PageProps) {
  await requireContentManager();
  const supabase = await createSupabaseServerClient();
  const { data: segments } = await supabase
    .from("segments")
    .select("id, title, short_name, slug, position, is_published, updated_at")
    .order("position")
    .order("title");
  const { success } = await searchParams;

  return (
    <main className="mx-auto max-w-7xl px-6 py-10 lg:px-8">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <Link href="/admin" className="text-sm font-semibold text-teal hover:underline">← Painel</Link>
          <p className="mt-5 text-sm font-semibold uppercase tracking-[0.2em] text-teal">Catálogo</p>
          <h1 className="mt-2 text-3xl font-bold text-navy">Linhas de produto</h1>
          <p className="mt-3 max-w-2xl text-text-dark/70">Crie e publique as páginas de cada linha atendida pela Texas Uniformes.</p>
        </div>
        <Link href="/admin/linhas-de-produto/nova" className="rounded-lg bg-navy px-4 py-2.5 text-sm font-semibold text-white hover:bg-navy/90">Nova linha</Link>
      </div>

      {success && <p className="mt-6 rounded-lg bg-teal/10 px-4 py-3 text-sm font-medium text-teal">Alteração realizada com sucesso.</p>}

      <div className="mt-8 overflow-hidden rounded-xl border border-black/5 bg-white shadow-sm">
        {(segments?.length ?? 0) === 0 ? (
          <p className="p-6 text-text-dark/70">Nenhuma linha cadastrada ainda.</p>
        ) : (
          <div className="divide-y divide-black/5">
            {segments?.map((segment: { id: string; title: string; slug: string; position: number; is_published: boolean }) => (
              <Link key={segment.id} href={`/admin/linhas-de-produto/${segment.id}`} className="flex items-center justify-between gap-4 p-5 hover:bg-light-bg/70">
                <div>
                  <h2 className="font-bold text-navy">{segment.title}</h2>
                  <p className="mt-1 text-sm text-text-dark/65">/{segment.slug} · ordem {segment.position}</p>
                </div>
                <span className={`rounded-full px-3 py-1 text-xs font-semibold ${segment.is_published ? "bg-teal/10 text-teal" : "bg-black/5 text-text-dark/60"}`}>
                  {segment.is_published ? "Publicado" : "Rascunho"}
                </span>
              </Link>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
