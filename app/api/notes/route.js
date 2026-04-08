import { Filter } from "bad-words";
import { NextResponse } from "next/server";
import {
  getSupabaseAdminClient,
  verifySupabaseHostResolvable,
} from "@/lib/supabase";

const filter = new Filter();

const UNRESOLVABLE_MSG =
  "Supabase project URL is invalid or the project no longer exists. Open Supabase → Settings → API, copy Project URL into NEXT_PUBLIC_SUPABASE_URL in .env.local, add fresh API keys, run supabase/notes.sql if needed, then restart the dev server.";

function jsonSupabaseConfigError(error, status = 503) {
  const msg = error?.message ?? String(error);
  if (msg === "SUPABASE_HOST_UNRESOLVABLE") {
    return NextResponse.json({ error: UNRESOLVABLE_MSG }, { status });
  }
  if (
    msg.includes("NEXT_PUBLIC_SUPABASE_URL") ||
    msg.includes("not a valid URL")
  ) {
    return NextResponse.json({ error: msg }, { status: 500 });
  }
  if (msg.includes("SUPABASE_SERVICE_ROLE_KEY")) {
    return NextResponse.json(
      {
        error:
          "Server is missing SUPABASE_SERVICE_ROLE_KEY. Add it to .env.local and restart.",
      },
      { status: 500 }
    );
  }
  return null;
}

export async function GET() {
  try {
    await verifySupabaseHostResolvable();
  } catch (error) {
    const handled = jsonSupabaseConfigError(error);
    if (handled) return handled;
    console.error("Supabase host check failed:", error);
    return NextResponse.json(
      { error: "Failed to reach Supabase. Check your network and .env.local." },
      { status: 503 }
    );
  }

  let supabase;
  try {
    supabase = getSupabaseAdminClient();
  } catch (error) {
    const handled = jsonSupabaseConfigError(error, 500);
    if (handled) return handled;
    console.error("Supabase admin client configuration error:", error);
    return NextResponse.json(
      {
        error:
          "Server is missing SUPABASE_SERVICE_ROLE_KEY. Add it to .env.local and restart.",
      },
      { status: 500 }
    );
  }

  const { data, error } = await supabase
    .from("notes")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("GET /api/notes:", error.message);
    return NextResponse.json(
      { error: "Failed to fetch notes." },
      { status: 500 }
    );
  }

  return NextResponse.json(data ?? []);
}

export async function POST(request) {
  try {
    await verifySupabaseHostResolvable();
  } catch (error) {
    const handled = jsonSupabaseConfigError(error);
    if (handled) return handled;
    console.error("Supabase host check failed:", error);
    return NextResponse.json(
      { error: "Failed to reach Supabase. Check your network and .env.local." },
      { status: 503 }
    );
  }

  let supabase;
  try {
    supabase = getSupabaseAdminClient();
  } catch (error) {
    const handled = jsonSupabaseConfigError(error, 500);
    if (handled) return handled;
    console.error("Supabase admin client configuration error:", error);
    return NextResponse.json(
      {
        error:
          "Server is missing SUPABASE_SERVICE_ROLE_KEY. Add it to .env.local and restart.",
      },
      { status: 500 }
    );
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid JSON body." },
      { status: 400 }
    );
  }

  const rawName = typeof body.name === "string" ? body.name.trim() : "";
  const rawMessage = typeof body.message === "string" ? body.message.trim() : "";

  if (!rawName) {
    return NextResponse.json(
      { error: "Please enter your name." },
      { status: 400 }
    );
  }

  if (!rawMessage) {
    return NextResponse.json(
      { error: "Please enter a message." },
      { status: 400 }
    );
  }

  if (rawMessage.length > 100) {
    return NextResponse.json(
      { error: "Message must be 100 characters or less." },
      { status: 400 }
    );
  }

  const name = filter.clean(rawName);
  const message = filter.clean(rawMessage);

  let data;
  let insertError;
  try {
    const result = await supabase
      .from("notes")
      .insert([{ name, message }])
      .select()
      .single();
    data = result.data;
    insertError = result.error;
  } catch (e) {
    console.error("Failed to insert note into Supabase:", e);
    const msg = e?.message ?? String(e);
    if (msg.includes("fetch failed")) {
      return NextResponse.json(
        {
          error: UNRESOLVABLE_MSG,
        },
        { status: 503 }
      );
    }
    return NextResponse.json(
      { error: "Failed to save your note. Please try again." },
      { status: 500 }
    );
  }

  if (insertError) {
    console.error("Failed to insert note into Supabase:", insertError.message);
    const msg = insertError.message ?? "";
    if (msg.includes("fetch failed")) {
      return NextResponse.json({ error: UNRESOLVABLE_MSG }, { status: 503 });
    }
    return NextResponse.json(
      { error: "Failed to save your note. Please try again." },
      { status: 500 }
    );
  }

  return NextResponse.json(data, { status: 201 });
}

