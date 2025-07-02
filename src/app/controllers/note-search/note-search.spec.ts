import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoteSearch } from './note-search';

describe('NoteSearch', () => {
  let component: NoteSearch;
  let fixture: ComponentFixture<NoteSearch>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NoteSearch]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NoteSearch);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
