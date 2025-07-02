import { Component, contentChild, OnInit } from '@angular/core';
import { NoteService } from '../../services/note-service';
import { Note } from '../../models/notes.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-note-list',
  imports: [CommonModule],
  templateUrl: './note-list.html',
  styleUrl: './note-list.css'
})
export class NoteList implements OnInit {

  notes!: Note[];
  notePromise!: Promise<Note[]>;
  selectedNote!: Note;
  constructor(private service: NoteService) {}

  async ngOnInit()
  {
    this.notes = await this.service.getNotes();
  }

  public onSelectNote(note: Note)
  {
    this.selectedNote = note;
    console.log("Note selected");
    }
}
