"use client";

import { useState } from "react";
import styles from "./AddNoteForm.module.css";

const MAX_LENGTH = 200;

export default function AddNoteForm({ onNoteAdded }) {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();
    if (submitting) return;

    setSubmitting(true);
    setError("");

    try {
      const response = await fetch("/api/notes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, message }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Something went wrong. Please try again.");
        setSubmitting(false);
        return;
      }

      if (onNoteAdded) {
        onNoteAdded(data);
      }

      setName("");
      setMessage("");
      setSubmitting(false);
    } catch {
      setError("Unable to send your note. Please try again.");
      setSubmitting(false);
    }
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.row}>
        <label className={styles.label} htmlFor="name">
          Name
        </label>
        <input
          id="name"
          type="text"
          className={styles.input}
          value={name}
          onChange={(event) => setName(event.target.value)}
          placeholder="Your name"
          maxLength={80}
        />
      </div>

      <div className={styles.row}>
        <label className={styles.label} htmlFor="message">
          Message
        </label>
        <textarea
          id="message"
          className={styles.textarea}
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          placeholder="Leave a note for future visitors..."
          maxLength={MAX_LENGTH}
          rows={4}
        />
        <div className={styles.metaRow}>
          <span className={styles.counter}>
            {message.length}/{MAX_LENGTH}
          </span>
        </div>
      </div>

      {error && <p className={styles.error}>{error}</p>}

      <button className={styles.button} type="submit" disabled={submitting}>
        {submitting ? "Posting..." : "Post note"}
      </button>
    </form>
  );
}

