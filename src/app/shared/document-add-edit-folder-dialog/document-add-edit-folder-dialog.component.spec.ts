import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentAddEditFolderDialogComponent } from './document-add-edit-folder-dialog.component';

describe('DocumentAddEditFolderDialogComponent', () => {
  let component: DocumentAddEditFolderDialogComponent;
  let fixture: ComponentFixture<DocumentAddEditFolderDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DocumentAddEditFolderDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentAddEditFolderDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
