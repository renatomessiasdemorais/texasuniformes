alter table public.site_settings
  add column if not exists show_phone boolean not null default true,
  add column if not exists show_email boolean not null default false,
  add column if not exists show_address boolean not null default false,
  add column if not exists show_map boolean not null default false,
  add column if not exists show_instagram boolean not null default false,
  add column if not exists show_facebook boolean not null default false,
  add column if not exists show_linkedin boolean not null default false,
  add column if not exists show_company_page boolean not null default true,
  add column if not exists show_contact_page boolean not null default true,
  add column if not exists show_clients_page boolean not null default true;

update public.site_settings
set
  show_phone = true,
  show_email = false,
  show_address = false,
  show_map = false,
  show_instagram = false,
  show_facebook = false,
  show_linkedin = false,
  show_company_page = true,
  show_contact_page = true,
  show_clients_page = true
where id = true;
