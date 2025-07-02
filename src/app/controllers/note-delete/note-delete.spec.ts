import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoteDelete } from './note-delete';

describe('NoteDelete', () => {
  let component: NoteDelete;
  let fixture: ComponentFixture<NoteDelete>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NoteDelete]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NoteDelete);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
