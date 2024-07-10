import React, { useState } from 'react';
import './Popup.css';

const EditPopup = ({ note, onClose, onSave }) => {
  const [noteText, setNoteText] = useState(note.text);

  const handleSave = () => {
    if (noteText.trim() !== '') {
      onSave(note.id, noteText);
    }
  };

  return (
    <div id="editing-container" style={{ backgroundColor: note.color }}>
      <h1>Edit Note</h1>
      <textarea
        id="note-text"
        value={noteText}
        onChange={(e) => setNoteText(e.target.value)}
      />
      <div id="btn-container">
        <button id="submitBtn" onClick={handleSave}>Done</button>
        <button id="closeBtn" onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
};

export default EditPopup;
