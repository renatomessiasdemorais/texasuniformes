import Link from "next/link";
import { deleteClientAction, saveClientAction } from "./actions";
import { requireContentManager } from "@/lib/supabase/admin";
import { createSupabaseServerClient } from "@/lib/supabase/server";

type Props = { searchParams: Promise<{ error?: string; success?: string }> };

export default async function ClientsPage({ searchParams }: Props) {
  await requireContentManager();
  const supabase = await createSupabaseServerClient();
  const [{ data: clients }, params] = await Promise.all([supabase.from("client_logos").select("*").order("position"), searchParams]);
  return <main className="mx-auto max-w-5xl px-6 py-10 lg:px-8">
    <Link href="/admin" className="text-sm font-semibold text-teal hover:underline">← Painel</Link>
    <h1 className="mt-5 text-3xl font-bold text-navy">Clientes</h1>
    <p className="mt-2 text-text-dark/70">Cadastre logos que aparecem na faixa de empresas atendidas.</p>
    <Notice error={params.error} success={params.success} />
    <ClientForm />
    <div className="mt-8 space-y-5">{clients?.map((client: any) => <ClientForm key={client.id} client={client} />)}</div>
  </main>;
}

function Notice({ error, success }: { error?: string; success?: string }) { return <>{error && <p className="mt-5 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">Preencha nome e imagem e tente novamente.</p>}{success && <p className="mt-5 rounded-lg bg-teal/10 px-4 py-3 text-sm text-teal">Alteração salva.</p>}</>; }
function ClientForm({ client }: { client?: any }) { return <section className="mt-8 rounded-xl border border-black/5 bg-white p-6 shadow-sm"><form action={saveClientAction} className="grid gap-4 sm:grid-cols-2"><input type="hidden" name="id" value={client?.id ?? ""} /><Field name="name" label="Nome da empresa" value={client?.name} required /><Field name="logo_path" label="URL do logo" value={client?.logo_path} required /><Field name="alt" label="Descrição do logo" value={client?.alt} /><Field name="position" label="Ordem" value={String(client?.position ?? 0)} type="number" /><label className="flex items-center gap-2 text-sm font-medium text-navy"><input name="is_published" type="checkbox" defaultChecked={client?.is_published ?? true} className="size-4 accent-teal" /> Publicar</label><button className="w-fit rounded-lg bg-navy px-4 py-2.5 text-sm font-semibold text-white">{client ? "Salvar" : "Adicionar cliente"}</button></form>{client && <form action={deleteClientAction} className="mt-3"><input type="hidden" name="id" value={client.id} /><button className="text-sm font-semibold text-red-700">Excluir</button></form>}</section>; }
function Field({ name, label, value, required, type = "text" }: { name: string; label: string; value?: string; required?: boolean; type?: string }) { return <label className="block text-sm font-semibold text-navy">{label}<input name={name} type={type} required={required} defaultValue={value ?? ""} className="mt-1.5 w-full rounded-lg border border-black/10 px-3 py-2.5 font-normal text-text-dark" /></label>; }
