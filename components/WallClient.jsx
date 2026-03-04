"use client";

import { useState } from "react";
import NoteWall from "./NoteWall";
import AddNoteForm from "./AddNoteForm";
import styles from "../app/wall/page.module.css";

export default function WallClient({ initialNotes }) {
  const [notes, setNotes] = useState(initialNotes);

  function handleNoteAdded(newNote) {
    setNotes((current) => [newNote, ...(current || [])]);
  }

  return (
    <div className={styles.wallClient}>
      <NoteWall notes={notes} />
      <AddNoteForm onNoteAdded={handleNoteAdded} />
    </div>
  );
}

