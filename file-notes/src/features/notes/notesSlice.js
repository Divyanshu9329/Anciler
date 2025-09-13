import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = {
  files: [
    // example file structure:
    // { id: 'file1', name: 'Project A', notes: [ {id, title, content, tags: [], createdAt} ] }
  ],
  // optional quick search filter
  filter: {
    q: "",
    tag: ""
  }
};

const notesSlice = createSlice({
  name: "notes",
  initialState,
  reducers: {
    addFile(state, action) {
      const { id, name } = action.payload;
      state.files.push({ id, name, notes: [] });
    },
    addNote: {
      reducer(state, action) {
        const { fileId, note } = action.payload;
        const file = state.files.find(f => f.id === fileId);
        if (!file) return;
        file.notes.unshift(note); // newest first
      },
      prepare({ fileId, title, content, tags = [] }) {
        return {
          payload: {
            fileId,
            note: {
              id: nanoid(),
              title: title.trim(),
              content: content.trim(),
              tags,
              createdAt: Date.now(),
            }
          }
        };
      }
    },
    deleteNote(state, action) {
      const { fileId, noteId } = action.payload;
      const file = state.files.find(f => f.id === fileId);
      if (!file) return;
      file.notes = file.notes.filter(n => n.id !== noteId);
    },
    updateNote(state, action) {
      const { fileId, noteId, fields } = action.payload;
      const file = state.files.find(f => f.id === fileId);
      if (!file) return;
      const note = file.notes.find(n => n.id === noteId);
      if (!note) return;
      Object.assign(note, fields);
    },
    setFilter(state, action) {
      state.filter = { ...state.filter, ...action.payload };
    },
    importState(state, action) {
      // Replace state entirely from import (careful)
      return action.payload;
    },
    // simple helper to create a default demo file if none
    ensureDefaultFile(state) {
      if (state.files.length === 0) {
        state.files.push({
          id: "file_default",
          name: "General",
          notes: [],
        });
      }
    }
  }
});

export const {
  addFile,
  addNote,
  deleteNote,
  updateNote,
  setFilter,
  importState,
  ensureDefaultFile
} = notesSlice.actions;

export default notesSlice.reducer;