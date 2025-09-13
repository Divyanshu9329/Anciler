import React from "react";
import { useSelector } from "react-redux";
import NoteItem from "./NoteItem";

export default function NoteList({ fileId }) {
  const file = useSelector(state => state.notes.files.find(f => f.id === fileId));
  const filter = useSelector(state => state.notes.filter);

  if (!file) return <p className="text-sm text-gray-500">File not found.</p>;
  let notes = file.notes || [];

  if (filter.q) {
    const q = filter.q.toLowerCase();
    notes = notes.filter(n => (n.title + " " + n.content + " " + (n.tags || []).join(" ")).toLowerCase().includes(q));
  }
  if (filter.tag) {
    notes = notes.filter(n => n.tags && n.tags.includes(filter.tag));
  }

  if (notes.length === 0) return <p className="text-sm text-gray-500">No notes yet. Add one!</p>;

  return (
    <div className="grid md:grid-cols-2 gap-3">
      {notes.map(note => (
        <NoteItem key={note.id} fileId={fileId} note={note} />
      ))}
    </div>
  );
}