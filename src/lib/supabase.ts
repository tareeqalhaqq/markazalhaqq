import "server-only"

import { createClient, type SupabaseClient } from "@supabase/supabase-js"

type SupabaseEnv = {
  url: string
  serviceRoleKey: string
}

function getSupabaseEnv(): SupabaseEnv {
  const url = process.env.SUPABASE_URL
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!url || !serviceRoleKey) {
    throw new Error("Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY environment variables")
  }

  return { url, serviceRoleKey }
}

export function createServiceRoleSupabaseClient(): SupabaseClient {
  const { url, serviceRoleKey } = getSupabaseEnv()

  return createClient(url, serviceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  })
}

export type EnsureProfileResult =
  | { profile_id?: string | number | null; id?: string | number | null }
  | string
  | number
  | null
  | undefined

export function extractProfileId(data: EnsureProfileResult): string | null {
  if (!data) return null
  if (typeof data === "string" || typeof data === "number") return String(data)
  if (typeof data === "object") {
    const profileId = data.profile_id ?? data.id
    return profileId ? String(profileId) : null
  }
  return null
}
