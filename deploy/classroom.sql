-- Run in your private Supabase project SQL editor. No client/public access.
create table if not exists public.learning_daily (
 user_id text not null check (user_id ~ '^[a-zA-Z0-9][a-zA-Z0-9_-]{0,39}$'),
 day date not null,
 summary jsonb not null,
 updated_at timestamptz not null default now(),
 primary key(user_id,day)
);
alter table public.learning_daily enable row level security;
revoke all on public.learning_daily from anon, authenticated;
grant select, insert, update on public.learning_daily to service_role;
