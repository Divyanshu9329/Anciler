// src/App.tsx
import { useState, useEffect } from "react";
import { NoteForm } from "./components/NoteForm";
import { NoteList } from "./components/NoteList";

export interface Note {
  id: string;
  title: string;
  content?: string;
}

export default function App() {
  const [notes, setNotes] = useState<Note[]>([]);

  // load saved notes
  useEffect(() => {
    const stored = localStorage.getItem("notes");
    if (stored) {
      setNotes(JSON.parse(stored));
    }
  }, []);

  // save notes
  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  const addNote = (note: Note) => {
    setNotes([note, ...notes]);
  };

  const deleteNote = (id: string) => {
    setNotes(notes.filter((n) => n.id !== id));
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">📂 File Notes</h1>
      <NoteForm onAdd={addNote} />
      <NoteList notes={notes} onDelete={deleteNote} />
    </div>
  );
}