import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-exam-urls-edit-dialog',
  templateUrl: './exam-urls-edit-dialog.component.html',
  styleUrls: ['./exam-urls-edit-dialog.component.scss']
})

export class ExamUrlsEditDialogComponent implements OnInit{

  submitForm : FormGroup
  urls_list : string[] = []
  urls_length? : number

  constructor(private dialog: MatDialog, private formBuilder: FormBuilder,private dialogRef: MatDialogRef<ExamUrlsEditDialogComponent>) {
    this.submitForm = this.formBuilder.group({
      selections: this.formBuilder.array([])
    })
  }

  get selections() {
    return this.submitForm.controls["selections"] as FormArray;
  }

  ngOnInit(): void {
    if(this.urls_length && this.urls_list.length !== this.urls_length){
      this.urls_list = new Array<string>(this.urls_length).fill('')
    }
    this.urls_list.forEach((element) => {
      this.selections.push(this.formBuilder.group({
        selection: new FormControl(element, [Validators.required]),
      }))
    });
  }

  closeDialog() {
    this.dialogRef.close(this.selections.controls);
  }
}
