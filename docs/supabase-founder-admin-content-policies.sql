-- Founder/Admin content management policies for communities and events.
-- Review before applying in Supabase SQL Editor.
-- This file does not change schema and does not add new fields.

-- =========================================================
-- REQUIRED: safe edit permissions for founder/admin
-- Enables founder/admin users to update:
-- - public.communities fields such as name, description, city, language, category, cover_url
-- - public.events fields such as title, description, starts_at, ends_at, city, address,
--   online_url, organizer, community_id, cover_url, visibility
-- =========================================================

grant update on public.communities to authenticated;
grant update on public.events to authenticated;

drop policy if exists "Founder or admin can update all communities" on public.communities;
create policy "Founder or admin can update all communities"
on public.communities
for update
to authenticated
using (
  exists (
    select 1
    from public.profiles actor_profile
    where actor_profile.user_id = auth.uid()
      and actor_profile.role in ('founder', 'admin')
  )
)
with check (
  exists (
    select 1
    from public.profiles actor_profile
    where actor_profile.user_id = auth.uid()
      and actor_profile.role in ('founder', 'admin')
  )
);

drop policy if exists "Founder or admin can update all events" on public.events;
create policy "Founder or admin can update all events"
on public.events
for update
to authenticated
using (
  exists (
    select 1
    from public.profiles actor_profile
    where actor_profile.user_id = auth.uid()
      and actor_profile.role in ('founder', 'admin')
  )
)
with check (
  exists (
    select 1
    from public.profiles actor_profile
    where actor_profile.user_id = auth.uid()
      and actor_profile.role in ('founder', 'admin')
  )
);

-- =========================================================
-- OPTIONAL / DANGEROUS: delete permissions
-- Only apply this section if you explicitly want founder/admin
-- users to be able to permanently delete communities/events.
-- =========================================================

grant delete on public.communities to authenticated;
grant delete on public.events to authenticated;

drop policy if exists "Founder or admin can delete all communities" on public.communities;
create policy "Founder or admin can delete all communities"
on public.communities
for delete
to authenticated
using (
  exists (
    select 1
    from public.profiles actor_profile
    where actor_profile.user_id = auth.uid()
      and actor_profile.role in ('founder', 'admin')
  )
);

drop policy if exists "Founder or admin can delete all events" on public.events;
create policy "Founder or admin can delete all events"
on public.events
for delete
to authenticated
using (
  exists (
    select 1
    from public.profiles actor_profile
    where actor_profile.user_id = auth.uid()
      and actor_profile.role in ('founder', 'admin')
  )
);
