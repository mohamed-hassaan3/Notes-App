import React from "react";

export const NoteForm = (props) => {
  const {
    note = { title: "", text: "" },
    onSubmit,
    onCancel,
    setSelected,
  } = props;
  const handleChange = (e) => {
    const { name, value } = e.target;
    setSelected({ ...note, [name]: value });
    console.log(note);
  };
  return (
    <form onSubmit={() => onSubmit(note)}>
      <div className="form-group">
        <label>Title:</label>
        <input
          className="form-control"
          data-testid="input-title"
          name="title"
          onChange={handleChange}
          value={note.title}
        />
      </div>
      <div className="form-group">
        <label>Note:</label>
        <textarea
          className="form-control"
          data-testid="input-text"
          name="text"
          onChange={handleChange}
          value={note.text}
        />
      </div>
      <div className="form-group">
        <input
          type="button"
          data-testid="cancel-note"
          className="btn btn-default pull-right"
          value="Cancel"
          onClick={onCancel}
        />
        <input
          type="submit"
          data-testid="save-note"
          className="btn btn-default pull-right"
          value="Save"
        />
      </div>
    </form>
  );
};
