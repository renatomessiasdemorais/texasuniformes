"use server";
import { revalidatePath, revalidateTag } from "next/cache";
import { redirect } from "next/navigation";
import { SITE_CONTENT_TAG } from "@/lib/content";
import { requireContentManager } from "@/lib/supabase/admin";
import { createSupabaseServerClient } from "@/lib/supabase/server";
const text = (f: FormData, key: string) => String(f.get(key) ?? "").trim();
export async function saveTestimonialAction(f: FormData) { await requireContentManager(); const s=await createSupabaseServerClient(); const id=text(f,"id"); const payload={name:text(f,"name"),company:text(f,"company"),quote:text(f,"quote"),avatar_path:text(f,"avatar_path")||null,avatar_alt:text(f,"avatar_alt"),position:Number(f.get("position")??0)||0,is_published:f.get("is_published")==="on"}; if(!payload.name||!payload.company||!payload.quote) redirect("/admin/depoimentos?error=campos"); const {error}=id?await s.from("testimonials").update(payload).eq("id",id):await s.from("testimonials").insert(payload); if(error) redirect("/admin/depoimentos?error=salvar"); revalidateTag(SITE_CONTENT_TAG,"max"); revalidatePath("/","layout"); redirect("/admin/depoimentos?success=salvo"); }
export async function deleteTestimonialAction(f: FormData) { await requireContentManager(); const s=await createSupabaseServerClient(); await s.from("testimonials").delete().eq("id",text(f,"id")); revalidateTag(SITE_CONTENT_TAG,"max"); revalidatePath("/","layout"); redirect("/admin/depoimentos?success=excluido"); }
