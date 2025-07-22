import React, { useState, useEffect } from 'react';
import dataSource from './dataSource';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import NavBar from './NavBar';
import Home from './Home';
import Note from './Note';
import NoteList from './NoteList';
import SearchNote from './SearchNote';

const App = () => {
    const [searchPhrase, setSearchPhrase] = useState('');
    const [noteList, setNoteList] = useState([]);
    const [selectedNote, setSelectedNote] = useState(null);
    
    let refresh = false;
    
    useEffect(() => {
        loadNotes();
    }, [refresh]);

    const loadNotes = async () => {
        let response = await dataSource.get('/api/notes');

        setNoteList(response.data);

        refresh = false;
    };

    const onSelectNote = (noteId, navigate) => {
        console.log('Update Note by ID: ' + noteId);
        const indexedNoteList = noteList.filter(note => note.noteId === noteId);
        setSelectedNote(indexedNoteList[0]);
        navigate('/notes/update');
    };

    const onDeleteNote = async (noteId, navigate) => {
        console.log('Delete Note by ID: ' + noteId);
        let response = await dataSource.delete('/api/notes', { data: { id: noteId } });
        console.log(response);
        console.log(response.data);
        refresh = true;
        loadNotes();
        navigate('/notes');
    };

    const onUpdateNote = async (navigate) => {
        refresh = true;
        loadNotes();
        navigate('/notes');
    };

    const onSearchPhrase = (phrase, navigate) => {
        setSearchPhrase(phrase);
        refresh = true;
        loadNotes();
        navigate('/notes');
    };

    const filteredList = noteList.filter((note) => {
        if (note.content.toLowerCase().includes(searchPhrase.toLowerCase()) ||
            searchPhrase === '')
            return true;
        return false;
    })

    return (
        <BrowserRouter>
            <NavBar />
            <Routes>
                <Route exact path='/' element={<Home />} />
                <Route exact path='/notes' element={<NoteList notes={filteredList} onSelect={onSelectNote} onDelete={onDeleteNote} onSearch={onSearchPhrase} />} />
                <Route exact path='/notes/create' element={<Note onUpdate={onUpdateNote} />} />
                <Route exact path='/notes/update' element={<Note note={selectedNote} onUpdate={onUpdateNote} />} />
            </Routes>
        </BrowserRouter>
    );
};

export default App;