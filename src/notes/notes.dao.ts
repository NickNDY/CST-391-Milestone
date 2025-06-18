import { OkPacket } from "mysql";
import { execute } from '../services/mysql.connector';
import { Note } from './notes.model';
import { noteQueries } from './notes.queries';

export const readNotes = async () => {
    return execute<Note[]>(noteQueries.readNotes, []);
};

export const readNotesByContentSearch = async (search: string) => {
    console.log('search param', search);
    return execute<Note[]>(noteQueries.readNotesByContentSearch, [search]);
};

export const readNotesByNoteId = async (noteId: number) => {
    return execute<Note[]>(noteQueries.readNotesByNoteId, [noteId]);
};

export const createNote = async (note: Note) => {
    return execute<OkPacket>(noteQueries.createNote,
        [note.title, note.content, note.creation_date]);
};

export const updateNote = async (note: Note) => {
    return execute<OkPacket>(noteQueries.updateNote,
        [note.title, note.content, note.noteId]);
};

export const deleteNote = async (noteId: number) => {
    return execute<OkPacket>(noteQueries.deleteNote, [noteId]);
};