import type { Metadata } from "next";
import { LockKeyhole } from "lucide-react";
import { Suspense } from "react";
import { sendPasswordResetAction, signInAction } from "./actions";

export const metadata: Metadata = { title: "Administração | Texas Uniformes" };

const errors: Record<string, string> = {
  "campos-obrigatorios": "Informe seu e-mail e senha.",
  "credenciais-invalidas": "E-mail ou senha inválidos.",
  "sem-permissao": "Sua conta não possui permissão para acessar o painel.",
  "link-invalido": "O link expirou ou não é válido. Solicite outro link de recuperação.",
};

export default function AdminLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; message?: string }>;
}) {
  return (
    <Suspense fallback={<LoginLoading />}>
      <LoginForm searchParams={searchParams} />
    </Suspense>
  );
}

async function LoginForm({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; message?: string }>;
}) {
  const { error, message } = await searchParams;

  return (
    <main className="grid min-h-screen place-items-center bg-light-bg p-6">
      <section className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl shadow-navy/10">
        <div className="flex size-12 items-center justify-center rounded-xl bg-navy text-teal">
          <LockKeyhole size={24} />
        </div>
        <p className="mt-6 text-sm font-semibold uppercase tracking-[0.2em] text-teal">
          Texas Uniformes
        </p>
        <h1 className="mt-2 text-3xl font-bold text-navy">Área administrativa</h1>
        <p className="mt-3 text-sm leading-6 text-text-dark/70">
          Entre para gerenciar o conteúdo e as imagens do site.
        </p>

        {error && errors[error] && (
          <p className="mt-5 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">
            {errors[error]}
          </p>
        )}

        {message === "recuperacao-enviada" && (
          <p className="mt-5 rounded-lg bg-teal/10 px-4 py-3 text-sm text-teal">
            Se o e-mail estiver cadastrado, enviamos um link seguro para redefinir a senha.
          </p>
        )}

        {message === "senha-atualizada" && (
          <p className="mt-5 rounded-lg bg-teal/10 px-4 py-3 text-sm text-teal">
            Senha atualizada. Entre com as novas credenciais.
          </p>
        )}

        <form action={signInAction} className="mt-7 space-y-4">
          <label className="block text-sm font-medium text-navy">
            E-mail
            <input
              name="email"
              type="email"
              autoComplete="email"
              required
              className="mt-1.5 w-full rounded-lg border border-black/10 px-4 py-3 text-text-dark outline-none transition focus:border-teal focus:ring-2 focus:ring-teal/20"
            />
          </label>
          <label className="block text-sm font-medium text-navy">
            Senha
            <input
              name="password"
              type="password"
              autoComplete="current-password"
              required
              className="mt-1.5 w-full rounded-lg border border-black/10 px-4 py-3 text-text-dark outline-none transition focus:border-teal focus:ring-2 focus:ring-teal/20"
            />
          </label>
          <button
            type="submit"
            className="w-full rounded-lg bg-teal px-4 py-3 font-semibold text-white transition hover:bg-teal/90"
          >
            Entrar no painel
          </button>
        </form>

        <form action={sendPasswordResetAction} className="mt-5 space-y-2 border-t border-black/10 pt-5">
          <label className="block text-sm font-medium text-navy">
            Esqueceu sua senha?
            <input
              name="email"
              type="email"
              autoComplete="email"
              required
              placeholder="Digite seu e-mail para receber o link"
              className="mt-1.5 w-full rounded-lg border border-black/10 px-4 py-3 text-text-dark outline-none transition focus:border-teal focus:ring-2 focus:ring-teal/20"
            />
          </label>
          <button
            type="submit"
            className="text-sm font-semibold text-teal transition hover:underline"
          >
            Enviar link de recuperação
          </button>
        </form>
      </section>
    </main>
  );
}

function LoginLoading() {
  return <main className="min-h-screen bg-light-bg" aria-label="Carregando área administrativa" />;
}
