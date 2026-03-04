import styles from "./StickyNote.module.css";

export default function StickyNote({ name, message, color, rotation }) {
  return (
    <article
      className={styles.note}
      style={{ backgroundColor: color, transform: `rotate(${rotation}deg)` }}
    >
      <p className={styles.message}>{message}</p>
      <p className={styles.name}>— {name}</p>
    </article>
  );
}

