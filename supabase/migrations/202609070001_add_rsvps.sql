create table if not exists public.rsvps (
  id uuid primary key default gen_random_uuid(),
  event_id uuid not null references public.events(id) on delete cascade,
  guest_name text not null check (char_length(guest_name) between 1 and 100),
  attendance text not null check (attendance in ('attending', 'declined')),
  guest_count integer not null default 1 check (guest_count between 1 and 20),
  message text not null default '' check (char_length(message) <= 500),
  created_at timestamptz not null default now()
);

create index if not exists rsvps_event_id_idx on public.rsvps(event_id);

alter table public.rsvps enable row level security;
revoke all on table public.rsvps from anon, authenticated;
grant insert on table public.rsvps to anon, authenticated;
grant select, delete on table public.rsvps to authenticated;

drop policy if exists "rsvps_public_insert_published" on public.rsvps;
create policy "rsvps_public_insert_published"
on public.rsvps for insert
to anon, authenticated
with check (
  exists (
    select 1 from public.events
    where events.id = rsvps.event_id
      and events.status = 'published'
  )
);

drop policy if exists "rsvps_owner_read" on public.rsvps;
create policy "rsvps_owner_read"
on public.rsvps for select
to authenticated
using (
  exists (
    select 1 from public.events
    where events.id = rsvps.event_id
      and events.owner_id = (select auth.uid())
  )
);

drop policy if exists "rsvps_owner_delete" on public.rsvps;
create policy "rsvps_owner_delete"
on public.rsvps for delete
to authenticated
using (
  exists (
    select 1 from public.events
    where events.id = rsvps.event_id
      and events.owner_id = (select auth.uid())
  )
);
