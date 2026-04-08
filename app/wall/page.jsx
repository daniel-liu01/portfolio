import styles from "./page.module.css";
import {
  getSupabaseAdminClient,
  verifySupabaseHostResolvable,
} from "@/lib/supabase";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import WallClient from "@/components/wall/WallClient";

export const dynamic = "force-dynamic";

export default async function WallPage() {
  let notes = [];
  let supabaseUnavailableReason = null;

  try {
    await verifySupabaseHostResolvable();
    const supabase = getSupabaseAdminClient();
    const { data, error } = await supabase
      .from("notes")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Wall page: failed to load notes:", error.message);
      supabaseUnavailableReason =
        "Notes could not be loaded. Confirm the `notes` table exists (run supabase/notes.sql in the SQL Editor).";
    } else {
      notes = data ?? [];
    }
  } catch (e) {
    const msg = e?.message ?? String(e);
    if (msg === "SUPABASE_HOST_UNRESOLVABLE") {
      supabaseUnavailableReason =
        "Notes are offline: the Supabase URL in .env.local does not resolve. In Supabase → Settings → API, copy Project URL and API keys into .env.local, then restart the dev server.";
    } else if (
      msg.includes("NEXT_PUBLIC_SUPABASE_URL") ||
      msg.includes("not a valid URL")
    ) {
      supabaseUnavailableReason = msg;
    } else if (msg.includes("SUPABASE_SERVICE_ROLE_KEY")) {
      supabaseUnavailableReason =
        "Notes are offline: add SUPABASE_SERVICE_ROLE_KEY to .env.local and restart.";
    } else {
      throw e;
    }
  }

  return (
    <>
      <Navbar activePage="wall" />
      <div className={styles.page}>
        <div className={styles.inner}>
          <h1 className={styles.screenReaderText}>Visitor Wall</h1>
          <section className={styles.board} aria-label="Sticky note wall">
            <WallClient
              initialNotes={notes}
              supabaseUnavailableReason={supabaseUnavailableReason}
            />
          </section>
        </div>
      </div>
      <Footer />
    </>
  );
}
