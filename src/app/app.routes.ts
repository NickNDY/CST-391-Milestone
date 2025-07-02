import { Routes } from '@angular/router';
import { NoteList } from './controllers/note-list/note-list';
import { NoteCreate } from './controllers/note-create/note-create';
import { NoteSearch } from './controllers/note-search/note-search';
import { Index } from './controllers/index';
import { NoteUpdate } from './controllers/note-update/note-update';
import { NoteDelete } from './controllers/note-delete/note-delete';

export const routes: Routes = [
    { path: 'notes', component: NoteList, pathMatch: 'full' },
    { path: 'notes/create', component: NoteCreate, pathMatch: 'full' },
    { path: 'notes/search', component: NoteSearch, pathMatch: 'full' },
    { path: 'notes/update', component: NoteUpdate, pathMatch: 'prefix' },
    { path: 'notes/delete', component: NoteDelete, pathMatch: 'prefix'},
    { path: '', redirectTo: 'index', pathMatch: 'full' },
    { path: 'index', component: Index, pathMatch: 'full' }
];
