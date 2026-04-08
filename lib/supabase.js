import dns from "node:dns/promises";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = (
  process.env.NEXT_PUBLIC_SUPABASE_URL ?? process.env.SUPABASE_URL
)?.trim();
const supabaseAnonKey =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ??
  process.env.SUPABASE_ANON_KEY ??
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ??
  process.env.SUPABASE_PUBLISHABLE_KEY;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY?.trim();

let supabaseClient;
let supabaseAdminClient;

export function getSupabaseClient() {
  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error(
      "Supabase env vars are missing. Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY, then restart the dev server."
    );
  }

  if (!supabaseClient) {
    supabaseClient = createClient(supabaseUrl, supabaseAnonKey);
  }

  return supabaseClient;
}

export function getSupabaseAdminClient() {
  if (!supabaseUrl || !supabaseServiceRoleKey) {
    throw new Error(
      "Supabase admin env vars are missing. Set SUPABASE_SERVICE_ROLE_KEY, then restart the dev server."
    );
  }

  if (!supabaseAdminClient) {
    supabaseAdminClient = createClient(supabaseUrl, supabaseServiceRoleKey);
  }

  return supabaseAdminClient;
}

/** Throws with message SUPABASE_HOST_UNRESOLVABLE if the project hostname does not exist in DNS. */
export async function verifySupabaseHostResolvable() {
  if (!supabaseUrl) {
    throw new Error(
      "NEXT_PUBLIC_SUPABASE_URL is missing. Add it to .env.local and restart."
    );
  }

  let hostname;
  try {
    hostname = new URL(supabaseUrl).hostname;
  } catch {
    throw new Error(
      "NEXT_PUBLIC_SUPABASE_URL is not a valid URL. Use https://YOUR_REF.supabase.co from Supabase → Settings → API."
    );
  }

  try {
    await dns.lookup(hostname);
  } catch (err) {
    const code = err?.code;
    if (code === "ENOTFOUND" || code === "EAI_AGAIN") {
      const e = new Error("SUPABASE_HOST_UNRESOLVABLE");
      e.cause = err;
      throw e;
    }
    throw err;
  }
}

