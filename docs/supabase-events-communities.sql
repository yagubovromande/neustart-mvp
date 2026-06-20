create extension if not exists "pgcrypto";

create table if not exists public.communities (
  id uuid primary key default gen_random_uuid()
);

alter table public.communities add column if not exists name text;
alter table public.communities add column if not exists slug text;
alter table public.communities add column if not exists description text default '';
alter table public.communities add column if not exists city text default '';
alter table public.communities add column if not exists language text default '';
alter table public.communities add column if not exists category text default '';
alter table public.communities add column if not exists cover_url text;
alter table public.communities add column if not exists created_by uuid references auth.users (id) on delete set null;
alter table public.communities add column if not exists created_at timestamptz not null default timezone('utc', now());
alter table public.communities add column if not exists updated_at timestamptz not null default timezone('utc', now());

do $$
begin
  if exists (
    select 1
    from information_schema.columns
    where table_schema = 'public'
      and table_name = 'communities'
      and column_name = 'title'
  ) then
    execute $sql$
      update public.communities
      set name = coalesce(nullif(name, ''), nullif(title, ''), 'Community')
    $sql$;
  else
    update public.communities
    set name = coalesce(nullif(name, ''), 'Community');
  end if;
end
$$;

update public.communities
set description = coalesce(description, ''),
    city = coalesce(city, ''),
    language = coalesce(language, ''),
    category = coalesce(category, ''),
    created_at = coalesce(created_at, timezone('utc', now())),
    updated_at = coalesce(updated_at, timezone('utc', now()));

update public.communities
set slug = lower(
  regexp_replace(
    coalesce(nullif(name, ''), 'community') || '-' || left(id::text, 8),
    '[^a-zA-Z0-9]+',
    '-',
    'g'
  )
)
where slug is null or btrim(slug) = '';

alter table public.communities alter column name set default 'Community';
create unique index if not exists communities_slug_idx on public.communities (slug);

create table if not exists public.community_members (
  id uuid primary key default gen_random_uuid(),
  community_id uuid not null references public.communities (id) on delete cascade,
  user_id uuid not null references auth.users (id) on delete cascade,
  role text not null default 'member',
  joined_at timestamptz not null default timezone('utc', now())
);

alter table public.community_members add column if not exists community_id uuid references public.communities (id) on delete cascade;
alter table public.community_members add column if not exists user_id uuid references auth.users (id) on delete cascade;
alter table public.community_members add column if not exists role text not null default 'member';
alter table public.community_members add column if not exists joined_at timestamptz not null default timezone('utc', now());

create unique index if not exists community_members_community_user_idx
  on public.community_members (community_id, user_id);

