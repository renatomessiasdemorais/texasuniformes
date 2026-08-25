"use server";

import { revalidatePath, revalidateTag } from "next/cache";
import { redirect } from "next/navigation";
import { requireContentManager } from "@/lib/supabase/admin";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { SITE_CONTENT_TAG } from "@/lib/content";

function readText(formData: FormData, name: string) {
  return String(formData.get(name) ?? "").trim();
}

const allowedImageTypes = new Set(["image/jpeg", "image/png", "image/webp"]);
const maxGalleryFilesPerSave = 5;
const maxImageSize = 5 * 1024 * 1024;

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

  const galleryFiles = formData
    .getAll("gallery_files")
    .filter((item): item is File => item instanceof File && item.size > 0);
  if (galleryFiles.length > maxGalleryFilesPerSave || galleryFiles.some((file) => !allowedImageTypes.has(file.type) || file.size > maxImageSize)) {
    redirect(`/admin/linhas-de-produto${id ? `/${id}` : "/nova"}?error=imagens`);
  }

  const result = id
    ? await supabase.from("segments").update(payload).eq("id", id).select("id").single()
    : await supabase.from("segments").insert(payload).select("id").single();

  if (result.error || !result.data) {
    redirect(`/admin/linhas-de-produto${id ? `/${id}` : "/nova"}?error=salvar`);
  }

  const segmentId = result.data.id;
  const removeIds = formData.getAll("remove_gallery_image").map(String).filter(Boolean);
  if (removeIds.length) {
    await supabase.from("segment_gallery_images").delete().eq("segment_id", segmentId).in("id", removeIds);
  }

  const urls = readText(formData, "gallery_urls").split(/\r?\n/).map((url) => url.trim()).filter(Boolean);
  const uploadedPaths = await Promise.all(galleryFiles.map(async (file) => {
    const safeName = file.name.toLowerCase().replace(/[^a-z0-9._-]/g, "-");
    const path = `uploads/${Date.now()}-${crypto.randomUUID()}-${safeName}`;
    const { error } = await supabase.storage.from("site-media").upload(path, Buffer.from(await file.arrayBuffer()), { contentType: file.type, upsert: false });
    return error ? null : supabase.storage.from("site-media").getPublicUrl(path).data.publicUrl;
  }));

  if (uploadedPaths.some((path) => path === null)) {
    redirect(`/admin/linhas-de-produto/${segmentId}?error=upload`);
  }

  const imagePaths = [...urls, ...uploadedPaths.filter((path): path is string => Boolean(path))];
  if (imagePaths.length) {
    const { data: lastImage } = await supabase
      .from("segment_gallery_images")
      .select("position")
      .eq("segment_id", segmentId)
      .order("position", { ascending: false })
      .limit(1)
      .maybeSingle();
    const startPosition = (lastImage?.position ?? 0) + 1;
    const { error: galleryError } = await supabase.from("segment_gallery_images").insert(
      imagePaths.map((image_path, index) => ({
        segment_id: segmentId,
        image_path,
        alt: `${payload.title} — Texas Uniformes`,
        position: startPosition + index,
      })),
    );
    if (galleryError) redirect(`/admin/linhas-de-produto/${segmentId}?error=salvar`);
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

  if (readText(formData, "confirmation") !== "EXCLUIR") {
    redirect(`/admin/linhas-de-produto/${id}?error=confirmar-exclusao`);
  }

  if (id) await supabase.from("segments").delete().eq("id", id);

  revalidateTag(SITE_CONTENT_TAG, "max");
  revalidatePath("/", "layout");
  revalidatePath("/admin/linhas-de-produto");
  redirect("/admin/linhas-de-produto?success=excluido");
}
