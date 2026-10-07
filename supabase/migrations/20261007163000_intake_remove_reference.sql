create or replace function public.intake_remove_reference(p_reference_id uuid)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  v_intake uuid;
  v_owner uuid;
  v_status public.intake_status;
begin
  select r.intake_id, r.owner_id, i.status
    into v_intake, v_owner, v_status
  from public.intake_references r
  join public.intakes i on i.id = r.intake_id
  where r.id = p_reference_id
  for update of r;

  if v_owner is distinct from (select auth.uid()) then
    raise exception 'Not allowed';
  end if;
  if v_status not in ('draft', 'clarification') then
    raise exception 'References are closed';
  end if;

  delete from public.intake_references where id = p_reference_id;

  return public.intake_state(v_intake);
end;
$$;

revoke all on function public.intake_remove_reference(uuid) from public, anon;
grant execute on function public.intake_remove_reference(uuid) to authenticated;

drop policy if exists intake_references_storage_delete on storage.objects;
create policy intake_references_storage_delete
  on storage.objects for delete to authenticated
  using (
    bucket_id = 'intake-references'
    and (storage.foldername(name))[1] = (select auth.uid())::text
  );
