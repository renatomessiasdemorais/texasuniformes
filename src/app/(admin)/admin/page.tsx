import Link from "next/link";
import { Building2, CircleHelp, Image, PackageOpen, Settings2, UsersRound } from "lucide-react";

const sections = [
  { title: "Configurações", description: "Contato, redes sociais e destaque da home.", icon: Settings2, href: "/admin/configuracoes" },
  { title: "Linhas de produto", description: "Páginas, benefícios, FAQs e galerias.", icon: PackageOpen, href: "/admin/linhas-de-produto" },
  { title: "Clientes", description: "Logos das empresas atendidas.", icon: Building2, href: "/admin/clientes" },
  { title: "Perguntas frequentes", description: "Dúvidas gerais e por segmento.", icon: CircleHelp, href: "/admin/perguntas-frequentes" },
  { title: "Biblioteca de imagens", description: "Envie e reutilize fotos no site.", icon: Image, href: "/admin/imagens" },
  { title: "Depoimentos", description: "Avaliações e casos de clientes.", icon: UsersRound, href: "/admin/depoimentos" },
];

export default function AdminDashboardPage() {
  return (
    <main className="mx-auto max-w-7xl px-6 py-10 lg:px-8">
      <p className="text-sm font-semibold uppercase tracking-[0.2em] text-teal">Painel de conteúdo</p>
      <h1 className="mt-2 text-3xl font-bold text-navy">Gerencie o site em um só lugar</h1>
      <p className="mt-3 max-w-2xl leading-7 text-text-dark/70">
        A base de dados, permissões e armazenamento de imagens já estão conectados ao Supabase.
        Os módulos abaixo serão liberados nesta área administrativa.
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {sections.map(({ title, description, icon: Icon, href }) => (
          <article key={title} className="rounded-xl border border-black/5 bg-white p-6 shadow-sm">
            <Icon className="text-teal" size={26} />
            <h2 className="mt-5 text-lg font-bold text-navy">{title}</h2>
            <p className="mt-2 text-sm leading-6 text-text-dark/70">{description}</p>
            {href ? <Link href={href} className="mt-5 inline-block text-sm font-semibold text-teal hover:underline">Gerenciar →</Link> : <span className="mt-5 inline-block rounded-full bg-light-bg px-3 py-1 text-xs font-medium text-text-dark/60">Em breve</span>}
          </article>
        ))}
      </div>

      <Link href="/" className="mt-8 inline-block text-sm font-semibold text-teal hover:underline">
        Ver site público →
      </Link>
    </main>
  );
}
