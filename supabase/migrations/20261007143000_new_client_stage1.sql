-- Stage 1 new-client intake. Depends on portal_core (is_thornvine_admin, set_updated_at).
-- Clients own a draft through auth.uid(). Guessable ids and email matches do not grant access.
-- Workflow changes go through the functions below. Submitted snapshots are insert-only.

create type public.intake_status as enum (
  'draft',
  'awaiting_review',
  'clarification',
  'invited',
  'on_hold',
  'declined'
);

create type public.intake_field_status as enum (
  'not_discussed',
  'client_stated',
  'inferred',
  'unknown',
  'confirmed'
);

create table public.intakes (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references auth.users (id) on delete cascade,
  status public.intake_status not null default 'draft',
  stage smallint not null default 1,
  stage2_unlocked boolean not null default false,
  contact_name text,
  contact_email text,
  company_name text,
  client_message text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  submitted_at timestamptz,
  constraint intakes_stage_check check (stage = 1)
);

create index intakes_owner_id_idx on public.intakes (owner_id);
create index intakes_status_submitted_idx on public.intakes (status, submitted_at desc);

create table public.intake_messages (
  id uuid primary key default gen_random_uuid(),
  intake_id uuid not null references public.intakes (id) on delete cascade,
  role text not null check (role in ('client', 'assistant')),
  body text not null check (char_length(body) between 1 and 8000),
  widget jsonb,
  client_turn_key uuid,
  created_at timestamptz not null default now()
);

create index intake_messages_intake_id_idx on public.intake_messages (intake_id, created_at);
create unique index intake_messages_turn_key_idx
  on public.intake_messages (intake_id, client_turn_key)
  where client_turn_key is not null;

create table public.intake_fields (
  intake_id uuid not null references public.intakes (id) on delete cascade,
  field_key text not null,
  status public.intake_field_status not null default 'not_discussed',
  value jsonb not null default '{}'::jsonb,
  source_message_id uuid references public.intake_messages (id) on delete set null,
  updated_at timestamptz not null default now(),
  primary key (intake_id, field_key),
  constraint intake_fields_key_check check (
    field_key in (
      'idea', 'motivation', 'audience', 'purpose', 'outcome', 'starting_point',
      'requested_help', 'involvement', 'investment', 'timing', 'decision_makers',
      'boundaries', 'contact', 'summary'
    )
  )
);

create table public.intake_submissions (
  id uuid primary key default gen_random_uuid(),
  intake_id uuid not null references public.intakes (id) on delete cascade,
  version integer not null check (version > 0),
  snapshot jsonb not null,
  created_at timestamptz not null default now(),
  unique (intake_id, version)
);

create table public.intake_reviews (
  id uuid primary key default gen_random_uuid(),
  intake_id uuid not null references public.intakes (id) on delete cascade,
  submission_id uuid not null references public.intake_submissions (id),
  reviewer_id uuid not null references auth.users (id),
  decision text not null check (decision in ('invite', 'clarify', 'hold', 'decline')),
  internal_notes text,
  client_message text,
  stage2_direction text,
  created_at timestamptz not null default now()
);

create index intake_reviews_intake_id_idx on public.intake_reviews (intake_id, created_at);

create table public.intake_references (
  id uuid primary key default gen_random_uuid(),
  intake_id uuid not null references public.intakes (id) on delete cascade,
  owner_id uuid not null references auth.users (id) on delete cascade,
  kind text not null check (kind in ('link', 'file')),
  label text,
  url text,
  storage_path text,
  created_at timestamptz not null default now(),
  constraint intake_references_target_check check (
    (kind = 'link' and url is not null) or (kind = 'file' and storage_path is not null)
  )
);

create index intake_references_intake_id_idx on public.intake_references (intake_id);

create trigger intakes_set_updated_at
  before update on public.intakes
  for each row execute function public.set_updated_at();

alter table public.intakes enable row level security;
alter table public.intake_messages enable row level security;
alter table public.intake_fields enable row level security;
alter table public.intake_submissions enable row level security;
alter table public.intake_reviews enable row level security;
alter table public.intake_references enable row level security;

create policy intakes_select_owner_or_admin
  on public.intakes for select to authenticated
  using (owner_id = (select auth.uid()) or (select public.is_thornvine_admin()));

create policy intake_messages_select_owner_or_admin
  on public.intake_messages for select to authenticated
  using (
    exists (
      select 1 from public.intakes i
      where i.id = intake_id
        and (i.owner_id = (select auth.uid()) or (select public.is_thornvine_admin()))
    )
  );

