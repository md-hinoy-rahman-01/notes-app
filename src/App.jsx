import { useState, useEffect } from "react";
import Header from "./components/Header";
import NoteEditor from "./components/NoteEditor";
import NoteCard from "./components/NoteCard";
import "./App.css";

function App() {
  const [notes, setNotes] = useState([]);
  const [search, setSearch] = useState("");
  const [editingNote, setEditingNote] = useState(null);

  // Load notes from localStorage
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("notes"));
    if (saved) setNotes(saved);
  }, []);

  // Save notes to localStorage
  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  // Add new note
  const addNote = (note) => {
    setNotes([...notes, { ...note, id: Date.now() }]);
  };

  // Update existing note
  const updateNote = (updated) => {
    setNotes(notes.map((n) => (n.id === updated.id ? updated : n)));
    setEditingNote(null);
  };

  // Delete note
  const deleteNote = (id) => {
    setNotes(notes.filter((n) => n.id !== id));
  };

  // Filter notes by search
  const filteredNotes = notes.filter(
    (n) =>
      n.title.toLowerCase().includes(search.toLowerCase()) ||
      n.content.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="app-container">
      
      {/* LEFT SIDE — EDITOR */}
      <div className="left-panel">
        <NoteEditor
          addNote={addNote}
          editingNote={editingNote}
          updateNote={updateNote}
        />
      </div>

      {/* RIGHT SIDE — SEARCH + NOTES */}
      <div className="right-panel">
        <Header search={search} setSearch={setSearch} />

        <div className="notes-grid">
          {filteredNotes.map((note) => (
            <NoteCard
              key={note.id}
              note={note}
              onEdit={() => setEditingNote(note)}
              onDelete={() => deleteNote(note.id)}
            />
          ))}
        </div>
      </div>

    </div>
  );
}

export default App;