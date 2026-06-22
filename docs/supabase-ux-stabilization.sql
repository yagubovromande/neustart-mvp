-- NeuStart UX stabilization
-- Safe to run in the Supabase SQL editor on an existing project.
-- It:
-- 1. normalizes public.chat_messages to the canonical schema;
-- 2. recreates chat RLS without legacy connection_request_id dependencies;
-- 3. creates notifications;
-- 4. creates the public profile-photos storage bucket and policies.

create extension if not exists pgcrypto;

create table if not exists public.chat_messages (
  id uuid primary key default gen_random_uuid(),
  sender_user_id uuid not null references auth.users (id) on delete cascade,
  recipient_user_id uuid not null references auth.users (id) on delete cascade,
  message text not null default '',
  created_at timestamptz not null default timezone('utc', now()),
  check (sender_user_id <> recipient_user_id)
);

do $$
declare
  policy_name text;
begin
  for policy_name in
    select policyname
    from pg_policies
    where schemaname = 'public'
      and tablename = 'chat_messages'
  loop
    execute format('drop policy if exists %I on public.chat_messages', policy_name);
  end loop;
end
$$;

alter table public.chat_messages
  add column if not exists sender_user_id uuid,
  add column if not exists recipient_user_id uuid,
  add column if not exists message text,
  add column if not exists created_at timestamptz;

do $$
begin
  if exists (
    select 1
    from information_schema.columns
    where table_schema = 'public'
      and table_name = 'chat_messages'
      and column_name = 'sender_id'
  ) then
    execute 'update public.chat_messages set sender_user_id = coalesce(sender_user_id, sender_id) where sender_user_id is null';
  end if;

  if exists (
    select 1
    from information_schema.columns
    where table_schema = 'public'
      and table_name = 'chat_messages'
      and column_name = 'from_user_id'
  ) then
    execute 'update public.chat_messages set sender_user_id = coalesce(sender_user_id, from_user_id) where sender_user_id is null';
  end if;

  if exists (
    select 1
    from information_schema.columns
    where table_schema = 'public'
      and table_name = 'chat_messages'
      and column_name = 'user_id'
  ) then
    execute 'update public.chat_messages set sender_user_id = coalesce(sender_user_id, user_id) where sender_user_id is null';
  end if;

  if exists (
    select 1
    from information_schema.columns
    where table_schema = 'public'
      and table_name = 'chat_messages'
      and column_name = 'recipient_id'
  ) then
    execute 'update public.chat_messages set recipient_user_id = coalesce(recipient_user_id, recipient_id) where recipient_user_id is null';
  end if;

  if exists (
    select 1
    from information_schema.columns
    where table_schema = 'public'
      and table_name = 'chat_messages'
      and column_name = 'receiver_id'
  ) then
    execute 'update public.chat_messages set recipient_user_id = coalesce(recipient_user_id, receiver_id) where recipient_user_id is null';
  end if;

  if exists (
    select 1
    from information_schema.columns
    where table_schema = 'public'
      and table_name = 'chat_messages'
      and column_name = 'to_user_id'
  ) then
    execute 'update public.chat_messages set recipient_user_id = coalesce(recipient_user_id, to_user_id) where recipient_user_id is null';
  end if;

  if exists (
    select 1
    from information_schema.columns
    where table_schema = 'public'
      and table_name = 'chat_messages'
      and column_name = 'recipient'
  ) then
    execute 'update public.chat_messages set recipient_user_id = coalesce(recipient_user_id, recipient) where recipient_user_id is null';
  end if;

  if exists (
    select 1
    from information_schema.columns
    where table_schema = 'public'
      and table_name = 'chat_messages'
      and column_name = 'content'
  ) then
    execute 'update public.chat_messages set message = coalesce(message, content) where message is null';
  end if;

  if exists (
    select 1
    from information_schema.columns
    where table_schema = 'public'
      and table_name = 'chat_messages'
      and column_name = 'text'
  ) then
    execute 'update public.chat_messages set message = coalesce(message, text) where message is null';
  end if;

  if exists (
    select 1
    from information_schema.columns
    where table_schema = 'public'
      and table_name = 'chat_messages'
      and column_name = 'body'
  ) then
    execute 'update public.chat_messages set message = coalesce(message, body) where message is null';
  end if;

  if exists (
    select 1
    from information_schema.columns
    where table_schema = 'public'
      and table_name = 'chat_messages'
      and column_name = 'sent_at'
  ) then
    execute 'update public.chat_messages set created_at = coalesce(created_at, sent_at) where created_at is null';
  end if;

  if exists (
    select 1
    from information_schema.columns
    where table_schema = 'public'
      and table_name = 'chat_messages'
      and column_name = 'timestamp'
  ) then
    execute 'update public.chat_messages set created_at = coalesce(created_at, "timestamp") where created_at is null';
  end if;
end
$$;

update public.chat_messages
set message = ''
where message is null;

update public.chat_messages
set created_at = timezone('utc', now())
where created_at is null;

alter table public.chat_messages
  alter column message set default '',
  alter column created_at set default timezone('utc', now());

do $$
begin
  if not exists (
    select 1
    from pg_constraint
    where conname = 'chat_messages_sender_not_self'
  ) then
    alter table public.chat_messages
      add constraint chat_messages_sender_not_self
      check (sender_user_id <> recipient_user_id);
  end if;
