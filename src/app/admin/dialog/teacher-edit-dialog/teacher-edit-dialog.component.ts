import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AdminService } from 'src/app/service/admin/admin.service';
import { major } from 'src/modules/major/major';

@Component({
  selector: 'app-teacher-edit-dialog',
  templateUrl: './teacher-edit-dialog.component.html',
  styleUrls: ['./teacher-edit-dialog.component.scss']
})
export class TeacherEditDialogComponent {
  submitForm : FormGroup
  username? : string
  password? : string
  major? : string
  majorData : major[] =[]


  constructor(private adminService: AdminService, private dialog : MatDialog, private dialogRef: MatDialogRef<TeacherEditDialogComponent>){
    this.submitForm = new FormGroup({})
  }

  ngOnInit(): void {
    this.submitForm = new FormGroup({
      'username': new FormControl(this.username, [Validators.required]),
      'password': new FormControl(this.password, [Validators.required]),
      'major' : new FormControl(this.major, [Validators.required]),
    })

    this.adminService.getAllMajorEntries().subscribe(data =>{
      this.majorData = data.major
    })
  }

  closeDialog(){
    this.dialogRef.close(this.submitForm.value);
  }
}
