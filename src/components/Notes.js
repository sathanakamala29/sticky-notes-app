import React, { useState, useEffect } from 'react';
import NotePopup from './NotePopup';
import EditPopup from './EditPopup';
import './Notes.css';

const colors = ['#AED6F1', '#FADBD8', '#E8DAEF', '#E5E8E8', '#FFAACC', '#FFF', '#D5F5E3'];

const Notes = () => {
  const [notes, setNotes] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [editingNote, setEditingNote] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const savedNotes = JSON.parse(localStorage.getItem('notes')) || [];
    setNotes(savedNotes);
  }, []);

  let nextNoteId = 1;
  const addNote = (text) => {
    const newNote = {
      id: nextNoteId++,
      text,
      color: colors[Math.floor(Math.random() * colors.length)],
      lastEdited: new Date()
    };
    const updatedNotes = [...notes, newNote];
    updatedNotes.sort((a,b)=>new Date(b.lastEdited)-new Date(a.lastEdited));
    setNotes(updatedNotes);
    localStorage.setItem('notes', JSON.stringify(updatedNotes));
  };

  const updateNote = (id, newText) => {
    const updatedNotes = notes.map((note) => {
      if (note.id === id) {
        return { ...note, text: newText, lastEdited: new Date() };
      }
      return note;
    });
    updatedNotes.sort((a, b) => new Date(b.lastEdited) - new Date(a.lastEdited)); 
    setNotes(updatedNotes);
    localStorage.setItem('notes', JSON.stringify(updatedNotes));
    setEditingNote(null);
  };

  const deleteNote = (id) => {
    const updatedNotes = notes.filter((note) => note.id !== id);
    setNotes(updatedNotes);
    localStorage.setItem('notes', JSON.stringify(updatedNotes));
  };

  const showEditPopup = (note) => {
    setEditingNote(note);
  };

  const groupNotesByDate = (notes) => {
    const groupedNotes = {};
    notes.forEach((note) => {
      const date = new Date(note.lastEdited).toDateString();
      if (!groupedNotes[date]) {
        groupedNotes[date] = [];
      }
      groupedNotes[date].push(note);
    });
    return groupedNotes;
  };


  const filteredNotes = searchTerm.trim() === ''
    ? notes
    : notes.filter((note) =>
        note.text.toLowerCase().includes(searchTerm.toLowerCase())
      );

      const groupedNotes = groupNotesByDate(filteredNotes);

  return (
    <div id="container">
      <div id="list-header">
        <div id="addNoteDiv" onClick={() => setShowPopup(true)}>
          <i className="fa-solid fa-plus"></i>
        </div>
        <div className="blankDiv"></div>
        <div className="blankDiv"></div>
     
        <div id="search-container">
        <input
          type="text"
          placeholder="Search notes..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
         <i className="fas fa-search"></i>
        </div>
      </div>
      <div id="list-container">
        {Object.entries(groupedNotes).map(([date,notes])=>(
            <div key={date} className="note-group">
                <h2 className="group-title">{date}
                </h2>
                <ul className="notes-list">
                    {notes.map((note)=>(
                         <li key={note.id} style={{ backgroundColor: note.color }}>
                   <span>{note.text}</span>
                   <div id="noteBtns-container">
                <button id="editBtn" onClick={() => showEditPopup(note)}>
                  <i className="fas fa-pen"></i>
                </button>
                <button id="deleteBtn" onClick={() => deleteNote(note.id)}>
                  <i className="fas fa-trash"></i>
                </button>
                <button
                  id="infoBtn"
                  onClick={() =>
                    alert(`Last edited: ${new Date(note.lastEdited).toLocaleString()}`)
                  }
                >
                   <i className="fas fa-info-circle"></i>
                </button>
                </div>
                </li>
                    ))}
            </ul>
            </div>
        ))}
    </div>
    {showPopup && <NotePopup onClose={() => setShowPopup(false)} onSave={addNote} />}
      {editingNote && (
        <EditPopup note={editingNote} onClose={() => setEditingNote(null)} onSave={updateNote} />
      )}
    </div>
  );
};

 
export default Notes;



