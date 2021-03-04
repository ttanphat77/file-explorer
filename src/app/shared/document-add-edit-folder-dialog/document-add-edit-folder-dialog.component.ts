// import { JobDocumentsService } from 'src/app/services/job-documents.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Component, OnInit, Inject } from '@angular/core';

@Component({
  selector: 'app-document-add-edit-folder-dialog',
  templateUrl: './document-add-edit-folder-dialog.component.html',
  styleUrls: ['./document-add-edit-folder-dialog.component.scss']
})
export class DocumentAddEditFolderDialogComponent implements OnInit {

  newFolderFrm: FormGroup;

  title: string = 'New Folder';
  name: string = '';

  submitted = false;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<DocumentAddEditFolderDialogComponent>,
    // private jobDocumentsService: JobDocumentsService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit() {
    if(this.data.id && this.data.type == 'edit') {
      // this.jobDocumentsService.getFolderById(this.data.id).subscribe(
      //   (rs) => {
      //     this.name = rs.name;
      //   }
      // )
      this.name = 'edit';
    }
    else if(!this.data.id && this.data.type == 'create') {
      this.name = '';
    } 

    this.newFolderFrm = this.fb.group({
      name: [this.name, [Validators.required]]
    })    
  }

  validateAllFormFields(formGroup: FormGroup) {         //{1}
    Object.keys(formGroup.controls).forEach(field => {  //{2}
      const control = formGroup.get(field);             //{3}
      if (control instanceof FormControl) {             //{4}
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof FormGroup) {        //{5}
        this.validateAllFormFields(control);            //{6}
      }
    });
  }

  submit() {
    // push new folder Form
    this.submitted = true;
    if (this.newFolderFrm.invalid) {
      this.validateAllFormFields(this.newFolderFrm); 
      return;
    }

    console.log(this.newFolderFrm.get('name').value);
    if(this.data.type == 'create') {
      this.data.onCreate(this.newFolderFrm.get('name').value);
    }
    else if(this.data.type == 'edit') {
      this.data.onUpdate(this.newFolderFrm.get('name').value);
    }
    
  }

  get newFolderControls() {
    return this.newFolderFrm.controls;
}

}
