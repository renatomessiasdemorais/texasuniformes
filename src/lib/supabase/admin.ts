import "server-only";
import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "./server";

export type AdminProfile = {
  id: string;
  display_name: string | null;
  role: "admin" | "editor" | "viewer";
};

export async function requireContentManager(): Promise<AdminProfile> {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/admin/login");

  const { data: profile } = await supabase
    .from("profiles")
    .select("id, display_name, role")
    .eq("id", user.id)
    .maybeSingle();

  if (!profile || (profile.role !== "admin" && profile.role !== "editor")) {
    redirect("/admin/login?error=sem-permissao");
  }

  return profile as AdminProfile;
}
