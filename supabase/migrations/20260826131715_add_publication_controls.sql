alter table public.site_settings
  add column if not exists show_contact boolean not null default false,
  add column if not exists show_social_links boolean not null default false,
  add column if not exists show_home_hero boolean not null default true,
  add column if not exists show_client_logos boolean not null default false,
  add column if not exists show_testimonials boolean not null default false,
  add column if not exists show_product_galleries boolean not null default false,
  add column if not exists show_faqs boolean not null default false;

-- Conteúdos que ainda não foram preenchidos permanecem salvos no painel,
-- mas não são exibidos no site público até serem habilitados pelo administrador.
update public.site_settings
set
  show_contact = false,
  show_social_links = false,
  show_client_logos = false,
  show_testimonials = false,
  show_product_galleries = false,
  show_faqs = false
where id = true;
