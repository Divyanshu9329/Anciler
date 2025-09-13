import { configureStore } from "@reduxjs/toolkit";
import notesReducer from "./features/notes/notesSlice";

/* localStorage persistence helpers */
const STORAGE_KEY = "file-notes-v1";

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return undefined;
    return JSON.parse(raw);
  } catch (err) {
    console.warn("Failed to load state:", err);
    return undefined;
  }
}

function saveState(state) {
  try {
    const raw = JSON.stringify(state);
    localStorage.setItem(STORAGE_KEY, raw);
  } catch (err) {
    console.warn("Failed to save state:", err);
  }
}

const preloadedState = loadState();

const store = configureStore({
  reducer: {
    notes: notesReducer,
  },
  preloadedState,
});

/* subscribe with small debounce to avoid frequent writes */
let saveTimer = null;
store.subscribe(() => {
  if (saveTimer) clearTimeout(saveTimer);
  saveTimer = setTimeout(() => {
    saveState({
      notes: store.getState().notes,
    });
  }, 250);
});

export default store;