create policy intake_fields_select_owner_or_admin
  on public.intake_fields for select to authenticated
  using (
    exists (
      select 1 from public.intakes i
      where i.id = intake_id
        and (i.owner_id = (select auth.uid()) or (select public.is_thornvine_admin()))
    )
  );

create policy intake_submissions_select_owner_or_admin
  on public.intake_submissions for select to authenticated
  using (
    exists (
      select 1 from public.intakes i
      where i.id = intake_id
        and (i.owner_id = (select auth.uid()) or (select public.is_thornvine_admin()))
    )
  );

-- Staff notes live only here. No owner policy, so clients receive zero rows.
create policy intake_reviews_select_admin
  on public.intake_reviews for select to authenticated
  using ((select public.is_thornvine_admin()));

create policy intake_references_select_owner_or_admin
  on public.intake_references for select to authenticated
  using (owner_id = (select auth.uid()) or (select public.is_thornvine_admin()));

revoke all on public.intakes from public, anon, authenticated;
revoke all on public.intake_messages from public, anon, authenticated;
revoke all on public.intake_fields from public, anon, authenticated;
revoke all on public.intake_submissions from public, anon, authenticated;
revoke all on public.intake_reviews from public, anon, authenticated;
revoke all on public.intake_references from public, anon, authenticated;

grant select on public.intakes to authenticated;
grant select on public.intake_messages to authenticated;
grant select on public.intake_fields to authenticated;
grant select on public.intake_submissions to authenticated;
grant select on public.intake_reviews to authenticated;
grant select on public.intake_references to authenticated;

create or replace function public.intake_widget_ok(p_widget jsonb)
returns boolean
language sql
immutable
as $$
  select p_widget is null
    or (
      jsonb_typeof(p_widget) = 'object'
      and (p_widget->>'type') in ('text', 'chips', 'cards', 'investment', 'timing', 'contact', 'summary', 'boundaries')
    );
$$;

create or replace function public.intake_state(p_intake_id uuid)
returns jsonb
language plpgsql
stable
security definer
set search_path = public
as $$
declare
  v_owner uuid;
  v_admin boolean := public.is_thornvine_admin();
begin
  select owner_id into v_owner from public.intakes where id = p_intake_id;
  if v_owner is null then
    raise exception 'Intake not found';
  end if;
  if v_owner is distinct from (select auth.uid()) and not v_admin then
    raise exception 'Not allowed';
  end if;

  return jsonb_build_object(
    'intake', (
      select jsonb_build_object(
        'id', i.id,
        'status', i.status,
        'stage', i.stage,
        'stage2_unlocked', i.stage2_unlocked,
        'contact_name', i.contact_name,
        'contact_email', i.contact_email,
        'company_name', i.company_name,
        'client_message', i.client_message,
        'created_at', i.created_at,
        'updated_at', i.updated_at,
        'submitted_at', i.submitted_at
      )
      from public.intakes i
      where i.id = p_intake_id
    ),
    'messages', coalesce((
      select jsonb_agg(jsonb_build_object(
        'id', m.id, 'role', m.role, 'body', m.body, 'widget', m.widget, 'created_at', m.created_at
      ) order by m.created_at)
      from public.intake_messages m
      where m.intake_id = p_intake_id
    ), '[]'::jsonb),
    'fields', coalesce((
      select jsonb_agg(jsonb_build_object(
        'key', f.field_key, 'status', f.status, 'value', f.value, 'source_message_id', f.source_message_id
      ))
      from public.intake_fields f
      where f.intake_id = p_intake_id
    ), '[]'::jsonb),
    'submissions', coalesce((
      select jsonb_agg(jsonb_build_object(
        'id', s.id, 'version', s.version, 'snapshot', s.snapshot, 'created_at', s.created_at
      ) order by s.version)
      from public.intake_submissions s
      where s.intake_id = p_intake_id
    ), '[]'::jsonb),
    'references', coalesce((
      select jsonb_agg(jsonb_build_object(
        'id', r.id, 'kind', r.kind, 'label', r.label, 'url', r.url, 'storage_path', r.storage_path, 'created_at', r.created_at
      ) order by r.created_at)
      from public.intake_references r
      where r.intake_id = p_intake_id
    ), '[]'::jsonb),
    'reviews', case when v_admin then coalesce((
      select jsonb_agg(jsonb_build_object(
        'id', rv.id,
        'submission_id', rv.submission_id,
        'reviewer_id', rv.reviewer_id,
        'decision', rv.decision,
        'internal_notes', rv.internal_notes,
        'client_message', rv.client_message,
        'stage2_direction', rv.stage2_direction,
        'created_at', rv.created_at
      ) order by rv.created_at)
      from public.intake_reviews rv
      where rv.intake_id = p_intake_id
    ), '[]'::jsonb) else '[]'::jsonb end
  );
