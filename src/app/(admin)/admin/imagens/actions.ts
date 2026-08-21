"use server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireContentManager } from "@/lib/supabase/admin";
import { createSupabaseServerClient } from "@/lib/supabase/server";
const allowed = new Set(["image/jpeg", "image/png", "image/webp"]);
export async function uploadMediaAction(f: FormData) { await requireContentManager(); const file=f.get("file"); if (!(file instanceof File) || !allowed.has(file.type) || file.size>5*1024*1024) redirect("/admin/imagens?error=arquivo"); const s=await createSupabaseServerClient(); const safeName=file.name.toLowerCase().replace(/[^a-z0-9._-]/g,"-"); const path=`uploads/${Date.now()}-${crypto.randomUUID()}-${safeName}`; const {error}=await s.storage.from("site-media").upload(path,Buffer.from(await file.arrayBuffer()),{contentType:file.type,upsert:false}); if(error) redirect("/admin/imagens?error=upload"); redirect("/admin/imagens?success=upload"); }
export async function deleteMediaAction(f: FormData) { await requireContentManager(); const path=String(f.get("path")??""); if(path.startsWith("uploads/")){const s=await createSupabaseServerClient();await s.storage.from("site-media").remove([path]);} revalidatePath("/admin/imagens");redirect("/admin/imagens?success=excluido"); }
