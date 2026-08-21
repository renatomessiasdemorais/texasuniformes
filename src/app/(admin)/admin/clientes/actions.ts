"use server";

import { revalidatePath, revalidateTag } from "next/cache";
import { redirect } from "next/navigation";
import { SITE_CONTENT_TAG } from "@/lib/content";
import { requireContentManager } from "@/lib/supabase/admin";
import { createSupabaseServerClient } from "@/lib/supabase/server";

const text = (formData: FormData, name: string) => String(formData.get(name) ?? "").trim();

export async function saveClientAction(formData: FormData) {
  await requireContentManager();
  const supabase = await createSupabaseServerClient();
  const id = text(formData, "id");
  const payload = {
    name: text(formData, "name"),
    logo_path: text(formData, "logo_path"),
    alt: text(formData, "alt"),
    position: Number(formData.get("position") ?? 0) || 0,
    is_published: formData.get("is_published") === "on",
  };
  if (!payload.name || !payload.logo_path) redirect("/admin/clientes?error=campos");
  const { error } = id
    ? await supabase.from("client_logos").update(payload).eq("id", id)
    : await supabase.from("client_logos").insert(payload);
  if (error) redirect("/admin/clientes?error=salvar");
  revalidateTag(SITE_CONTENT_TAG, "max");
  revalidatePath("/", "layout");
  redirect("/admin/clientes?success=salvo");
}

export async function deleteClientAction(formData: FormData) {
  await requireContentManager();
  const supabase = await createSupabaseServerClient();
  await supabase.from("client_logos").delete().eq("id", text(formData, "id"));
  revalidateTag(SITE_CONTENT_TAG, "max");
  revalidatePath("/", "layout");
  redirect("/admin/clientes?success=excluido");
}
