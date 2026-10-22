-- A finished conversation sends widget: null. JSON null is not SQL null,
-- so intake_widget_ok rejected the turn that confirms the summary.

create or replace function public.intake_widget_ok(p_widget jsonb)
returns boolean
language sql
immutable
as $$
  select p_widget is null
    or jsonb_typeof(p_widget) = 'null'
    or (
      jsonb_typeof(p_widget) = 'object'
      and (p_widget->>'type') in ('text', 'chips', 'cards', 'investment', 'timing', 'contact', 'summary', 'boundaries')
    );
$$;
