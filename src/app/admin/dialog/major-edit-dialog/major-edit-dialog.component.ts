import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';


@Component({
  selector: 'app-major-edit-dialog',
  templateUrl: './major-edit-dialog.component.html',
  styleUrls: ['./major-edit-dialog.component.scss']
})
export class MajorEditDialogComponent implements OnInit{
  submitForm : FormGroup
  name? : string
  type? : number
  arrg? : string
  foundList : string[] = []

  public majorData : string[] = ['英语', '政治', '专业基础课', '专业综合课']

  constructor(private dialogRef: MatDialogRef<MajorEditDialogComponent>){
    this.submitForm = new FormGroup({})
  }

  ngOnInit(): void {
    this.submitForm = new FormGroup({
      'name': new FormControl('', [Validators.required]),
      'ID' : new FormControl(''),
      'type' : new FormControl(''),
      'arrg' : new FormControl(''),
    })
  }

  closeDialog(){
    this.dialogRef.close(this.submitForm.value);
  }
}
