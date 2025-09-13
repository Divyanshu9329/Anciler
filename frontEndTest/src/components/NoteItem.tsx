import { Note } from "../App";

interface Props {
  note: Note;
  onDelete: (id: string) => void;
}

export function NoteItem({ note, onDelete }: Props) {
  const copyText = () => {
    navigator.clipboard.writeText(
      ${note.title}\n${note.content || ""}
    );
    alert("Copied to clipboard!");
  };

  return (
    <div className="border rounded p-3 flex justify-between items-start">
      <div>
        <h2 className="font-semibold">{note.title}</h2>
        {note.content && <p className="text-gray-700">{note.content}</p>}
      </div>
      <div className="space-x-2">
        <button
          onClick={copyText}
          className="text-blue-600 underline text-sm"
        >
          Copy
        </button>
        <button
          onClick={() => onDelete(note.id)}
          className="text-red-600 underline text-sm"
        >
          Delete
        </button>
      </div>
    </div>
  );
}