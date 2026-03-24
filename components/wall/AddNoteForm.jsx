"use client";

import { useEffect, useId, useRef, useState } from "react";
import styles from "./AddNoteForm.module.css";

const MAX_LENGTH = 200;

export default function AddNoteForm({ onNoteAdded }) {
  const nameId = useId();
  const messageId = useId();
  const nameInputRef = useRef(null);

  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event) => {
      if (event.key === "Escape") {
        setOpen(false);
        setError("");
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const t = window.setTimeout(() => nameInputRef.current?.focus(), 0);
    return () => window.clearTimeout(t);
  }, [open]);

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
      setOpen(false);
    } catch {
      setError("Unable to send your note. Please try again.");
      setSubmitting(false);
    }
  }

  return (
    <>
      <div className={styles.cta}>
        <h2 className={styles.ctaTitle}>Leave a note!</h2>
        <p className={styles.ctaText}>
          Leave a simple message for other visitors!
        </p>
        <button
          type="button"
          className={styles.ctaButton}
          onClick={() => {
            setOpen(true);
            setError("");
          }}
        >
          Try it!
        </button>
      </div>

      {open ? (
        <div
          className={styles.overlay}
          role="dialog"
          aria-modal="true"
          aria-label="Leave a note"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setOpen(false);
              setError("");
            }
          }}
        >
          <form className={styles.modal} onSubmit={handleSubmit}>
            <button
              type="button"
              className={styles.closeButton}
              aria-label="Close"
              onClick={() => {
                setOpen(false);
                setError("");
              }}
              disabled={submitting}
            >
              ×
            </button>

            <div className={styles.row}>
              <label className={styles.label} htmlFor={nameId}>
                Name
              </label>
              <input
                ref={nameInputRef}
                id={nameId}
                type="text"
                className={styles.input}
                value={name}
                onChange={(event) => setName(event.target.value)}
                placeholder="Type anon if you prefer"
                maxLength={80}
                autoComplete="name"
              />
            </div>

            <div className={styles.row}>
              <label className={styles.label} htmlFor={messageId}>
                What makes you happy
              </label>
              <textarea
                id={messageId}
                className={styles.textarea}
                value={message}
                onChange={(event) => setMessage(event.target.value)}
                placeholder="McDonalds, your friends, anything!"
                maxLength={MAX_LENGTH}
                rows={6}
              />
              <div className={styles.metaRow}>
                <span className={styles.counter}>
                  {message.length}/{MAX_LENGTH}
                </span>
              </div>
            </div>

            {error && <p className={styles.error}>{error}</p>}

            <button
              className={styles.stickButton}
              type="submit"
              disabled={submitting || !message.trim()}
            >
              {submitting ? "Sticking..." : "Stick!"}
            </button>
          </form>
        </div>
      ) : null}
    </>
  );
}

