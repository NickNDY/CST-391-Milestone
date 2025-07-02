import { Request, RequestHandler, Response } from 'express';
import { Note } from '../models/notes.model';
import * as NoteDAO from '../data/notes.dao';
import { OkPacket } from 'mysql';

export const readNotes: RequestHandler = async (req: Request, res: Response) => {
    try {
        let notes;
        let noteId = parseInt(req.query['noteId'] as string);
        let contentSearch;
        // Check if request body or parameter is undefined
        if (req.body === undefined || req.body === null || req.body.content === undefined || req.body.content === null)
            contentSearch = '';
        else
            contentSearch = req.body.content as string;

        if (!Number.isNaN(noteId)) {
            console.log('noteId', noteId);
            notes = await NoteDAO.readNotesByNoteId(noteId);
        } else if (contentSearch.length > 0) {
            console.log('content', contentSearch);
            notes = await NoteDAO.readNotesByContentSearch('%' + contentSearch.toLowerCase() + '%');
        } else {
            notes = await NoteDAO.readNotes();
        }

        if (notes.length == 0)
            res.status(400).json('Note not found by that ID');
        else
            res.status(200).json(
                notes
            );
    } catch (error) {
        console.error('[notes.controller][readNotes][Error] ', error);
        res.status(500).json({
            message: 'There was an error when fetching notes'
        });
    }
};

export const readNotesByDescriptionSearch: RequestHandler = async (req: Request, res: Response) => {
    try {
        console.log('search', req.params['search']);
        const notes = await NoteDAO.readNotesByContentSearch('%' + req.params['search'] + '%');

        res.status(200).json(
            notes
        );
    } catch (error) {
        console.error('[notes.controller][readNotes][Error] ', error);
        res.status(500).json({
            message: 'There was an error when fetching notes'
        });
    }
};

export const createNote: RequestHandler = async (req: Request, res: Response) => {
    try {
        let note = req.body;
        const now = new Date();
        const timestamp = [now.getFullYear(), '-', now.getMonth(), '-', now.getDay(), ' ',
            now.getHours(), ':', now.getMinutes(), ':', now.getSeconds()
        ].join('');
        note.creation_date = timestamp; // Try to add creation time to note
        const okPacket: OkPacket = await NoteDAO.createNote(note);

        console.log('req.body', note);

        console.log('note', okPacket);

        let createdNote = await NoteDAO.readNotesByNoteId(okPacket.insertId);

        res.status(200).json(
            [okPacket, createdNote]
        );
    } catch (error) {
        console.error('[notes.controller][createNote][Error] ', error);
        res.status(500).json({
            message: 'There was an error when writing notes'
        });
    }
};

export const updateNote: RequestHandler = async (req: Request, res: Response) => {
    if (req.body === undefined || req.body === null)
    {
        console.log('Update body is undefined or null');
        res.status(500).json({
            message: 'Null body posted'
        });
        return;
    }
    if (req.body.id === undefined || req.body.id === null)
    {
        console.log('Update id is undefined or null');
        res.status(500).json({
            message: 'Null id posted'
        });
        return;
    }
    if (req.body.title === undefined || req.body.title === null)
    {
        console.log('Update title is undefined or null');
        res.status(500).json({
            message: 'Null title posted'
        });
        return;
    }
    if (req.body.content === undefined || req.body.content === null)
    {
        console.log('Update content is undefined or null');
        res.status(500).json({
            message: 'Null content posted'
        });
        return;
    }
    if (req.body.creation_date === undefined || req.body.creation_date === null)
    {
        console.log('Update creation_date is undefined or null');
        res.status(500).json({
            message: 'Null creation_date posted'
        });
        return;
    }
    try {
        console.log('req.body', req.body);
        let noteBody: Note = { noteId: req.body.id, title: req.body.title, content: req.body.content, creation_date: '' };
        const okPacket: OkPacket = await NoteDAO.updateNote(noteBody);


        console.log('note', okPacket);

        if (okPacket.affectedRows == 0)
            res.status(400).json('Note not found for updating by that ID');
        else
            res.status(200).json(
                okPacket
            );
    } catch (error) {
        console.error('[notes.controller][updateNote][Error] ', error);
        res.status(500).json({
            message: 'There was an error when updating notes'
        });
    }
};

export const deleteNote: RequestHandler = async (req: Request, res: Response) => {
    try {
        let noteId: number;
        console.log('req.body', req.body);
        // Check if request body or parameter is undefined
        if (req.body === undefined || req.body === null || req.body.id === undefined || req.body.id === null)
            noteId = -1;
        else
            noteId = req.body.id as number;

        console.log('noteId', noteId);
        if (!Number.isNaN(noteId)) {
            const response = await NoteDAO.deleteNote(noteId);

            if (response.affectedRows == 0)
                res.status(400).json("Note not found for deletion by that ID");
            else
                res.status(200).json(
                    response
                );
        } else {
            throw new Error("Integer expected for noteId");
        }

    } catch (error) {
        console.error('[notes.controller][deleteNote][Error] ', error);
        res.status(500).json({
            message: 'There was an error when deleting notes'
        });
    }
};

