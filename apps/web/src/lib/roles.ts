import type { Database } from './database.types'

export type PortalRole = Database['public']['Enums']['portal_role']

/** Mirrors public.is_design_system_viewer() in Supabase. */
export const DESIGN_SYSTEM_ROLES: PortalRole[] = ['thornvine_admin', 'thornvine_designer']
