alter table public.rsvps
  drop constraint if exists rsvps_guest_count_check;

alter table public.rsvps
  add constraint rsvps_guest_count_check
  check (guest_count between 1 and 10) not valid;

alter table public.rsvps
  validate constraint rsvps_guest_count_check;

create index if not exists rsvps_event_created_at_idx
  on public.rsvps (event_id, created_at desc);