end;
$$;

create or replace function public.intake_start()
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  v_id uuid;
  v_uid uuid := (select auth.uid());
begin
  if v_uid is null then
    raise exception 'Sign in required';
  end if;

  select id into v_id
  from public.intakes
  where owner_id = v_uid
  order by created_at desc
  limit 1;

  if v_id is null then
    insert into public.intakes (owner_id)
    values (v_uid)
    returning id into v_id;

    insert into public.intake_messages (intake_id, role, body)
    values (
      v_id,
      'assistant',
      'What’s been growing in your imagination—an idea you want to bring to life, or something you wish worked better?'
    );
  end if;

  return public.intake_state(v_id);
end;
$$;

create or replace function public.intake_apply_turn(
  p_intake_id uuid,
  p_turn_key uuid,
  p_body text,
  p_proposal jsonb
)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  v_owner uuid;
  v_status public.intake_status;
  v_message_id uuid;
  v_update jsonb;
  v_key text;
  v_field_status public.intake_field_status;
begin
  if (select auth.uid()) is null then
    raise exception 'Sign in required';
  end if;
  if p_turn_key is null or p_body is null or char_length(trim(p_body)) = 0 or char_length(p_body) > 8000 then
    raise exception 'A client message is required';
  end if;
  if p_proposal is null or coalesce(p_proposal->>'message', '') = '' or not public.intake_widget_ok(p_proposal->'widget') then
    raise exception 'The assistant response is not valid';
  end if;

  select owner_id, status into v_owner, v_status
  from public.intakes
  where id = p_intake_id
  for update;

  if v_owner is null then
    raise exception 'Intake not found';
  end if;
  if v_owner is distinct from (select auth.uid()) then
    raise exception 'Not allowed';
  end if;
  if v_status not in ('draft', 'clarification') then
    raise exception 'This conversation is not open';
  end if;

  if exists (
    select 1 from public.intake_messages
    where intake_id = p_intake_id and client_turn_key = p_turn_key
  ) then
    return public.intake_state(p_intake_id);
  end if;

  insert into public.intake_messages (intake_id, role, body, client_turn_key)
  values (p_intake_id, 'client', trim(p_body), p_turn_key)
  returning id into v_message_id;

  for v_update in select * from jsonb_array_elements(coalesce(p_proposal->'fields', '[]'::jsonb))
  loop
    v_key := v_update->>'key';
    if v_key is null or v_key not in (
      'idea', 'motivation', 'audience', 'purpose', 'outcome', 'starting_point',
      'requested_help', 'involvement', 'investment', 'timing', 'decision_makers',
      'boundaries', 'contact', 'summary'
    ) then
      raise exception 'Unknown field';
    end if;
    v_field_status := (v_update->>'status')::public.intake_field_status;
    if octet_length(coalesce(v_update->'value', '{}'::jsonb)::text) > 8000 then
      raise exception 'Field value is too large';
    end if;
    insert into public.intake_fields (intake_id, field_key, status, value, source_message_id)
    values (p_intake_id, v_key, v_field_status, coalesce(v_update->'value', '{}'::jsonb), v_message_id)
    on conflict (intake_id, field_key) do update
      set status = excluded.status,
          value = excluded.value,
          source_message_id = excluded.source_message_id,
          updated_at = now();
  end loop;

  update public.intakes i
  set contact_name = nullif(f.value->>'name', ''),
      contact_email = nullif(f.value->>'email', ''),
      company_name = nullif(f.value->>'company', '')
  from public.intake_fields f
  where i.id = p_intake_id and f.intake_id = i.id and f.field_key = 'contact';

  insert into public.intake_messages (intake_id, role, body, widget)
  values (
    p_intake_id,
    'assistant',
    left(p_proposal->>'message', 4000),
    case
      when p_proposal->'widget' is null or p_proposal->'widget' = 'null'::jsonb then null
      else p_proposal->'widget'
    end
  );

  return public.intake_state(p_intake_id);
end;
$$;

