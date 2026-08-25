"use server";

import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export async function updatePasswordAction(formData: FormData) {
  const password = String(formData.get("password") ?? "");
  const confirmation = String(formData.get("confirmation") ?? "");

  if (password.length < 6) redirect("/admin/redefinir-senha?error=senha-curta");
  if (password !== confirmation) redirect("/admin/redefinir-senha?error=senhas-diferentes");

  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/admin/login?error=link-invalido");

  const { error } = await supabase.auth.updateUser({ password });
  if (error) redirect("/admin/redefinir-senha?error=atualizacao-falhou");

  await supabase.auth.signOut();
  redirect("/admin/login?message=senha-atualizada");
}
