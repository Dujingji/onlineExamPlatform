import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AdminService } from 'src/app/service/admin/admin.service';

@Component({
  selector: 'app-college-edit-dialog',
  templateUrl: './college-edit-dialog.component.html',
  styleUrls: ['./college-edit-dialog.component.scss']
})
export class CollegeEditDialogComponent implements OnInit{
  submitForm : FormGroup
  name? : string

  constructor(private adminService: AdminService, private dialog : MatDialog, private dialogRef: MatDialogRef<CollegeEditDialogComponent>){
    this.submitForm = new FormGroup({})
  }

  ngOnInit(): void {
    this.submitForm = new FormGroup({
      'name': new FormControl(this.name, [Validators.required]),
    })
  }

  closeDialog(){
    this.dialogRef.close(this.submitForm.value);
  }
}
