"use client";

import { useMemo } from "react";
import StickyNote from "./StickyNote";
import styles from "./NoteWall.module.css";

const PASTEL_COLORS = [
  "#FFE8A3",
  "#FFD1DC",
  "#C8E7FF",
  "#D9FFC8",
  "#FFE4C8",
  "#E4D4FF",
  "#FFF3B0",
  "#CFFAFE",
];

function hashString(value) {
  const str = String(value);
  let hash = 0;
  for (let i = 0; i < str.length; i += 1) {
    hash = (hash * 31 + str.charCodeAt(i)) >>> 0;
  }
  return hash;
}

function seededInt(id, min, max, salt = "") {
  const str = String(id);
  const hash = hashString(`${salt}:${str}`);
  const span = max - min + 1;
  return min + (hash % span);
}

export default function NoteWall({ notes }) {
  const notesWithStyle = useMemo(
    () =>
      notes.map((note) => ({
        ...note,
        color: note.color || PASTEL_COLORS[seededInt(note.id, 0, PASTEL_COLORS.length - 1, "color")],
        rotation: seededInt(note.id, -15, 15, "rotation"),
      })),
    [notes]
  );

  return (
    <section className={styles.wall} aria-label="Visitor notes">
      {notesWithStyle.map((note) => (
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

