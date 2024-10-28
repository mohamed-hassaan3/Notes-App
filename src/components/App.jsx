import React, { useEffect, useState } from "react";

import { NotesList } from "./NotesList";
import { NoteForm } from "./NoteForm";

export const App = (props) => {
  const { service } = props;

  const [notes, setNotes] = useState([]);
  const [selected, setSelected] = useState(null);
  const [editIndex, setEditIndex] = useState(-1);

  // (!) Get notes from service
  useEffect(() => {
    const getNotes = async () => {
      const notes = await service.getNotes();
      setNotes(notes);
    };
    getNotes();
  }, [service]);

  // Select new empty note
  function newNote() {
    setSelected({ id: null, title: "", text: "" });
  }

  // Set note as selected
  function onSelect(note) {
    setSelected(note);
  }

  // Save note to service
  async function onSubmit(note) {
    const saveNote = await service.saveNote(note);
    if (!selected.title) return;

    if (editIndex === -1) {
      setNotes((prev) => [note, ...prev]);
    } else {
      const updateNote = [...saveNote];
      updateNote[editIndex] = note;
      setNotes(updateNote);
      setEditIndex(-1)
      return updateNote
    }
   
    setSelected(null);
    console.log(notes);
  }

  // Unselect note
  function onCancel() {
    setSelected(null);
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-12">
          <h1>React notes</h1>
        </div>
      </div>
      <div className="row">
        <div className="col-md-4">
          <NotesList
            notes={notes || []}
            onSelect={onSelect}
            selected={!selected}
          />
        </div>
        <div className="col-md-8">
          {selected && (
            <NoteForm
              onSubmit={onSubmit}
              onCancel={onCancel}
              note={selected}
              setSelected={setSelected}
            />
          )}
          <div>
            <button onClick={newNote} id="new-note" disabled={selected}>
              New Note
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
