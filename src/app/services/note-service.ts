import { Injectable } from '@angular/core';
import * as NoteDAO from '../data/notes.dao';
import { Note } from '../models/notes.model';

@Injectable({
  providedIn: 'root'
})
export class NoteService {



  constructor() { }

  public async getNotes(): Promise<Note[]> {
    try {
      const result = await NoteDAO.readNotes();
      return result;
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
    return Promise.reject(new Error("Error fetching data."));
  }

  public async getNoteById(noteId: number): Promise<Note> {
    try {
      const result = await NoteDAO.readNotesByNoteId(noteId);
      if (result.length == 1)
      return result.at(0) as Note;
    } catch (error) {
      console.error("Error fetching note: ", error);
    }
    return Promise.reject(new Error("Error fetching note."));
  }

  public async updateNote(note: Note): Promise<void> {
    try {
      const result = await NoteDAO.updateNote(note);
    } catch(error) {
      console.error("Error updating note.");
    }
  }

  public async deleteNote(noteId: number): Promise<void> {
    try {
      const result = await NoteDAO.deleteNote(noteId);
    } catch(error) {
      console.error("Error deleting note.");
    }
  }
}
