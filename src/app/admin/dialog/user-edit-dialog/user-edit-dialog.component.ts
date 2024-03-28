import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/service/admin/admin.service';
import { ExamEditDialogComponent } from '../exam-edit-dialog/exam-edit-dialog/exam-edit-dialog.component';
import { UserEditClassroomDialogComponent } from './user-edit-classroom-dialog/user-edit-classroom-dialog.component';
import { major } from 'src/modules/major/major';

@Component({
  selector: 'app-user-edit-dialog',
  templateUrl: './user-edit-dialog.component.html',
  styleUrls: ['./user-edit-dialog.component.scss']
})
export class UserEditDialogComponent {
  submitForm : FormGroup
  username? : string
  password? : string
  major? : string
  classroom? : string
  majorData : major[] =[]
  semester? : number
  graduate? : Date
  className : string = ''
  std_name? : string

  constructor(private adminService: AdminService, private dialog : MatDialog, private router : Router, private dialogRef: MatDialogRef<UserEditDialogComponent>){
    this.submitForm = new FormGroup({})
  }

  ngOnInit(): void {
    this.submitForm = new FormGroup({
      'username': new FormControl(this.username, [Validators.required]),
      'password': new FormControl(this.password, [Validators.required]),
      'major' : new FormControl(this.major, [Validators.required]),
      'classroom' : new FormControl(this.classroom),
      'semester' : new FormControl(this.semester, [Validators.required]),
      'graduate' : new FormControl(this.graduate, [Validators.required]),
      'std_name' : new FormControl(this.std_name, [Validators.required])
    })

    this.adminService.getAllMajorEntries().subscribe(data =>{
      this.majorData = data.major
    })
  }

  closeDialog(){
    this.dialogRef.close(this.submitForm.value);
  }

  editClassroom(){
    let dialogRef = this.dialog.open(UserEditClassroomDialogComponent)
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.submitForm.patchValue({'classroom' : result.id})
        this.className = result.name
      }
    })
  }
}
