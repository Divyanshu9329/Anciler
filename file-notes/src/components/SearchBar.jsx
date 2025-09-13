import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFilter, importState } from "../features/notes/notesSlice";

export default function SearchBar() {
  const dispatch = useDispatch();
  const filter = useSelector(s => s.notes.filter);

  const fileState = useSelector(s => s.notes);
  const fileRef = useRef();

  function onSearch(e) {
    dispatch(setFilter({ q: e.target.value }));
  }

  function onExport() {
    const dataStr = JSON.stringify({ notes: fileState }, null, 2);
    const blob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "file-notes-export.json";
    a.click();
    URL.revokeObjectURL(url);
  }

  function onImport(e) {
    const f = e.target.files?.[0];
    if (!f) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      try {
        const parsed = JSON.parse(ev.target.result);
        if (parsed && parsed.notes) {
          dispatch(importState(parsed.notes));
          alert("Import successful");
        } else {
          alert("Invalid import file");
        }
      } catch (err) {
        alert("Failed to import: " + err.message);
      }
    };
    reader.readAsText(f);
    // clear value so same file can be uploaded again
    e.target.value = "";
  }

  return (
    <div className="flex gap-3 items-center">
      <input
        value={filter.q}
        onChange={onSearch}
        className="rounded border px-3 py-2 w-full md:w-80 focus:ring"
        placeholder="Search notes..."
      />
      <button onClick={onExport} className="px-3 py-2 border rounded">Export</button>
      <label className="px-3 py-2 border rounded cursor-pointer">
        Import
        <input ref={fileRef} type="file" accept=".json" onChange={onImport} className="hidden" />
      </label>
    </div>
  );
}