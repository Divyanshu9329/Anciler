import { Note } from "../App";
import { NoteItem } from "./NoteItem";

interface Props {
  notes: Note[];
  onDelete: (id: string) => void;
}

export function NoteList({ notes, onDelete }: Props) {
  if (notes.length === 0) {
    return <p className="text-gray-500">No notes yet.</p>;
  }

  return (
    <div className="space-y-2">
      {notes.map((note) => (
        <NoteItem key={note.id} note={note} onDelete={onDelete} />
      ))}
    </div>
  );
}