create or replace function public.intake_ready(p_intake_id uuid)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select
    exists (
      select 1 from public.intakes i
      where i.id = p_intake_id
        and i.owner_id = (select auth.uid())
    )
    and not exists (
      select 1
      from (values
        ('idea'), ('audience'), ('purpose'), ('outcome')
      ) required(key)
      left join public.intake_fields f
        on f.intake_id = p_intake_id and f.field_key = required.key
      where f.status is null or f.status not in ('client_stated', 'confirmed')
    )
    and not exists (
      select 1
      from (values
        ('motivation'), ('starting_point'), ('requested_help'), ('involvement'),
        ('investment'), ('timing'), ('decision_makers'), ('boundaries')
      ) rest(key)
      left join public.intake_fields f
        on f.intake_id = p_intake_id and f.field_key = rest.key
      where f.status is null or f.status = 'not_discussed'
    )
    and exists (
      select 1 from public.intake_fields f
      where f.intake_id = p_intake_id
        and f.field_key = 'summary'
        and f.status = 'confirmed'
    )
    and exists (
      select 1 from public.intake_fields f
      where f.intake_id = p_intake_id
        and f.field_key = 'contact'
        and length(trim(coalesce(f.value->>'name', ''))) > 0
        and (f.value->>'email') ~* '^[^[:space:]@]+@[^[:space:]@]+\.[^[:space:]@]+$'
    );
$$;

create or replace function public.intake_submit(p_intake_id uuid)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  v_owner uuid;
  v_status public.intake_status;
  v_version integer;
begin
  if (select auth.uid()) is null then
    raise exception 'Sign in required';
  end if;

  select owner_id, status into v_owner, v_status
  from public.intakes
  where id = p_intake_id
  for update;

  if v_owner is distinct from (select auth.uid()) then
    raise exception 'Not allowed';
  end if;
  if v_status not in ('draft', 'clarification') then
    raise exception 'This intake cannot be submitted';
  end if;
  if not public.intake_ready(p_intake_id) then
    raise exception 'Stage 1 is not ready for review';
  end if;

  select coalesce(max(version), 0) + 1 into v_version
  from public.intake_submissions
  where intake_id = p_intake_id;

  insert into public.intake_submissions (intake_id, version, snapshot)
  select
    p_intake_id,
    v_version,
    jsonb_build_object(
      'stage', 1,
      'contact', jsonb_build_object(
        'name', i.contact_name,
        'email', i.contact_email,
        'company', i.company_name
      ),
      'fields', coalesce((
        select jsonb_agg(jsonb_build_object(
          'key', f.field_key, 'status', f.status, 'value', f.value, 'source_message_id', f.source_message_id
        ))
        from public.intake_fields f
        where f.intake_id = p_intake_id
      ), '[]'::jsonb),
      'references', coalesce((
        select jsonb_agg(jsonb_build_object('kind', r.kind, 'label', r.label, 'url', r.url))
        from public.intake_references r
        where r.intake_id = p_intake_id
      ), '[]'::jsonb)
    )
  from public.intakes i
  where i.id = p_intake_id;

  update public.intakes
  set status = 'awaiting_review',
      submitted_at = now(),
      stage2_unlocked = false,
      client_message = null
  where id = p_intake_id;

  return public.intake_state(p_intake_id);
end;
$$;

create or replace function public.intake_review(
  p_intake_id uuid,
  p_decision text,
  p_internal_notes text,
  p_client_message text,
  p_stage2_direction text
)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  v_status public.intake_status;
  v_submission uuid;
begin
  if not public.is_thornvine_admin() then
    raise exception 'Not allowed';
  end if;
  if p_decision not in ('invite', 'clarify', 'hold', 'decline') then
    raise exception 'Unknown decision';
  end if;
  if p_decision = 'clarify' and length(trim(coalesce(p_client_message, ''))) = 0 then
    raise exception 'A clarification question is required';
  end if;

  select status into v_status
  from public.intakes
  where id = p_intake_id
  for update;

  if v_status is null then
    raise exception 'Intake not found';
  end if;
  if v_status <> 'awaiting_review' then
    raise exception 'This intake is not awaiting review';
  end if;

  select id into v_submission
  from public.intake_submissions
  where intake_id = p_intake_id
  order by version desc
  limit 1;

  if v_submission is null then
    raise exception 'No submission to review';
  end if;

  insert into public.intake_reviews (
    intake_id, submission_id, reviewer_id, decision, internal_notes, client_message, stage2_direction
  ) values (
    p_intake_id,
    v_submission,
    (select auth.uid()),
    p_decision,
    nullif(trim(coalesce(p_internal_notes, '')), ''),
    nullif(trim(coalesce(p_client_message, '')), ''),
    nullif(trim(coalesce(p_stage2_direction, '')), '')
  );

  update public.intakes
  set status = case p_decision
        when 'invite' then 'invited'::public.intake_status
        when 'clarify' then 'clarification'::public.intake_status
        when 'hold' then 'on_hold'::public.intake_status
        else 'declined'::public.intake_status
      end,
      stage2_unlocked = (p_decision = 'invite'),
      client_message = nullif(trim(coalesce(p_client_message, '')), '')
  where id = p_intake_id;

  return public.intake_state(p_intake_id);
