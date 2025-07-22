import React from "react";
import Card from "./Card";
import SearchNote from "./SearchNote";

const NoteList = (props) => {
    const notes = props.notes.map((note) => {
        return (
            <Card
                key={note.noteId}
                noteId={note.noteId}
                title={note.title}
                content={note.content}
                creation_date={note.creation_date}
                onSelect={props.onSelect}
                onDelete={props.onDelete}
            />
        );
    });
    return (
        <div>
            <SearchNote onSearch={props.onSearch}/>
            <div className='container d-flex flex-wrap'>{notes}</div>
        </div>
    );
};

export default NoteList;