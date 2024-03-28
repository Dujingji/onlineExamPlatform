import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { AdminService, teacherDate } from 'src/app/service/admin/admin.service';
import { first } from 'rxjs';
import { ExamSubmitDialogComponent } from '../dialog/exam-submit-dialog/exam-submit-dialog.component';
import { DeleteDialogComponent } from '../dialog/delete-dialog/delete-dialog.component';
import { Teacher } from 'src/modules/teacher/teacher';
import { TeacherEditDialogComponent } from '../dialog/teacher-edit-dialog/teacher-edit-dialog.component';
import { TeacherPaperEditComponent } from '../dialog/teacher-paper-edit/teacher-paper-edit.component';


@Component({
  selector: 'app-teacher',
  templateUrl: './teacher.component.html',
  styleUrls: ['./teacher.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class TeacherComponent implements OnInit {
  constructor(private adminService: AdminService, private dialog: MatDialog, private router: Router) { }

  private teacherData?: Teacher[]

  displayedColumns: string[] = ['教师姓名', '密码', '专业类别', '学生数量', "按钮"];
  columnsToDisplayWithExpand = [...this.displayedColumns];

  ngOnInit(): void {
    this.fetchAllTeacher()

    this.adminService.teacherEntriesSubject.subscribe(() => {
      this.fetchAllTeacher()
    })
  }

  get dataSource() {
    return new MatTableDataSource<Teacher>(this.teacherData);
  }

  fetchAllTeacher() {
    this.adminService.getAllTeacherEntries()
      .subscribe((data) => {
        console.log(data)
        this.teacherData = data.data
      })
  }

  deletePaper(id: string, index: number) {
    let dialogRef = this.dialog.open(DeleteDialogComponent, {})
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.adminService.deleteTeacherExam(id).pipe(first()).subscribe((data) => { })
      }
    })
  }

  studentsCount(index : number) : number{
    if(this.teacherData)
      return this.teacherData[index].classroom
    return 0
  }

  onDeleteTeacher(id: string, classroom: string[]) {
    let dialogRef = this.dialog.open(DeleteDialogComponent, {})
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.adminService.deleteTeacher(id, classroom).pipe(first()).subscribe((data) => { })
      }
    })
  }

  onEditTeachersPaper(){
    let dialogRef = this.dialog.open(TeacherPaperEditComponent)

    dialogRef.afterClosed().subscribe(result =>{
      if(result){

      }
    })
  }

  onCreateTeacher() {
    let dialogRef = this.dialog.open(TeacherEditDialogComponent, {
    })

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const data: teacherInfoSubmitModel = ({
          username: result.username, major: result.major,
          password: result.password
        })
        this.adminService.addTeacher(data).pipe(first()).subscribe((data) => {
          this.adminService.setSubmitExamStatus(data.status)
        })
        let SumbitDialogRef = this.dialog.open(ExamSubmitDialogComponent)
        SumbitDialogRef.afterClosed().subscribe(result => {
          if (result) {
            this.adminService.setSubmitExamStatus(false)
          }
        })
      }
    })
  }
}

export interface teacherInfoSubmitModel {
  username: string,
  major: string,
  password: string,
}

export interface className {
  name: string;
  students: number;
}
