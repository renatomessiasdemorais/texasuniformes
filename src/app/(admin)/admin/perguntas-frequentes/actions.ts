"use server";
import { revalidatePath, revalidateTag } from "next/cache";
import { redirect } from "next/navigation";
import { SITE_CONTENT_TAG } from "@/lib/content";
import { requireContentManager } from "@/lib/supabase/admin";
import { createSupabaseServerClient } from "@/lib/supabase/server";
const text = (f: FormData, key: string) => String(f.get(key) ?? "").trim();
export async function saveFaqAction(f: FormData) { await requireContentManager(); const s = await createSupabaseServerClient(); const id = text(f,"id"); const segment = text(f,"segment_id"); const payload = { segment_id: segment || null, question: text(f,"question"), answer: text(f,"answer"), position: Number(f.get("position") ?? 0) || 0, is_published: f.get("is_published") === "on" }; if (!payload.question || !payload.answer) redirect("/admin/perguntas-frequentes?error=campos"); const { error } = id ? await s.from("faq_items").update(payload).eq("id",id) : await s.from("faq_items").insert(payload); if (error) redirect("/admin/perguntas-frequentes?error=salvar"); revalidateTag(SITE_CONTENT_TAG,"max"); revalidatePath("/","layout"); redirect("/admin/perguntas-frequentes?success=salvo"); }
export async function deleteFaqAction(f: FormData) { await requireContentManager(); const s = await createSupabaseServerClient(); await s.from("faq_items").delete().eq("id",text(f,"id")); revalidateTag(SITE_CONTENT_TAG,"max"); revalidatePath("/","layout"); redirect("/admin/perguntas-frequentes?success=excluido"); }
