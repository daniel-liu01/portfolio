import styles from "./StickyNote.module.css";

const FALLBACK_COLOR = "#FFE8A3";

export default function StickyNote({ name, message, color, rotation }) {
  return (
    <article
      className={styles.note}
      style={{
        backgroundColor: color || FALLBACK_COLOR,
        transform: `rotate(${rotation}deg)`,
      }}
    >
      <p className={styles.message}>{message}</p>
      <p className={styles.name}>— {name}</p>
    </article>
  );
}

