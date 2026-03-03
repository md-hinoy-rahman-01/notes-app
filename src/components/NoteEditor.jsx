import { useState, useEffect } from "react";

function NoteEditor({ addNote, editingNote, updateNote }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    if (editingNote) {
      setTitle(editingNote.title);
      setContent(editingNote.content);
    }
  }, [editingNote]);

  const handleSubmit = () => {
    if (!title.trim() || !content.trim()) return;

    if (editingNote) {
      updateNote({ ...editingNote, title, content });
    } else {
      addNote({ title, content });
    }

    setTitle("");
    setContent("");
  };

  return (
    <div className="editor">
        <h1 className="header-name">Notes App</h1>
      <input
        type="text"
        placeholder="Note title..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <textarea
        placeholder="Write your note..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />

      <button onClick={handleSubmit}>
        {editingNote ? "Update Note" : "Add Note"}
      </button>
    </div>
  );
}

export default NoteEditor;