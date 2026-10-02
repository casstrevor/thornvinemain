-- Thornvine client portal: profiles, multi-tenant clients, projects, RLS

create extension if not exists "pgcrypto";

create type public.portal_role as enum (
  'thornvine_admin',
  'client_owner',
  'client_member'
);

create type public.project_status as enum (
  'discovery',
  'active',
  'paused',
  'complete'
);

create type public.client_status as enum (
  'active',
  'inactive'
);

-- Profiles (1:1 with auth.users)
create table public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  full_name text,
  email text,
  avatar_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.clients (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  status public.client_status not null default 'active',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.client_memberships (
  id uuid primary key default gen_random_uuid(),
  client_id uuid not null references public.clients (id) on delete cascade,
  user_id uuid not null references public.profiles (id) on delete cascade,
  role public.portal_role not null,
  created_at timestamptz not null default now(),
  unique (client_id, user_id)
);

create table public.projects (
  id uuid primary key default gen_random_uuid(),
  client_id uuid not null references public.clients (id) on delete cascade,
  name text not null,
  summary text,
  status public.project_status not null default 'discovery',
  starts_on date,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.project_updates (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references public.projects (id) on delete cascade,
  author_id uuid not null references public.profiles (id) on delete restrict,
  title text not null,
  body text not null,
  published_at timestamptz not null default now(),
  created_at timestamptz not null default now()
);

create table public.project_files (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references public.projects (id) on delete cascade,
  name text not null,
  storage_path text not null,
  uploaded_by uuid references public.profiles (id) on delete set null,
  created_at timestamptz not null default now()
);

create index client_memberships_user_id_idx on public.client_memberships (user_id);
create index client_memberships_client_id_idx on public.client_memberships (client_id);
create index projects_client_id_idx on public.projects (client_id);
create index project_updates_project_id_idx on public.project_updates (project_id);
create index project_updates_published_at_idx on public.project_updates (published_at desc);
create index project_files_project_id_idx on public.project_files (project_id);

-- Profile bootstrap from auth.users
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, email, full_name)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data ->> 'full_name', new.raw_user_meta_data ->> 'name')
  )
  on conflict (id) do update
    set email = excluded.email,
        full_name = coalesce(excluded.full_name, public.profiles.full_name),
        updated_at = now();
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row
  execute function public.handle_new_user();

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger profiles_set_updated_at
  before update on public.profiles
  for each row execute function public.set_updated_at();

create trigger clients_set_updated_at
  before update on public.clients
  for each row execute function public.set_updated_at();

create trigger projects_set_updated_at
  before update on public.projects
  for each row execute function public.set_updated_at();

-- Authorization helpers.
-- SECURITY DEFINER avoids RLS recursion when policies query memberships.
-- Authorization data is never read from user_metadata.
create or replace function public.is_thornvine_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.client_memberships m
    where m.user_id = (select auth.uid())
      and m.role = 'thornvine_admin'::public.portal_role
  );
$$;

create or replace function public.is_client_member(p_client_id uuid)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select
    public.is_thornvine_admin()
    or exists (
      select 1
      from public.client_memberships m
      where m.user_id = (select auth.uid())
        and m.client_id = p_client_id
    );
$$;

create or replace function public.can_access_project(p_project_id uuid)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.projects p
    where p.id = p_project_id
      and public.is_client_member(p.client_id)
  );
$$;

revoke all on function public.is_thornvine_admin() from public;
revoke all on function public.is_client_member(uuid) from public;
revoke all on function public.can_access_project(uuid) from public;
grant execute on function public.is_thornvine_admin() to authenticated;
grant execute on function public.is_client_member(uuid) to authenticated;
grant execute on function public.can_access_project(uuid) to authenticated;

alter table public.profiles enable row level security;
alter table public.clients enable row level security;
alter table public.client_memberships enable row level security;
alter table public.projects enable row level security;
alter table public.project_updates enable row level security;
alter table public.project_files enable row level security;

-- profiles
create policy profiles_select_own_or_admin
  on public.profiles
  for select
  to authenticated
  using (
    id = (select auth.uid())
    or public.is_thornvine_admin()
  );

create policy profiles_update_own
  on public.profiles
  for update
  to authenticated
  using (id = (select auth.uid()))
  with check (id = (select auth.uid()));

-- clients
create policy clients_select_member
  on public.clients
  for select
  to authenticated
  using (public.is_client_member(id));

create policy clients_insert_admin
  on public.clients
  for insert
  to authenticated
  with check (public.is_thornvine_admin());

create policy clients_update_admin
  on public.clients
  for update
  to authenticated
  using (public.is_thornvine_admin())
  with check (public.is_thornvine_admin());

-- memberships: readable by members/admins; writable only by admins
create policy memberships_select_visible
  on public.client_memberships
  for select
  to authenticated
  using (
    user_id = (select auth.uid())
    or public.is_thornvine_admin()
    or public.is_client_member(client_id)
  );

create policy memberships_insert_admin
  on public.client_memberships
  for insert
  to authenticated
  with check (public.is_thornvine_admin());

create policy memberships_update_admin
  on public.client_memberships
  for update
  to authenticated
  using (public.is_thornvine_admin())
  with check (public.is_thornvine_admin());

create policy memberships_delete_admin
  on public.client_memberships
  for delete
  to authenticated
  using (public.is_thornvine_admin());

-- projects
create policy projects_select_member
  on public.projects
  for select
  to authenticated
  using (public.is_client_member(client_id));

create policy projects_insert_admin
  on public.projects
  for insert
  to authenticated
  with check (public.is_thornvine_admin());

create policy projects_update_admin
  on public.projects
  for update
  to authenticated
  using (public.is_thornvine_admin())
  with check (public.is_thornvine_admin());

-- project_updates
create policy updates_select_member
  on public.project_updates
  for select
  to authenticated
  using (public.can_access_project(project_id));

create policy updates_insert_admin
  on public.project_updates
  for insert
  to authenticated
  with check (
    public.is_thornvine_admin()
    and author_id = (select auth.uid())
  );

create policy updates_update_admin
  on public.project_updates
  for update
  to authenticated
  using (public.is_thornvine_admin())
  with check (public.is_thornvine_admin());

create policy updates_delete_admin
  on public.project_updates
  for delete
  to authenticated
  using (public.is_thornvine_admin());

-- project_files (metadata)
create policy files_select_member
  on public.project_files
  for select
  to authenticated
  using (public.can_access_project(project_id));

create policy files_insert_admin
  on public.project_files
  for insert
  to authenticated
  with check (public.is_thornvine_admin());

create policy files_delete_admin
  on public.project_files
  for delete
  to authenticated
  using (public.is_thornvine_admin());

grant usage on schema public to authenticated;
grant select, update on public.profiles to authenticated;
grant select, insert, update on public.clients to authenticated;
grant select, insert, update, delete on public.client_memberships to authenticated;
grant select, insert, update on public.projects to authenticated;
grant select, insert, update, delete on public.project_updates to authenticated;
grant select, insert, delete on public.project_files to authenticated;
