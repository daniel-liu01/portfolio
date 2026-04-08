-- Run in Supabase → SQL Editor (new project or fresh database).
create table if not exists public.notes (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  message text not null,
  created_at timestamptz not null default now()
);

create index if not exists notes_created_at_idx on public.notes (created_at desc);

-- Optional: allow read for anon if you switch the app to the anon key later.
-- alter table public.notes enable row level security;
