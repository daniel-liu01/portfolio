import { Filter } from "bad-words";
import { NextResponse } from "next/server";
import { getSupabaseClient } from "@/lib/supabase";

const COLORS = [
  "#FFE8A3",
  "#FFD1DC",
  "#C8E7FF",
  "#D9FFC8",
  "#FFE4C8",
  "#E4D4FF",
];

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
  const supabase = getSupabaseClient();

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

  const color = COLORS[Math.floor(Math.random() * COLORS.length)];

  const { data, error } = await supabase
    .from("notes")
    .insert([{ name, message, color }])
    .select()
    .single();

  if (error) {
    return NextResponse.json(
      { error: "Failed to save your note. Please try again." },
      { status: 500 }
    );
  }

  return NextResponse.json(data, { status: 201 });
}

