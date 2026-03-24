import { Filter } from "bad-words";
import { NextResponse } from "next/server";
import { getSupabaseAdminClient, getSupabaseClient } from "@/lib/supabase";

const filter = new Filter();

export async function GET() {
  const supabase = getSupabaseClient();

  const { data, error } = await supabase
    .from("notes")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    return NextResponse.json(
      { error: "Failed to fetch notes." },
      { status: 500 }
    );
  }

  return NextResponse.json(data ?? []);
}

export async function POST(request) {
  let supabase;
  try {
    supabase = getSupabaseAdminClient();
  } catch (error) {
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

  if (rawMessage.length > 200) {
    return NextResponse.json(
      { error: "Message must be 200 characters or less." },
      { status: 400 }
    );
  }

  const name = filter.clean(rawName);
  const message = filter.clean(rawMessage);

  const { data, error } = await supabase
    .from("notes")
    .insert([{ name, message }])
    .select()
    .single();

  if (error) {
    console.error("Failed to insert note into Supabase:", error.message);
    return NextResponse.json(
      { error: "Failed to save your note. Please try again." },
      { status: 500 }
    );
  }

  return NextResponse.json(data, { status: 201 });
}

