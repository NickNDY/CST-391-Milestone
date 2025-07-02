import { Component, OnInit } from '@angular/core';
import { Note } from '../../models/notes.model';
import { URLSearchParams } from 'url';
import { Router } from '@angular/router';
import { NoteService } from '../../services/note-service';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-note-update',
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './note-update.html',
  styleUrl: './note-update.css'
})

export class NoteUpdate implements OnInit {

  constructor(private router: Router, private service: NoteService) {}

  selectedNote: Note = {
    noteId: -1,
    title: "None",
    content: "None",
    creation_date: "None"
  };

  async ngOnInit() {
    const urlAddress: string = this.router.url;
    console.log("Updating Note at URL: " + urlAddress);
    const url = new URL('http://localhost:4200' + urlAddress);
    const urlParams = new URLSearchParams(url.searchParams);
    const idString: string | null = urlParams.get('id');
    if (idString === null) {
      this.router.navigate(['/notes']);
      return;
    }
      
    const id: number = parseInt(idString as string);

    console.log("Updating Note by ID: " + id);

    this.selectedNote = await this.service.getNoteById(id);
  }

  onSubmit() {
    console.log("Submitted Note: ID=" + this.selectedNote.noteId + ", Title=" + this.selectedNote.title)
    this.router.navigate(['/notes']);
  }
}
