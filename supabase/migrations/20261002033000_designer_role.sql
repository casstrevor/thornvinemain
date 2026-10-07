-- Thornvine staff designer role.
-- Kept in its own migration: a new enum value cannot be referenced in the
-- same transaction that adds it (see 20261002033100_design_system_access.sql).

alter type public.portal_role add value if not exists 'thornvine_designer';
