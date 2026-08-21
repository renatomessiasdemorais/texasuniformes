"use server";

import { revalidatePath, revalidateTag } from "next/cache";
import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { SITE_CONTENT_TAG } from "@/lib/content";

export async function saveSiteSettingsAction(formData: FormData) {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/admin/login");

  const value = (name: string) => String(formData.get(name) ?? "").trim();
  const { error } = await supabase.from("site_settings").upsert({
    id: true,
    phone: value("phone"),
    whatsapp: value("whatsapp"),
    whatsapp_message: value("whatsapp_message"),
    email: value("email"),
    address_line1: value("address_line1"),
    address_line2: value("address_line2"),
    map_url: value("map_url") || null,
    instagram_url: value("instagram_url") || null,
    facebook_url: value("facebook_url") || null,
    linkedin_url: value("linkedin_url") || null,
    home_hero_headline: value("home_hero_headline"),
    home_hero_subheadline: value("home_hero_subheadline"),
    home_hero_image_path: value("home_hero_image_path") || null,
    home_hero_image_alt: value("home_hero_image_alt"),
    updated_by: user.id,
  });

  if (error) redirect("/admin/configuracoes?error=salvar");

  revalidateTag(SITE_CONTENT_TAG, "max");
  revalidatePath("/", "layout");
  revalidatePath("/admin/configuracoes");
  redirect("/admin/configuracoes?success=1");
}
