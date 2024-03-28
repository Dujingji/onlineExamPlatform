import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/service/admin/admin.service';
import { ExamEditDialogComponent } from '../exam-edit-dialog/exam-edit-dialog/exam-edit-dialog.component';
import { CollegeAddDialogComponent } from './college-add-dialog/college-add-dialog.component';

@Component({
  selector: 'app-classroom-edit-dialog',
  templateUrl: './classroom-edit-dialog.component.html',
  styleUrls: ['./classroom-edit-dialog.component.scss']
})
export class ClassroomEditDialogComponent implements OnInit {
  submitForm : FormGroup
  classroom? : string
  college? : string
  studentNumber? : number
  examNumber? : number
  college_id? : string
  semester? : string

  constructor(private adminService: AdminService, private dialog : MatDialog, private router : Router, private dialogRef: MatDialogRef<ClassroomEditDialogComponent>){
    this.submitForm = new FormGroup({})
  }

  ngOnInit(): void {
    this.submitForm = new FormGroup({
      'classroom': new FormControl(this.classroom, [Validators.required]),
      'college': new FormControl(this.college, [Validators.required]),
      'id' : new FormControl(this.college_id, [Validators.required]),
      'semester': new FormControl(this.semester, [Validators.required])
    })
  }

  editCollege(){
    let dialogRef = this.dialog.open(CollegeAddDialogComponent, {})
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.submitForm.patchValue({'college' : result.name})
        this.submitForm.patchValue({'id' : result.id})
      }
    })
  }

  closeDialog(){
    this.dialogRef.close(this.submitForm.value);
  }
}
