import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { DialogComponent } from '../dialog.component';

@Component({
  selector: 'app-feedback-dialog',
  templateUrl: './feedback-dialog.component.html',
  styleUrls: ['./feedback-dialog.component.scss']
})
export class FeedbackDialogComponent {
  submitForm : FormGroup

  constructor(private dialogRef : MatDialogRef<DialogComponent>){
    this.submitForm = new FormGroup({})
  }

  ngOnInit(): void {
    this.submitForm = new FormGroup({
      'feedback': new FormControl("", [Validators.required])
    })
  }

  closeDialog() {
    this.dialogRef.close(this.submitForm.value.feedback);
  }

}
