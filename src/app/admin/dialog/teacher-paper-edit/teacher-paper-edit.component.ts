
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AdminService } from './../../../service/admin/admin.service';
import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-teacher-paper-edit',
  templateUrl: './teacher-paper-edit.component.html',
  styleUrls: ['./teacher-paper-edit.component.scss']
})

export class TeacherPaperEditComponent implements OnInit {
  submitForm: FormGroup
  exam : string = ''
  college : string = ''
  teacher : string[] = []
  classroom : string[] = []
  type : number = 0


  constructor(private adminService: AdminService, private dialogRef: MatDialogRef<TeacherPaperEditComponent>) {
    this.submitForm = new FormGroup({})
  }


  ngOnInit(): void {
    this.submitForm = new FormGroup({
      'exam_name': new FormControl(this.exam, [Validators.required]),
      'college' : new FormControl(this.college, [Validators.required]),
      'teacher' : new FormControl(this.college, [Validators.required]),
      'classroom' : new FormControl(this.college, [Validators.required])
    })
    this.fetchAllExams()

    this.adminService.examEntriesSubject.subscribe(response => {
      this.fetchAllExams()
    })
  }

  fetchAllExams() {
    this.adminService.updateTeacherExam(this.teacher, this.type, this.college, this.exam, this.classroom)
      .subscribe((data) => {

      })
  }
  closeDialog(){
    this.dialogRef.close(this.submitForm.value);
  }
}
