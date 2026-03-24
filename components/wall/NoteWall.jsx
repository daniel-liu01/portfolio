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

function seededTilt(id) {
  const magnitude = seededInt(id, 4, 15, "tilt-magnitude");
  const direction = seededInt(id, 0, 1, "tilt-direction") === 0 ? -1 : 1;
  return magnitude * direction;
}

export default function NoteWall({ notes }) {
  const notesWithStyle = useMemo(
    () =>
      notes.map((note) => ({
        ...note,
        color: note.color || PASTEL_COLORS[seededInt(note.id, 0, PASTEL_COLORS.length - 1, "color")],
        rotation: seededTilt(note.id),
        offsetX: seededInt(note.id, -48, 48, "offset-x"),
        offsetY: seededInt(note.id, -30, 30, "offset-y"),
        layer: seededInt(note.id, 1, 20, "layer"),
      })),
    [notes]
  );

  return (
    <section className={styles.wall} aria-label="Visitor notes">
      {notesWithStyle.map((note) => (
        <div
          key={note.id}
          className={styles.noteWrap}
          style={{
            transform: `translate(${note.offsetX}px, ${note.offsetY}px)`,
            zIndex: note.layer,
          }}
        >
          <StickyNote
            name={note.name}
            message={note.message}
            color={note.color}
            rotation={note.rotation}
          />
        </div>
      ))}
    </section>
  );
}

