create extension if not exists "pgcrypto";

create type public.user_role as enum ('admin', 'editor', 'viewer');

create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  role public.user_role not null default 'viewer',
  display_name text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
set search_path = public
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create or replace function public.has_content_access()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.profiles
    where id = auth.uid()
      and role in ('admin', 'editor')
  );
$$;

create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.profiles
    where id = auth.uid()
      and role = 'admin'
  );
$$;

create table public.site_settings (
  id boolean primary key default true check (id),
  phone text not null default '',
  whatsapp text not null default '',
  whatsapp_message text not null default '',
  email text not null default '',
  address_line1 text not null default '',
  address_line2 text not null default '',
  map_url text,
  instagram_url text,
  facebook_url text,
  linkedin_url text,
  home_hero_headline text not null default '',
  home_hero_subheadline text not null default '',
  home_hero_image_path text,
  home_hero_image_alt text not null default '',
  updated_at timestamptz not null default now(),
  updated_by uuid references auth.users(id) on delete set null
);

create table public.segments (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique check (slug ~ '^[a-z0-9]+(?:-[a-z0-9]+)*$'),
  title text not null,
  short_name text not null,
  hero_headline text not null,
  hero_subheadline text,
  hero_image_path text,
  hero_image_alt text not null default '',
  category_image_path text,
  category_image_alt text not null default '',
  intro text,
  position integer not null default 0,
  is_published boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.segment_benefits (
  id uuid primary key default gen_random_uuid(),
  segment_id uuid not null references public.segments(id) on delete cascade,
  icon text not null,
  title text not null,
  description text not null,
  position integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (segment_id, position)
);

create table public.segment_gallery_images (
  id uuid primary key default gen_random_uuid(),
  segment_id uuid not null references public.segments(id) on delete cascade,
  image_path text not null,
  alt text not null default '',
  position integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (segment_id, position)
);

create table public.faq_items (
  id uuid primary key default gen_random_uuid(),
  segment_id uuid references public.segments(id) on delete cascade,
  question text not null,
  answer text not null,
  position integer not null default 0,
  is_published boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.client_logos (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  logo_path text not null,
  alt text not null default '',
  position integer not null default 0,
  is_published boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (position)
);

create table public.testimonials (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  company text not null,
  quote text not null,
  avatar_path text,
  avatar_alt text not null default '',
  position integer not null default 0,
  is_published boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (position)
);

create table public.site_benefits (
  id uuid primary key default gen_random_uuid(),
  icon text not null,
  title text not null,
  description text not null,
  position integer not null default 0,
  is_published boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (position)
);

create table public.process_steps (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text not null,
  position integer not null default 0,
  is_published boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (position)
);

create index segments_public_position_idx on public.segments (position) where is_published;
create index faq_items_segment_position_idx on public.faq_items (segment_id, position) where is_published;
create index client_logos_public_position_idx on public.client_logos (position) where is_published;

create trigger profiles_set_updated_at before update on public.profiles
for each row execute function public.set_updated_at();
create trigger site_settings_set_updated_at before update on public.site_settings
for each row execute function public.set_updated_at();
create trigger segments_set_updated_at before update on public.segments
for each row execute function public.set_updated_at();
create trigger segment_benefits_set_updated_at before update on public.segment_benefits
for each row execute function public.set_updated_at();
create trigger segment_gallery_images_set_updated_at before update on public.segment_gallery_images
for each row execute function public.set_updated_at();
create trigger faq_items_set_updated_at before update on public.faq_items
for each row execute function public.set_updated_at();
create trigger client_logos_set_updated_at before update on public.client_logos
for each row execute function public.set_updated_at();
create trigger testimonials_set_updated_at before update on public.testimonials
for each row execute function public.set_updated_at();
create trigger site_benefits_set_updated_at before update on public.site_benefits
for each row execute function public.set_updated_at();
create trigger process_steps_set_updated_at before update on public.process_steps
for each row execute function public.set_updated_at();

alter table public.profiles enable row level security;
alter table public.site_settings enable row level security;
alter table public.segments enable row level security;
alter table public.segment_benefits enable row level security;
alter table public.segment_gallery_images enable row level security;
alter table public.faq_items enable row level security;
alter table public.client_logos enable row level security;
alter table public.testimonials enable row level security;
alter table public.site_benefits enable row level security;
alter table public.process_steps enable row level security;

create policy "Profiles can be read by their owner or an admin"
on public.profiles for select to authenticated
using (id = auth.uid() or public.is_admin());
create policy "Only admins manage profiles"
on public.profiles for all to authenticated
using (public.is_admin()) with check (public.is_admin());

create policy "Public can read site settings"
on public.site_settings for select using (true);
create policy "Content managers can edit site settings"
on public.site_settings for all to authenticated
using (public.has_content_access()) with check (public.has_content_access());

create policy "Public can read published segments"
on public.segments for select
using (is_published or public.has_content_access());
create policy "Content managers can manage segments"
on public.segments for all to authenticated
using (public.has_content_access()) with check (public.has_content_access());

create policy "Public can read benefits of visible segments"
on public.segment_benefits for select
using (exists (select 1 from public.segments s where s.id = segment_id and (s.is_published or public.has_content_access())));
create policy "Content managers can manage segment benefits"
on public.segment_benefits for all to authenticated
using (public.has_content_access()) with check (public.has_content_access());

create policy "Public can read gallery images of visible segments"
on public.segment_gallery_images for select
using (exists (select 1 from public.segments s where s.id = segment_id and (s.is_published or public.has_content_access())));
create policy "Content managers can manage gallery images"
on public.segment_gallery_images for all to authenticated
using (public.has_content_access()) with check (public.has_content_access());

create policy "Public can read published FAQs"
on public.faq_items for select
using (is_published or public.has_content_access());
create policy "Content managers can manage FAQs"
on public.faq_items for all to authenticated
using (public.has_content_access()) with check (public.has_content_access());

create policy "Public can read published client logos"
on public.client_logos for select
using (is_published or public.has_content_access());
create policy "Content managers can manage client logos"
on public.client_logos for all to authenticated
using (public.has_content_access()) with check (public.has_content_access());

create policy "Public can read published testimonials"
on public.testimonials for select
using (is_published or public.has_content_access());
create policy "Content managers can manage testimonials"
on public.testimonials for all to authenticated
using (public.has_content_access()) with check (public.has_content_access());

create policy "Public can read published site benefits"
on public.site_benefits for select
using (is_published or public.has_content_access());
create policy "Content managers can manage site benefits"
on public.site_benefits for all to authenticated
using (public.has_content_access()) with check (public.has_content_access());

create policy "Public can read published process steps"
on public.process_steps for select
using (is_published or public.has_content_access());
create policy "Content managers can manage process steps"
on public.process_steps for all to authenticated
using (public.has_content_access()) with check (public.has_content_access());

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('site-media', 'site-media', true, 5242880, array['image/jpeg', 'image/png', 'image/webp'])
on conflict (id) do update
set public = excluded.public,
    file_size_limit = excluded.file_size_limit,
    allowed_mime_types = excluded.allowed_mime_types;

create policy "Public can read site media"
on storage.objects for select
using (bucket_id = 'site-media');
create policy "Content managers can upload site media"
on storage.objects for insert to authenticated
with check (bucket_id = 'site-media' and public.has_content_access());
create policy "Content managers can update site media"
on storage.objects for update to authenticated
using (bucket_id = 'site-media' and public.has_content_access())
with check (bucket_id = 'site-media' and public.has_content_access());
create policy "Content managers can delete site media"
on storage.objects for delete to authenticated
using (bucket_id = 'site-media' and public.has_content_access());