end;
$$;

create or replace function public.intake_list()
returns jsonb
language plpgsql
stable
security definer
set search_path = public
as $$
begin
  if not public.is_thornvine_admin() then
    raise exception 'Not allowed';
  end if;
  return coalesce((
    select jsonb_agg(jsonb_build_object(
      'id', i.id,
      'status', i.status,
      'contact_name', i.contact_name,
      'company_name', i.company_name,
      'submitted_at', i.submitted_at,
      'created_at', i.created_at,
      'summary', left(coalesce(f.value->>'text', ''), 180)
    ) order by coalesce(i.submitted_at, i.created_at) desc)
    from public.intakes i
    left join public.intake_fields f on f.intake_id = i.id and f.field_key = 'idea'
  ), '[]'::jsonb);
end;
$$;

create or replace function public.intake_add_reference(
  p_intake_id uuid,
  p_kind text,
  p_label text,
  p_url text,
  p_storage_path text
)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  v_owner uuid;
  v_status public.intake_status;
begin
  select owner_id, status into v_owner, v_status
  from public.intakes
  where id = p_intake_id
  for update;

  if v_owner is distinct from (select auth.uid()) then
    raise exception 'Not allowed';
  end if;
  if v_status not in ('draft', 'clarification') then
    raise exception 'References are closed';
  end if;
  if p_kind = 'link' then
    if coalesce(p_url, '') !~* '^https?://' then
      raise exception 'Link must start with http:// or https://';
    end if;
  elsif p_kind = 'file' then
    if p_storage_path is null or p_storage_path !~ ('^' || (select auth.uid())::text || '/' || p_intake_id::text || '/') then
      raise exception 'File path is not owned by this intake';
    end if;
  else
    raise exception 'Unknown reference';
  end if;

  insert into public.intake_references (intake_id, owner_id, kind, label, url, storage_path)
  values (p_intake_id, v_owner, p_kind, nullif(trim(coalesce(p_label, '')), ''), p_url, p_storage_path);

  return public.intake_state(p_intake_id);
end;
$$;

revoke all on function public.intake_widget_ok(jsonb) from public, anon, authenticated;
revoke all on function public.intake_state(uuid) from public, anon;
revoke all on function public.intake_start() from public, anon;
revoke all on function public.intake_apply_turn(uuid, uuid, text, jsonb) from public, anon;
revoke all on function public.intake_ready(uuid) from public, anon;
revoke all on function public.intake_submit(uuid) from public, anon;
revoke all on function public.intake_review(uuid, text, text, text, text) from public, anon;
revoke all on function public.intake_list() from public, anon;
revoke all on function public.intake_add_reference(uuid, text, text, text, text) from public, anon;

grant execute on function public.intake_state(uuid) to authenticated;
grant execute on function public.intake_start() to authenticated;
grant execute on function public.intake_apply_turn(uuid, uuid, text, jsonb) to authenticated;
grant execute on function public.intake_ready(uuid) to authenticated;
grant execute on function public.intake_submit(uuid) to authenticated;
grant execute on function public.intake_review(uuid, text, text, text, text) to authenticated;
grant execute on function public.intake_list() to authenticated;
grant execute on function public.intake_add_reference(uuid, text, text, text, text) to authenticated;

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'intake-references',
  'intake-references',
  false,
  8388608,
  array['image/png', 'image/jpeg', 'image/webp', 'application/pdf', 'text/plain']
)
on conflict (id) do update
set public = false,
    file_size_limit = excluded.file_size_limit,
    allowed_mime_types = excluded.allowed_mime_types;

create policy intake_references_storage_read
  on storage.objects for select to authenticated
  using (
    bucket_id = 'intake-references'
    and (
      (storage.foldername(name))[1] = (select auth.uid())::text
      or (select public.is_thornvine_admin())
    )
  );

create policy intake_references_storage_insert
  on storage.objects for insert to authenticated
  with check (
    bucket_id = 'intake-references'
    and (storage.foldername(name))[1] = (select auth.uid())::text
  );
