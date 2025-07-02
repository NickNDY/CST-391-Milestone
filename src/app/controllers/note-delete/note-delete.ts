import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NoteService } from '../../services/note-service';

@Component({
  selector: 'app-note-delete',
  imports: [],
  templateUrl: './note-delete.html',
  styleUrl: './note-delete.css'
})
export class NoteDelete implements OnInit, AfterViewInit {

  constructor(private router: Router, private service: NoteService) {}

  ngAfterViewInit(): void {
    this.router.navigate(['/notes']);
  }

  async ngOnInit() {
    const urlAddress: string = this.router.url;
    console.log("Deleting Note at URL: " + urlAddress);
    const url = new URL('http://localhost:4200' + urlAddress);
    const urlParams = new URLSearchParams(url.searchParams);
    const idString: string | null = urlParams.get('id');
    if (idString === null) {
      this.router.navigate(['/notes']);
      return;
    }
      
    const id: number = parseInt(idString as string);

    console.log("Deleting Note by ID: " + id);

    const result = await this.service.deleteNote(id);
  }
}
