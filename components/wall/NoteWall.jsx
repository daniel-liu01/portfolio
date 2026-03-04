"use client";

import { useMemo } from "react";
import StickyNote from "./StickyNote";
import styles from "./NoteWall.module.css";

function seededRotation(id) {
  const str = String(id);
  let hash = 0;
  for (let i = 0; i < str.length; i += 1) {
    hash = (hash * 31 + str.charCodeAt(i)) & 0xffffffff;
  }
  const value = (hash % 7) - 3; // -3 to 3
  return value;
}

export default function NoteWall({ notes }) {
  const notesWithRotation = useMemo(
    () =>
      notes.map((note) => ({
        ...note,
        rotation: seededRotation(note.id),
      })),
    [notes]
  );

  return (
    <section className={styles.wall} aria-label="Visitor notes">
      {notesWithRotation.map((note) => (
        <StickyNote
          key={note.id}
          name={note.name}
          message={note.message}
          color={note.color}
          rotation={note.rotation}
        />
      ))}
    </section>
  );
}