create table if not exists public.events (
  id uuid primary key default gen_random_uuid(),
  community_id uuid references public.communities (id) on delete set null,
  title text not null,
  description text default '',
  city text default '',
  address text default '',
  online_url text,
  organizer text default '',
  starts_at timestamptz not null,
  ends_at timestamptz,
  cover_url text,
  capacity integer,
  category text default '',
  language text default '',
  visibility text not null default 'public',
  created_by uuid references auth.users (id) on delete set null,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

alter table public.events add column if not exists community_id uuid references public.communities (id) on delete set null;
alter table public.events add column if not exists title text;
alter table public.events add column if not exists description text default '';
alter table public.events add column if not exists city text default '';
alter table public.events add column if not exists address text default '';
alter table public.events add column if not exists online_url text;
alter table public.events add column if not exists organizer text default '';
alter table public.events add column if not exists starts_at timestamptz;
alter table public.events add column if not exists ends_at timestamptz;
alter table public.events add column if not exists cover_url text;
alter table public.events add column if not exists capacity integer;
alter table public.events add column if not exists category text default '';
alter table public.events add column if not exists language text default '';
alter table public.events add column if not exists visibility text not null default 'public';
alter table public.events add column if not exists created_by uuid references auth.users (id) on delete set null;
alter table public.events add column if not exists created_at timestamptz not null default timezone('utc', now());
alter table public.events add column if not exists updated_at timestamptz not null default timezone('utc', now());

update public.events
set description = coalesce(description, ''),
    city = coalesce(city, ''),
    address = coalesce(address, ''),
    organizer = coalesce(organizer, ''),
    category = coalesce(category, ''),
    language = coalesce(language, ''),
    visibility = coalesce(nullif(visibility, ''), 'public'),
    created_at = coalesce(created_at, timezone('utc', now())),
    updated_at = coalesce(updated_at, timezone('utc', now()));

create table if not exists public.event_rsvps (
  id uuid primary key default gen_random_uuid(),
  event_id uuid not null references public.events (id) on delete cascade,
  user_id uuid not null references auth.users (id) on delete cascade,
  status text not null default 'going',
  created_at timestamptz not null default timezone('utc', now())
);

alter table public.event_rsvps add column if not exists event_id uuid references public.events (id) on delete cascade;
alter table public.event_rsvps add column if not exists user_id uuid references auth.users (id) on delete cascade;
alter table public.event_rsvps add column if not exists status text not null default 'going';
alter table public.event_rsvps add column if not exists created_at timestamptz not null default timezone('utc', now());

create unique index if not exists event_rsvps_event_user_idx
  on public.event_rsvps (event_id, user_id);

grant usage on schema public to authenticated;
grant select on public.communities to authenticated;
grant select on public.community_members to authenticated;
grant insert, update, delete on public.community_members to authenticated;
grant select on public.events to authenticated;
grant select on public.event_rsvps to authenticated;
grant insert, update, delete on public.event_rsvps to authenticated;

alter table public.communities enable row level security;
alter table public.community_members enable row level security;
alter table public.events enable row level security;
alter table public.event_rsvps enable row level security;

drop policy if exists "Authenticated users can read communities" on public.communities;
create policy "Authenticated users can read communities"
on public.communities
for select
to authenticated
using (true);

drop policy if exists "Authenticated users can read public community memberships" on public.community_members;
create policy "Authenticated users can read public community memberships"
on public.community_members
for select
to authenticated
using (
  exists (
    select 1
    from public.communities communities
    where communities.id = community_members.community_id
  )
);

drop policy if exists "Users can join communities" on public.community_members;
create policy "Users can join communities"
on public.community_members
for insert
to authenticated
with check (auth.uid() = user_id);

drop policy if exists "Users can update own community membership" on public.community_members;
create policy "Users can update own community membership"
on public.community_members
for update
to authenticated
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

drop policy if exists "Users can leave own communities" on public.community_members;
create policy "Users can leave own communities"
on public.community_members
for delete
to authenticated
using (auth.uid() = user_id);

drop policy if exists "Authenticated users can read public events" on public.events;
create policy "Authenticated users can read public events"
on public.events
for select
to authenticated
using (visibility = 'public');

drop policy if exists "Authenticated users can read public event rsvps" on public.event_rsvps;
create policy "Authenticated users can read public event rsvps"
on public.event_rsvps
for select
to authenticated
using (
  exists (
    select 1
    from public.events events
    where events.id = event_rsvps.event_id
      and events.visibility = 'public'
  )
);

drop policy if exists "Users can RSVP public events" on public.event_rsvps;
create policy "Users can RSVP public events"
on public.event_rsvps
for insert
to authenticated
with check (
  auth.uid() = user_id
  and exists (
    select 1
    from public.events events
    where events.id = event_rsvps.event_id
      and events.visibility = 'public'
  )
);

drop policy if exists "Users can update own RSVP" on public.event_rsvps;
create policy "Users can update own RSVP"
on public.event_rsvps
for update
to authenticated
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

drop policy if exists "Users can delete own RSVP" on public.event_rsvps;
create policy "Users can delete own RSVP"
on public.event_rsvps
for delete
to authenticated
using (auth.uid() = user_id);
