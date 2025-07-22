import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import dataSource from "./dataSource";
import './Card.css';

const Note = (props) => {
    const previousNote = props.note ? props.note : { };

    let note = {
        title: '',
        content: ''
    };

    let newNote = true;

    if (props.note) {
        note = props.note;
        newNote = false;
    }

    const [title, setTitle] = useState(note.title);
    const [content, setContent] = useState(note.content);

    const navigate = useNavigate();

    const updateTitle = (event) => {
        setTitle(event.target.value);
    };

    const updateContent = (event) => {
        setContent(event.target.value);
    };

    const handleFormSubmit = (event) => {
        event.preventDefault();

        const editedNote = {
            title: title,
            content: content
        };
        if (!newNote)
        {
            editedNote.id = props.note.noteId;
            editedNote.creation_date = props.note.creation_date;
        }
        saveNote(editedNote);
    };

    const saveNote = async (savedNote) => {
        let response;
        if (newNote)
            response = await dataSource.post('/api/notes', savedNote);
        else
            response = await dataSource.put('/api/notes', savedNote);
        console.log(response);
        console.log(response.data);
        props.onUpdate(navigate);
    };

    const handleCancel = (event) => {
        event.preventDefault();
        if (!newNote)
            note = previousNote;
        navigate("/notes");
    };

    return (
        <form onSubmit={handleFormSubmit}>
            <h1>{newNote ? "Create New" : "Update"} Note</h1>
            <h3>{newNote ? "Date Set Upon Save" : "Creation Date: " + new Date(note.creation_date).toLocaleString()}</h3>
            <div className="form-group">
                <label for="title">Note Title</label>
                <input type="text" className="form-control" id="title" placeholder="Enter Title" onChange={updateTitle} value={title} />
            </div>
            <div className="form-group">
                <label for="content">Note content</label>
                <textarea className="form-control" rows="6" cols="60" id="content" placeholder="Enter Content" onChange={updateContent} value={content} />
            </div>
            <div className="d-flex flex-row">
                <div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </div>
                <div className="spacer"></div>
                <div>
                    <button className="btn btn-secondary" onClick={handleCancel}>Cancel</button>
                </div>
            </div>
        </form>
    );
};

export default Note;