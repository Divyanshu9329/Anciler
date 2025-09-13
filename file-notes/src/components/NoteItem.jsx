import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteNote } from "../features/notes/notesSlice";
import Modal from "./Modal";

function timeAgo(ts) {
  const diff = Date.now() - ts;
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return ${mins}m ago;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return ${hrs}h ago;
  const days = Math.floor(hrs / 24);
  return ${days}d ago;
}

export default function NoteItem({ fileId, note }) {
  const dispatch = useDispatch();
  const [viewOpen, setViewOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  function onCopy() {
    navigator.clipboard.writeText(${note.title}\n\n${note.content}).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    });
  }

  function onDelete() {
    if (!window.confirm("Delete this note?")) return;
    dispatch(deleteNote({ fileId, noteId: note.id }));
  }

  return (
    <div className="bg-white rounded p-3 shadow-sm border">
      <div className="flex justify-between items-start gap-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <h4 className="font-medium text-sm truncate">{note.title}</h4>
            <span className="text-xs text-gray-400">· {timeAgo(note.createdAt)}</span>
          </div>
          <p className="text-sm text-gray-600 mt-2 line-clamp-2">{note.content || <span className="text-gray-400 italic">No content</span>}</p>

          {note.tags && note.tags.length > 0 && (
            <div className="flex gap-2 mt-3 flex-wrap">
              {note.tags.map(t => (
                <span key={t} className="text-xs px-2 py-1 rounded bg-gray-100 border text-gray-600">{t}</span>
              ))}
            </div>
          )}
        </div>

        <div className="flex flex-col items-end gap-2">
          <button onClick={onCopy} className="text-xs px-2 py-1 border rounded hover:bg-gray-50">
            {copied ? "Copied ✓" : "Copy"}
          </button>
          <button onClick={() => setViewOpen(true)} className="text-xs px-2 py-1 border rounded hover:bg-gray-50">
            View
          </button>
          <button onClick={onDelete} className="text-xs px-2 py-1 text-red-600 hover:bg-red-50 rounded border">
            Delete
          </button>
        </div>
      </div>

      <Modal open={viewOpen} onClose={() => setViewOpen(false)} title={note.title}>
        <div>
          {note.content ? <p>{note.content}</p> : <p className="italic text-gray-500">No content</p>}
          {note.tags && note.tags.length > 0 && (
            <div className="mt-3">
              <h5 className="text-sm font-semibold">Tags</h5>
              <div className="flex gap-2 mt-2 flex-wrap">
                {note.tags.map(t => <span key={t} className="text-xs px-2 py-1 rounded bg-gray-100 border">{t}</span>)}
              </div>
            </div>
          )}
        </div>
      </Modal>
    </div>
  );
}