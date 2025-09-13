import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { nanoid } from "@reduxjs/toolkit";
import { addFile, ensureDefaultFile } from "./features/notes/notesSlice";

import NoteForm from "./components/NoteForm";
import NoteList from "./components/NoteList";
import SearchBar from "./components/SearchBar";

export default function App() {
  const dispatch = useDispatch();
  const files = useSelector(s => s.notes.files);
  const activeFileId = files?.[0]?.id;

  useEffect(() => {
    dispatch(ensureDefaultFile());
  }, [dispatch]);

  function addNewFile() {
    const name = prompt("New file name");
    if (!name || !name.trim()) return;
    dispatch(addFile({ id: nanoid(), name: name.trim() }));
  }

  return (
    <div className="min-h-screen flex">
      <aside className="w-64 bg-white border-r p-4 hidden md:block">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-semibold">Files</h2>
          <button onClick={addNewFile} className="text-sm text-blue-600">+ New</button>
        </div>

        <nav className="flex flex-col gap-2">
          {files.map(f => (
            <div key={f.id} className="px-3 py-2 rounded hover:bg-gray-50 border">
              <div className="flex justify-between items-center">
                <span className="truncate">{f.name}</span>
                <span className="text-xs text-gray-400">{f.notes?.length || 0}</span>
              </div>
            </div>
          ))}
        </nav>

        <div className="mt-6 text-sm text-gray-500">
          Tip: use files to group notes by subject.
        </div>
      </aside>

      <main className="flex-1 p-4">
        <header className="flex flex-col md:flex-row gap-3 md:items-center md:justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold">File Notes</h1>
            <p className="text-sm text-gray-500">Create and manage notes attached to files</p>
          </div>
          <SearchBar />
        </header>

        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-1 bg-white p-4 rounded shadow-sm border">
            <h3 className="font-semibold mb-3">Add Note</h3>
            {/* if multiple files you'd provide a select — for simplicity choose the first file */}
            {activeFileId ? <NoteForm fileId={activeFileId} /> : <p>No file selected</p>}
          </div>

          <div className="md:col-span-2">
            <div className="bg-white p-4 rounded shadow-sm border">
              <h3 className="font-semibold mb-3">Notes</h3>
              {activeFileId ? <NoteList fileId={activeFileId} /> : <p>No file selected</p>}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}