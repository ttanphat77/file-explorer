import { DocumentAddEditFolderDialogComponent } from './../shared/document-add-edit-folder-dialog/document-add-edit-folder-dialog.component';
import { MAT_DIALOG_DATA, MatDialogRef, MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material';
import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [
    CommonModule,
    // MatDialogModule
    SharedModule,

  ],
 
})
export class FileExplorerModule { }
