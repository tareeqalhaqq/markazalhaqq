"use client"

import { useEffect, useMemo, useState } from "react"
import type { SupabaseClient } from "@supabase/supabase-js"

export type SupabaseCollectionOptions = {
  orderBy?: string
  ascending?: boolean
  filters?: Record<string, string | number | boolean>
}

export type SupabaseCollectionResult<T> = {
  data: T[]
  loading: boolean
  error: string | null
}

function createDependencyKey(filters: Record<string, string | number | boolean>) {
  return Object.entries(filters)
    .map(([key, value]) => `${key}:${value}`)
    .sort()
    .join("|")
}

export function useSupabaseCollection<T>(
  supabase: SupabaseClient,
  table: string,
  { orderBy, ascending = false, filters = {} }: SupabaseCollectionOptions = {},
): SupabaseCollectionResult<T> {
  const [data, setData] = useState<T[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const filterKey = useMemo(() => createDependencyKey(filters), [filters])

  useEffect(() => {
    let isMounted = true

    async function fetchCollection() {
      setLoading(true)
      let query = supabase.from(table).select("*")

      for (const [key, value] of Object.entries(filters)) {
        query = query.eq(key, value)
      }

      if (orderBy) {
        query = query.order(orderBy, { ascending })
      }

      const { data: rows, error: queryError } = await query

      if (!isMounted) return

      if (queryError) {
        console.error(`Failed to fetch ${table}`, queryError)
        setError("Unable to load the latest data. Please refresh and try again.")
        setData([])
      } else {
        setData((rows as T[]) ?? [])
        setError(null)
      }

      setLoading(false)
    }

    fetchCollection()

    return () => {
      isMounted = false
    }
  }, [ascending, filterKey, orderBy, supabase, table])

  return { data, loading, error }
}
