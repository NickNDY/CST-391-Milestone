import { Router } from 'express';
import * as NotesController from '../rest/notes.controller';
import { App } from '../../app';

const router = Router();
router
    .route('/api/notes')
    .get(NotesController.readNotes);

router
    .route('/api/notes')
    .post(NotesController.createNote);

router
    .route('/api/notes')
    .put(NotesController.updateNote);

router
    .route('/api/notes')
    .delete(NotesController.deleteNote);

export default router;