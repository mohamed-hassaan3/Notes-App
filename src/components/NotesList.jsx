import React from "react";

export const NotesList = (props) => {
  const { notes = [], onSelect, selected } = props;
  return (
    <div className="list-group">
      <div data-testid="note-item" className="list-group-item active">
        Active note example
      </div>
      <ul>
        {notes &&
          notes.map((note) => (
            <li key={note.id} className={selected && selected.id === note.id ? 'active' : ''} onClick={() => onSelect(note)}>
              {note.title}
            </li>
          ))}
      </ul>
      <div data-testid="note-item" className="list-group-item">
        Inactive note example
      </div>
    </div>
  );
};
