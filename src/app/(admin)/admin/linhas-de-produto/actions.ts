"use server";

import { revalidatePath, revalidateTag } from "next/cache";
import { redirect } from "next/navigation";
import { requireContentManager } from "@/lib/supabase/admin";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { SITE_CONTENT_TAG } from "@/lib/content";

function readText(formData: FormData, name: string) {
  return String(formData.get(name) ?? "").trim();
}

export async function saveSegmentAction(formData: FormData) {
  await requireContentManager();
  const supabase = await createSupabaseServerClient();
  const id = readText(formData, "id");
  const slug = readText(formData, "slug").toLowerCase();

  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) {
    redirect(`/admin/linhas-de-produto${id ? `/${id}` : "/nova"}?error=slug`);
  }

  const payload = {
    slug,
    title: readText(formData, "title"),
    short_name: readText(formData, "short_name"),
    hero_headline: readText(formData, "hero_headline"),
    hero_subheadline: readText(formData, "hero_subheadline") || null,
    hero_image_path: readText(formData, "hero_image_path") || null,
    hero_image_alt: readText(formData, "hero_image_alt"),
    category_image_path: readText(formData, "category_image_path") || null,
    category_image_alt: readText(formData, "category_image_alt"),
    intro: readText(formData, "intro") || null,
    position: Number(formData.get("position") ?? 0) || 0,
    is_published: formData.get("is_published") === "on",
  };

  if (!payload.title || !payload.short_name || !payload.hero_headline) {
    redirect(`/admin/linhas-de-produto${id ? `/${id}` : "/nova"}?error=campos`);
  }

  const result = id
    ? await supabase.from("segments").update(payload).eq("id", id).select("id").single()
    : await supabase.from("segments").insert(payload).select("id").single();

  if (result.error || !result.data) {
    redirect(`/admin/linhas-de-produto${id ? `/${id}` : "/nova"}?error=salvar`);
  }

  revalidateTag(SITE_CONTENT_TAG, "max");
  revalidatePath("/", "layout");
  revalidatePath("/admin/linhas-de-produto");
  redirect(`/admin/linhas-de-produto/${result.data.id}?success=salvo`);
}

export async function deleteSegmentAction(formData: FormData) {
  await requireContentManager();
  const supabase = await createSupabaseServerClient();
  const id = readText(formData, "id");

  if (id) await supabase.from("segments").delete().eq("id", id);

  revalidateTag(SITE_CONTENT_TAG, "max");
  revalidatePath("/", "layout");
  revalidatePath("/admin/linhas-de-produto");
  redirect("/admin/linhas-de-produto?success=excluido");
}
