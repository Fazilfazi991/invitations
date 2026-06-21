create extension if not exists pgcrypto;

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  name text not null default '',
  email text not null default '',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.event_drafts (
  owner_id uuid primary key references auth.users(id) on delete cascade,
  data jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

create table if not exists public.events (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references auth.users(id) on delete cascade,
  slug text not null unique,
  status text not null default 'published' check (status in ('draft', 'published')),
  event_type text not null,
  title text not null,
  date date,
  time time,
  theme text not null default 'blush',
  template_id text not null,
  template_name text not null,
  template_image text,
  data jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.guest_memories (
  id uuid primary key default gen_random_uuid(),
  event_id uuid not null references public.events(id) on delete cascade,
  guest_name text not null check (char_length(guest_name) between 1 and 80),
  caption text not null default '' check (char_length(caption) <= 240),
  image_url text not null,
  approved boolean not null default true,
  created_at timestamptz not null default now()
);

create index if not exists events_owner_id_idx on public.events(owner_id);
create index if not exists events_slug_idx on public.events(slug);
create index if not exists guest_memories_event_id_idx on public.guest_memories(event_id);

alter table public.profiles enable row level security;
alter table public.event_drafts enable row level security;
alter table public.events enable row level security;
alter table public.guest_memories enable row level security;

drop policy if exists "profiles_select_own" on public.profiles;
create policy "profiles_select_own" on public.profiles for select using (auth.uid() = id);
drop policy if exists "profiles_update_own" on public.profiles;
create policy "profiles_update_own" on public.profiles for update using (auth.uid() = id) with check (auth.uid() = id);

drop policy if exists "drafts_manage_own" on public.event_drafts;
create policy "drafts_manage_own" on public.event_drafts for all using (auth.uid() = owner_id) with check (auth.uid() = owner_id);

drop policy if exists "events_public_read_published" on public.events;
create policy "events_public_read_published" on public.events for select using (status = 'published' or auth.uid() = owner_id);
drop policy if exists "events_insert_own" on public.events;
create policy "events_insert_own" on public.events for insert with check (auth.uid() = owner_id);
drop policy if exists "events_update_own" on public.events;
create policy "events_update_own" on public.events for update using (auth.uid() = owner_id) with check (auth.uid() = owner_id);
drop policy if exists "events_delete_own" on public.events;
create policy "events_delete_own" on public.events for delete using (auth.uid() = owner_id);

drop policy if exists "guest_memories_public_read" on public.guest_memories;
create policy "guest_memories_public_read" on public.guest_memories for select using (approved = true);
drop policy if exists "guest_memories_public_insert" on public.guest_memories;
create policy "guest_memories_public_insert" on public.guest_memories for insert with check (
  approved = true
  and exists (
    select 1 from public.events
    where events.id = guest_memories.event_id
      and events.status = 'published'
  )
);
drop policy if exists "guest_memories_owner_manage" on public.guest_memories;
create policy "guest_memories_owner_manage" on public.guest_memories for all using (
  exists (
    select 1 from public.events
    where events.id = guest_memories.event_id
      and events.owner_id = auth.uid()
  )
) with check (
  exists (
    select 1 from public.events
    where events.id = guest_memories.event_id
      and events.owner_id = auth.uid()
  )
);

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('guest-memories', 'guest-memories', true, 5242880, array['image/jpeg', 'image/png', 'image/webp'])
on conflict (id) do update set
  public = excluded.public,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;

drop policy if exists "guest_memory_images_public_read" on storage.objects;
create policy "guest_memory_images_public_read" on storage.objects for select using (bucket_id = 'guest-memories');
drop policy if exists "guest_memory_images_public_upload" on storage.objects;
create policy "guest_memory_images_public_upload" on storage.objects for insert with check (
  bucket_id = 'guest-memories'
  and (storage.foldername(name))[1] in (
    select slug from public.events where status = 'published'
  )
);
drop policy if exists "guest_memory_images_owner_delete" on storage.objects;
create policy "guest_memory_images_owner_delete" on storage.objects for delete using (
  bucket_id = 'guest-memories'
  and (storage.foldername(name))[1] in (
    select slug from public.events where owner_id = auth.uid()
  )
);

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, name, email)
  values (new.id, coalesce(new.raw_user_meta_data ->> 'name', ''), coalesce(new.email, ''))
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
