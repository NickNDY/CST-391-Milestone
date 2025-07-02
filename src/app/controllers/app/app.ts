import express, { Request, Response}  from 'express';
import notesRouter from '../../notes/notes.routes';
import helmet from 'helmet';
import cors from 'cors';
import logger from '../../middleware/logger.middleware';
import dotenv from 'dotenv';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NoteService } from '../../services/note-service';
import { Note } from '../../models/notes.model';

let config = dotenv.config();
if (typeof config.error !== 'undefined')
  console.log("[app.ts]Environment error: " + config.error);
if (typeof config.parsed !== 'undefined')
  console.log("[app.ts]Environment parse: " + config.parsed);

const app = express(); // Setting app to express application
const port = parseInt(process.env['PORT'] as string); // Define listening port

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());

console.log(process.env['MY_SQL_DB_HOST']);

if (process.env['NODE_ENV'] == 'development') {
    app.use(logger);
    console.log(process.env['GREETING'] + ' in dev mode')
}

app.get('/', (req, res) => {
  res.send('Hello from the root!');
})

app.post('/notes/post', (req: Request, res: Response) => {
  const formData: FormData | null = req.body;

  if (formData === null || formData === undefined ||
      formData.get('noteId') === null || formData.get('noteId') === undefined ||
      formData.get('title') === null || formData.get('title') === undefined ||
      formData.get('creation_date') === null || formData.get('creation_date') === undefined ||
      formData.get('content') === null || formData.get('content') === undefined) {
    res.redirect(req.url);
  }

  let service: NoteService = new NoteService();
  
  let note: Note = {
    noteId: parseInt(formData!.get('noteId') as string),
    title: formData!.get('title') as string,
    content: formData!.get('content') as string,
    creation_date: formData!.get('creation_date') as string
  };

  service.updateNote(note);
  console.log("Updated Note");
  res.redirect('/notes');
});

app.use('/', [notesRouter]);

app.listen(port, () => {
    console.log('Example app listening at http://localhost:%d', port);
});


@Component({
  selector: 'app-root',
  imports: [RouterOutlet,
    FormsModule,
    CommonModule
  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected title = 'notes-app';
}
