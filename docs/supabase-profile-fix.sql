alter table if exists public.profiles
  add column if not exists user_id uuid,
  add column if not exists name text,
  add column if not exists city text default '',
  add column if not exists languages text[] default '{}',
  add column if not exists interests text[] default '{}',
  add column if not exists looking_for text[] default '{}',
  add column if not exists about text default '',
  add column if not exists photo_url text,
  add column if not exists created_at timestamptz default timezone('utc', now());

alter table if exists public.profiles
  alter column city set default '',
  alter column languages set default '{}',
  alter column interests set default '{}',
  alter column looking_for set default '{}',
  alter column about set default '',
  alter column created_at set default timezone('utc', now());

alter table if exists public.profiles enable row level security;
