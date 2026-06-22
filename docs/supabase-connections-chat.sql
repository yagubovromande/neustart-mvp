-- Canonical NeuStart schema for new projects.
-- chat_messages intentionally contains only:
-- id, sender_user_id, recipient_user_id, message, created_at

create extension if not exists "pgcrypto";

create table if not exists public.connection_requests (
  id uuid primary key default gen_random_uuid(),
  from_user_id uuid not null references auth.users (id) on delete cascade,
  to_user_id uuid not null references auth.users (id) on delete cascade,
  message text not null default '',
  status text not null default 'pending' check (status in ('pending', 'accepted', 'declined')),
  created_at timestamptz not null default timezone('utc', now()),
  check (from_user_id <> to_user_id),
  check (char_length(message) <= 300)
);

create index if not exists connection_requests_from_user_idx
  on public.connection_requests (from_user_id, created_at desc);

create index if not exists connection_requests_to_user_idx
  on public.connection_requests (to_user_id, created_at desc);

alter table public.connection_requests enable row level security;

grant usage on schema public to anon, authenticated;
grant select, insert, update on table public.connection_requests to authenticated;

drop policy if exists "Users can read own connection requests" on public.connection_requests;
create policy "Users can read own connection requests"
on public.connection_requests
for select
to authenticated
using (auth.uid() = from_user_id or auth.uid() = to_user_id);

drop policy if exists "Users can create connection requests" on public.connection_requests;
create policy "Users can create connection requests"
on public.connection_requests
for insert
to authenticated
with check (auth.uid() = from_user_id);

drop policy if exists "Recipients can update connection requests" on public.connection_requests;
create policy "Recipients can update connection requests"
on public.connection_requests
for update
to authenticated
using (auth.uid() = to_user_id)
with check (auth.uid() = to_user_id);

create table if not exists public.chat_messages (
  id uuid primary key default gen_random_uuid(),
  sender_user_id uuid not null references auth.users (id) on delete cascade,
  recipient_user_id uuid not null references auth.users (id) on delete cascade,
  message text not null default '',
  created_at timestamptz not null default timezone('utc', now()),
  check (sender_user_id <> recipient_user_id)
);

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
