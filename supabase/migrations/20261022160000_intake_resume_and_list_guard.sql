-- Resume an existing introduction without inserting a blank draft.
-- Hide empty drafts from the staff desk (no client message and no idea text).

create or replace function public.intake_resume()
returns jsonb
language plpgsql
stable
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
    return null;
  end if;

  return public.intake_state(v_id);
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
    where i.status <> 'draft'
       or length(trim(coalesce(f.value->>'text', ''))) > 0
       or exists (
         select 1
         from public.intake_messages m
         where m.intake_id = i.id
           and m.role = 'client'
           and length(trim(m.body)) > 0
       )
  ), '[]'::jsonb);
end;
$$;

revoke all on function public.intake_resume() from public, anon;
revoke all on function public.intake_list() from public, anon;
grant execute on function public.intake_resume() to authenticated;
grant execute on function public.intake_list() to authenticated;
