-- Community Admin policies for creators / owners / managers.
-- Review manually before running in Supabase SQL Editor.
-- Does not change schema and does not add new fields.

grant update on public.communities to authenticated;
grant select, insert, update on public.events to authenticated;
grant select on public.event_rsvps to authenticated;

drop policy if exists "Community admins can update own communities" on public.communities;
create policy "Community admins can update own communities"
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
  or communities.created_by = auth.uid()
  or exists (
    select 1
    from public.community_members membership
    where membership.community_id = communities.id
      and membership.user_id = auth.uid()
      and membership.role in ('owner', 'admin', 'manager', 'community_admin')
  )
)
with check (
  exists (
    select 1
    from public.profiles actor_profile
    where actor_profile.user_id = auth.uid()
      and actor_profile.role in ('founder', 'admin')
  )
  or communities.created_by = auth.uid()
  or exists (
    select 1
    from public.community_members membership
    where membership.community_id = communities.id
      and membership.user_id = auth.uid()
      and membership.role in ('owner', 'admin', 'manager', 'community_admin')
  )
);

drop policy if exists "Community admins can read own community events" on public.events;
create policy "Community admins can read own community events"
on public.events
for select
to authenticated
using (
  visibility = 'public'
  or exists (
    select 1
    from public.profiles actor_profile
    where actor_profile.user_id = auth.uid()
      and actor_profile.role in ('founder', 'admin')
  )
  or exists (
    select 1
    from public.communities community
    where community.id = events.community_id
      and (
        community.created_by = auth.uid()
        or exists (
          select 1
          from public.community_members membership
          where membership.community_id = community.id
            and membership.user_id = auth.uid()
            and membership.role in ('owner', 'admin', 'manager', 'community_admin')
        )
      )
  )
);

drop policy if exists "Community admins can update own community events" on public.events;
create policy "Community admins can update own community events"
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
  or exists (
    select 1
    from public.communities community
    where community.id = events.community_id
      and (
        community.created_by = auth.uid()
        or exists (
          select 1
          from public.community_members membership
          where membership.community_id = community.id
            and membership.user_id = auth.uid()
            and membership.role in ('owner', 'admin', 'manager', 'community_admin')
        )
      )
  )
)
with check (
  exists (
    select 1
    from public.profiles actor_profile
    where actor_profile.user_id = auth.uid()
      and actor_profile.role in ('founder', 'admin')
  )
  or exists (
    select 1
    from public.communities community
    where community.id = events.community_id
      and (
        community.created_by = auth.uid()
        or exists (
          select 1
          from public.community_members membership
          where membership.community_id = community.id
            and membership.user_id = auth.uid()
            and membership.role in ('owner', 'admin', 'manager', 'community_admin')
        )
      )
  )
);

drop policy if exists "Community admins can create own community events" on public.events;
create policy "Community admins can create own community events"
on public.events
for insert
to authenticated
with check (
  created_by = auth.uid()
  and (
    exists (
      select 1
      from public.profiles actor_profile
      where actor_profile.user_id = auth.uid()
        and actor_profile.role in ('founder', 'admin')
    )
    or exists (
      select 1
      from public.communities community
      where community.id = events.community_id
        and (
          community.created_by = auth.uid()
          or exists (
            select 1
            from public.community_members membership
            where membership.community_id = community.id
              and membership.user_id = auth.uid()
              and membership.role in ('owner', 'admin', 'manager', 'community_admin')
          )
        )
    )
  )
);

drop policy if exists "Community admins can read RSVPs for own community events" on public.event_rsvps;
create policy "Community admins can read RSVPs for own community events"
on public.event_rsvps
for select
to authenticated
using (
  exists (
    select 1
    from public.events event
    join public.communities community on community.id = event.community_id
    where event.id = event_rsvps.event_id
      and (
        exists (
          select 1
          from public.profiles actor_profile
          where actor_profile.user_id = auth.uid()
            and actor_profile.role in ('founder', 'admin')
        )
        or community.created_by = auth.uid()
        or exists (
          select 1
          from public.community_members membership
          where membership.community_id = community.id
            and membership.user_id = auth.uid()
            and membership.role in ('owner', 'admin', 'manager', 'community_admin')
        )
      )
  )
);
