"use client"

import { supabase } from "@/lib/supabaseClient"

export async function logout() {
  await supabase.auth.signOut()
  if (typeof window !== "undefined") {
    window.location.href = "/"
  }
}
