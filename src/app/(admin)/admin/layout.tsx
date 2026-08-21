import Link from "next/link";
import { LogOut, MonitorCog } from "lucide-react";
import { Suspense } from "react";
import "@/app/globals.css";
import { requireContentManager } from "@/lib/supabase/admin";
import { signOutAction } from "./actions";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body className="min-h-screen bg-light-bg text-text-dark">
        <Suspense fallback={<AdminLoading />}>
          <AdminShell>{children}</AdminShell>
        </Suspense>
      </body>
    </html>
  );
}

async function AdminShell({ children }: { children: React.ReactNode }) {
  const profile = await requireContentManager();

  return (
    <>
      <header className="border-b border-white/10 bg-navy text-white">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 lg:px-8">
          <Link href="/admin" className="flex items-center gap-3 font-bold">
            <span className="grid size-9 place-items-center rounded-lg bg-teal text-navy"><MonitorCog size={20} /></span>
            <span>Texas Uniformes <span className="font-normal text-white/60">| Admin</span></span>
          </Link>
          <div className="flex items-center gap-4 text-sm">
            <span className="hidden text-white/70 sm:inline">{profile.display_name ?? "Administrador"}</span>
            <form action={signOutAction}>
              <button className="inline-flex items-center gap-2 rounded-lg px-3 py-2 text-white/80 transition hover:bg-white/10 hover:text-white">
                <LogOut size={16} /> Sair
              </button>
            </form>
          </div>
        </div>
      </header>
      {children}
    </>
  );
}

function AdminLoading() {
  return <main className="min-h-screen bg-light-bg" aria-label="Carregando painel administrativo" />;
}
