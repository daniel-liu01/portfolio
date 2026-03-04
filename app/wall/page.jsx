import styles from "./page.module.css";
import { getSupabaseClient } from "@/lib/supabase";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import WallClient from "@/components/WallClient";

export const dynamic = "force-dynamic";

export default async function WallPage() {
  const supabase = getSupabaseClient();

  const { data } = await supabase
    .from("notes")
    .select("*")
    .order("created_at", { ascending: false });

  const notes = data ?? [];

  return (
    <>
      <Navbar activePage="wall" />
      <div className={styles.page}>
        <div className={styles.inner}>
          <h1 className={styles.srOnly}>Visitor Wall</h1>
          <section className={styles.board} aria-label="Sticky note wall">
            <WallClient initialNotes={notes} />
          </section>
        </div>
      </div>
      <Footer />
    </>
  );
}

