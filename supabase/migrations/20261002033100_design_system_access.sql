-- Design system access: Thornvine admins and designers.
-- Use in RLS policies for any design-system tables (e.g. token overrides, assets).

create or replace function public.is_design_system_viewer()
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1
    from public.client_memberships m
    where m.user_id = (select auth.uid())
      and m.role in (
        'thornvine_admin'::public.portal_role,
        'thornvine_designer'::public.portal_role
      )
  );
$$;

revoke all on function public.is_design_system_viewer() from public;
grant execute on function public.is_design_system_viewer() to authenticated;
