import React, { useState } from 'react';
import './Popup.css';

const NotePopup = ({ onClose, onSave }) => {
  const [noteText, setNoteText] = useState('');

  const handleSave = () => {
    if (noteText.trim() !== '') {
      onSave(noteText);
      onClose();
    }
  };

  return (
    <div id="popupContainer">
      <h1>New Note</h1>
      <textarea
        id="note-text"
        placeholder="Enter your note..."
        value={noteText}
        onChange={(e) => setNoteText(e.target.value)}
      />
      <div id="btn-container">
        <button id="submitBtn" onClick={handleSave}>Create Note</button>
        <button id="closeBtn" onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default NotePopup;
