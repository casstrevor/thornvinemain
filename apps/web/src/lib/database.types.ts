/**
 * Generated types will replace this file once you run:
 *   npx supabase gen types typescript --local > apps/web/src/lib/database.types.ts
 *
 * Keep this stub so the client is typed from day one.
 */
export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: Record<string, never>
    Views: Record<string, never>
    Functions: Record<string, never>
    Enums: Record<string, never>
    CompositeTypes: Record<string, never>
  }
}
