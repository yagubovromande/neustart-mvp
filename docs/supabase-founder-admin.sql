alter table if exists public.profiles
  add column if not exists role text not null default 'user';

update public.profiles
set role = 'user'
where role is null or btrim(role) = '';

do $$
begin
  if not exists (
    select 1
    from pg_constraint
    where conname = 'profiles_role_check'
      and conrelid = 'public.profiles'::regclass
  ) then
    alter table public.profiles
      add constraint profiles_role_check
      check (role in ('user', 'manager', 'admin', 'founder'));
  end if;
end
$$;

alter table if exists public.profiles enable row level security;

drop policy if exists "Users can update own profile" on public.profiles;
drop policy if exists "Founders can update all profiles" on public.profiles;

create policy "Users can update own profile"
on public.profiles
for update
to authenticated
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

create policy "Founders can update all profiles"
on public.profiles
for update
to authenticated
using (
  exists (
    select 1
    from public.profiles founder_profile
    where founder_profile.user_id = auth.uid()
      and founder_profile.role = 'founder'
  )
)
with check (
  exists (
    select 1
    from public.profiles founder_profile
    where founder_profile.user_id = auth.uid()
      and founder_profile.role = 'founder'
  )
);

-- Manually set Roman as founder after you know his Supabase auth user id:
-- update public.profiles
-- set role = 'founder'
-- where user_id = 'PASTE_ROMAN_USER_ID_HERE';