end
$$;

alter table public.chat_messages
  drop column if exists sender_id,
  drop column if exists from_user_id,
  drop column if exists user_id,
  drop column if exists recipient_id,
  drop column if exists receiver_id,
  drop column if exists to_user_id,
  drop column if exists recipient,
  drop column if exists content,
  drop column if exists text,
  drop column if exists body,
  drop column if exists sent_at,
  drop column if exists "timestamp",
  drop column if exists connection_request_id;

do $$
begin
  if not exists (select 1 from public.chat_messages where sender_user_id is null) then
    alter table public.chat_messages
      alter column sender_user_id set not null;
  end if;

  if not exists (select 1 from public.chat_messages where recipient_user_id is null) then
    alter table public.chat_messages
      alter column recipient_user_id set not null;
  end if;

  if not exists (select 1 from public.chat_messages where message is null) then
    alter table public.chat_messages
      alter column message set not null;
  end if;

  if not exists (select 1 from public.chat_messages where created_at is null) then
    alter table public.chat_messages
      alter column created_at set not null;
  end if;
end
$$;

create index if not exists chat_messages_sender_idx
  on public.chat_messages (sender_user_id, created_at desc);

create index if not exists chat_messages_recipient_idx
  on public.chat_messages (recipient_user_id, created_at desc);

alter table public.chat_messages enable row level security;

grant select, insert on table public.chat_messages to authenticated;

drop policy if exists "Users can read accepted chats" on public.chat_messages;
create policy "Users can read accepted chats"
on public.chat_messages
for select
to authenticated
using (
  (auth.uid() = sender_user_id or auth.uid() = recipient_user_id)
  and exists (
    select 1
    from public.connection_requests requests
    where requests.status = 'accepted'
      and (
        (requests.from_user_id = sender_user_id and requests.to_user_id = recipient_user_id)
        or (requests.from_user_id = recipient_user_id and requests.to_user_id = sender_user_id)
      )
  )
);

drop policy if exists "Users can send messages to accepted contacts" on public.chat_messages;
create policy "Users can send messages to accepted contacts"
on public.chat_messages
for insert
to authenticated
with check (
  auth.uid() = sender_user_id
  and exists (
    select 1
    from public.connection_requests requests
    where requests.status = 'accepted'
      and (
        (requests.from_user_id = sender_user_id and requests.to_user_id = recipient_user_id)
        or (requests.from_user_id = recipient_user_id and requests.to_user_id = sender_user_id)
      )
  )
);

create table if not exists public.notifications (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  type text not null,
  title text not null,
  body text not null default '',
  related_user_id uuid references auth.users (id) on delete set null,
  related_chat_user_id uuid references auth.users (id) on delete set null,
  is_read boolean not null default false,
  created_at timestamptz not null default timezone('utc', now())
);

create index if not exists notifications_user_created_idx
  on public.notifications (user_id, created_at desc);

create index if not exists notifications_user_read_idx
  on public.notifications (user_id, is_read, created_at desc);

alter table public.notifications enable row level security;

grant select, insert, update on table public.notifications to authenticated;

drop policy if exists "Users read own notifications" on public.notifications;
create policy "Users read own notifications"
on public.notifications
for select
to authenticated
using (auth.uid() = user_id);

drop policy if exists "Users update own notifications" on public.notifications;
create policy "Users update own notifications"
on public.notifications
for update
to authenticated
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

drop policy if exists "Users insert chat notifications" on public.notifications;
create policy "Users insert chat notifications"
on public.notifications
for insert
to authenticated
with check (
  (
    auth.uid() = user_id
    and related_user_id is null
  )
  or (
    type = 'chat_message'
    and auth.uid() = related_user_id
    and user_id <> auth.uid()
    and exists (
      select 1
      from public.connection_requests requests
      where requests.status = 'accepted'
        and (
          (requests.from_user_id = auth.uid() and requests.to_user_id = user_id)
          or (requests.to_user_id = auth.uid() and requests.from_user_id = user_id)
        )
    )
  )
);

insert into storage.buckets (id, name, public)
values ('profile-photos', 'profile-photos', true)
on conflict (id) do nothing;

drop policy if exists "Public read profile photos" on storage.objects;
create policy "Public read profile photos"
on storage.objects
for select
to public
using (bucket_id = 'profile-photos');

drop policy if exists "Users upload own profile photos" on storage.objects;
create policy "Users upload own profile photos"
on storage.objects
for insert
to authenticated
with check (
  bucket_id = 'profile-photos'
  and auth.uid()::text = split_part(name, '/', 1)
);

drop policy if exists "Users update own profile photos" on storage.objects;
create policy "Users update own profile photos"
on storage.objects
for update
to authenticated
using (
  bucket_id = 'profile-photos'
  and auth.uid()::text = split_part(name, '/', 1)
)
with check (
  bucket_id = 'profile-photos'
  and auth.uid()::text = split_part(name, '/', 1)
);

drop policy if exists "Users delete own profile photos" on storage.objects;
create policy "Users delete own profile photos"
on storage.objects
for delete
to authenticated
using (
  bucket_id = 'profile-photos'
  and auth.uid()::text = split_part(name, '/', 1)
);
