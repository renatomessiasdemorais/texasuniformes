import type { Metadata } from "next";
import { LockKeyhole } from "lucide-react";
import { updatePasswordAction } from "./actions";

export const metadata: Metadata = { title: "Redefinir senha | Texas Uniformes" };

const errors: Record<string, string> = {
  "senha-curta": "Use uma senha com ao menos 6 caracteres.",
  "senhas-diferentes": "As senhas informadas não coincidem.",
  "atualizacao-falhou": "Não foi possível atualizar a senha. Solicite um novo link.",
};

export default async function ResetPasswordPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;

  return (
    <main className="grid min-h-screen place-items-center bg-light-bg p-6">
      <section className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl shadow-navy/10">
        <div className="flex size-12 items-center justify-center rounded-xl bg-navy text-teal">
          <LockKeyhole size={24} />
        </div>
        <p className="mt-6 text-sm font-semibold uppercase tracking-[0.2em] text-teal">
          Texas Uniformes
        </p>
        <h1 className="mt-2 text-3xl font-bold text-navy">Redefinir senha</h1>
        <p className="mt-3 text-sm leading-6 text-text-dark/70">
          Defina uma nova senha para acessar a área administrativa.
        </p>

        {error && errors[error] && (
          <p className="mt-5 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">
            {errors[error]}
          </p>
        )}

        <form action={updatePasswordAction} className="mt-7 space-y-4">
          <label className="block text-sm font-medium text-navy">
            Nova senha
            <input name="password" type="password" autoComplete="new-password" required minLength={6} className="mt-1.5 w-full rounded-lg border border-black/10 px-4 py-3 text-text-dark outline-none transition focus:border-teal focus:ring-2 focus:ring-teal/20" />
          </label>
          <label className="block text-sm font-medium text-navy">
            Confirmar nova senha
            <input name="confirmation" type="password" autoComplete="new-password" required minLength={6} className="mt-1.5 w-full rounded-lg border border-black/10 px-4 py-3 text-text-dark outline-none transition focus:border-teal focus:ring-2 focus:ring-teal/20" />
          </label>
          <button type="submit" className="w-full rounded-lg bg-teal px-4 py-3 font-semibold text-white transition hover:bg-teal/90">
            Atualizar senha
          </button>
        </form>
      </section>
    </main>
  );
}
