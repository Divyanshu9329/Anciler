import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addNote } from "../features/notes/notesSlice";

export default function NoteForm({ fileId }) {
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState("");
  const [error, setError] = useState("");

  function onSubmit(e) {
    e.preventDefault();
    if (!title.trim()) {
      setError("Title is required");
      return;
    }
    dispatch(addNote({
      fileId,
      title,
      content,
      tags: tags
        .split(",")
        .map(t => t.trim())
        .filter(Boolean)
    }));
    setTitle("");
    setContent("");
    setTags("");
    setError("");
  }

  return (
    <form onSubmit={onSubmit} className="space-y-3">
      <div>
        <label className="block text-sm font-medium mb-1">Title <span className="text-red-500">*</span></label>
        <input
          className="w-full rounded border px-3 py-2 focus:ring focus:ring-blue-200"
          value={title}
          onChange={e => setTitle(e.target.value)}
          placeholder="Short title"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Content (optional)</label>
        <textarea
          className="w-full rounded border px-3 py-2 focus:ring focus:ring-blue-200"
          value={content}
          onChange={e => setContent(e.target.value)}
          rows={4}
          placeholder="Add more details..."
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Tags (comma separated)</label>
        <input
          className="w-full rounded border px-3 py-2 focus:ring focus:ring-blue-200"
          value={tags}
          onChange={e => setTags(e.target.value)}
          placeholder="e.g. meeting,todo"
        />
      </div>

      {error && <p className="text-sm text-red-600">{error}</p>}

      <div className="flex gap-2">
        <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 focus:outline-none">
          Add Note
        </button>
        <button type="button" onClick={() => { setTitle(""); setContent(""); setTags(""); setError(""); }} className="px-4 py-2 border rounded">
          Reset
        </button>
      </div>
    </form>
  );
}