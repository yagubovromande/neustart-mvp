-- Migration for existing projects.
-- It brings public.chat_messages to the canonical NeuStart schema
-- and removes legacy columns after optional backfill.

create extension if not exists "pgcrypto";

do $$
begin
  if not exists (
    select 1
    from information_schema.tables
    where table_schema = 'public'
      and table_name = 'chat_messages'
  ) then
    raise exception 'Table public.chat_messages does not exist. Restore the existing table first, then run this migration.';
  end if;
end $$;

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
end $$;

update public.chat_messages
set created_at = coalesce(created_at, timezone('utc', now()));

update public.chat_messages
set message = coalesce(nullif(trim(message), ''), '[legacy message]');

alter table public.chat_messages
  alter column message set default '',
  alter column created_at set default timezone('utc', now());

do $$
begin
  if not exists (
    select 1 from public.chat_messages where sender_user_id is null
  ) then
    alter table public.chat_messages
      alter column sender_user_id set not null;
  end if;

  if not exists (
    select 1 from public.chat_messages where recipient_user_id is null
  ) then
    alter table public.chat_messages
      alter column recipient_user_id set not null;
  end if;

  if not exists (
    select 1 from public.chat_messages where message is null
  ) then
    alter table public.chat_messages
      alter column message set not null;
  end if;

  if not exists (
    select 1 from public.chat_messages where created_at is null
  ) then
    alter table public.chat_messages
      alter column created_at set not null;
  end if;
end $$;

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
end $$;

alter table public.chat_messages
  drop column if exists body,
  drop column if exists content,
  drop column if exists text,
  drop column if exists connection_request_id,
  drop column if exists sender_id,
  drop column if exists from_user_id,
  drop column if exists user_id,
  drop column if exists recipient_id,
  drop column if exists receiver_id,
  drop column if exists to_user_id,
  drop column if exists recipient,
  drop column if exists sent_at,
  drop column if exists "timestamp";

create index if not exists chat_messages_sender_idx
  on public.chat_messages (sender_user_id, created_at desc);

create index if not exists chat_messages_recipient_idx
  on public.chat_messages (recipient_user_id, created_at desc);

alter table public.chat_messages enable row level security;

grant usage on schema public to anon, authenticated;
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
