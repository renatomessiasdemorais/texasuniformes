"use server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireContentManager } from "@/lib/supabase/admin";
import { createSupabaseServerClient } from "@/lib/supabase/server";
const allowed = new Set(["image/jpeg", "image/png", "image/webp"]);
const maxFilesPerUpload = 5;
const maxFileSize = 5 * 1024 * 1024;

export async function uploadMediaAction(formData: FormData) {
  await requireContentManager();
  const files = formData.getAll("files").filter((item): item is File => item instanceof File && item.size > 0);

  if (!files.length || files.length > maxFilesPerUpload || files.some((file) => !allowed.has(file.type) || file.size > maxFileSize)) {
    redirect("/admin/imagens?error=arquivo");
  }

  const supabase = await createSupabaseServerClient();
  const uploads = await Promise.all(files.map(async (file) => {
    const safeName = file.name.toLowerCase().replace(/[^a-z0-9._-]/g, "-");
    const path = `uploads/${Date.now()}-${crypto.randomUUID()}-${safeName}`;
    return supabase.storage.from("site-media").upload(path, Buffer.from(await file.arrayBuffer()), { contentType: file.type, upsert: false });
  }));

  if (uploads.some(({ error }) => error)) redirect("/admin/imagens?error=upload");

  revalidatePath("/admin/imagens");
  redirect(`/admin/imagens?success=upload&count=${files.length}`);
}
export async function deleteMediaAction(f: FormData) { await requireContentManager(); const path=String(f.get("path")??""); if(path.startsWith("uploads/")){const s=await createSupabaseServerClient();await s.storage.from("site-media").remove([path]);} revalidatePath("/admin/imagens");redirect("/admin/imagens?success=excluido"); }
