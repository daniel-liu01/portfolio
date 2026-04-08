"use client";

import { useState } from "react";
import NoteWall from "./NoteWall";
import AddNoteForm from "./AddNoteForm";
import styles from "../../app/wall/page.module.css";

export default function WallClient({
  initialNotes,
  supabaseUnavailableReason,
}) {
  const [notes, setNotes] = useState(initialNotes);

  function handleNoteAdded(newNote) {
    setNotes((current) => [newNote, ...(current || [])]);
  }

  return (
    <div className={styles.wallClient}>
      {supabaseUnavailableReason ? (
        <p className={styles.configWarning} role="alert">
          {supabaseUnavailableReason}
        </p>
      ) : null}
      <AddNoteForm
        onNoteAdded={handleNoteAdded}
        disabled={Boolean(supabaseUnavailableReason)}
      />
      <NoteWall notes={notes} />
    </div>
  );
}

