// src/components/NoteForm.tsx
import { useState } from "react";
import { Note } from "../App";

interface Props {
  onAdd: (note: Note) => void;
}

export function NoteForm({ onAdd }: Props) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      setError("Title is required.");
      return;
    }
    const newNote: Note = {
      id: Date.now().toString(),
      title: title.trim(),
      content: content.trim() || undefined,
    };
    onAdd(newNote);
    setTitle("");
    setContent("");
    setError("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        placeholder="Note title..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        placeholder="Optional content..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      {error && <p>{error}</p>}
      <button
        type="submit"
      >
        Add Note
      </button>
    </form>
  );
}