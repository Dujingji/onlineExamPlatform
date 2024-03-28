import { animate, style, transition, trigger, state } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/service/admin/admin.service';
import { classroom } from 'src/modules/classroom/classroom';
import { ClassroomEditDialogComponent } from '../dialog/classroom-edit-dialog/classroom-edit-dialog.component';
import { first } from 'rxjs';
import { ExamSubmitDialogComponent } from '../dialog/exam-submit-dialog/exam-submit-dialog.component';
import { DeleteDialogComponent } from '../dialog/delete-dialog/delete-dialog.component';
import { ClassroomExamEditDialogComponent } from '../dialog/classroom-exam-edit-dialog/classroom-exam-edit-dialog.component';
import * as saveAs from 'file-saver';

@Component({
  selector: 'app-classroom',
  templateUrl: './classroom.component.html',
  styleUrls: ['./classroom.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class ClassroomComponent implements OnInit{
  constructor(private adminService: AdminService, private dialog: MatDialog, private router: Router) { }

  private classroomData: classdata[] = []


  displayedColumns: string[] = ['班级名称', '教学点','学期','学生数量', '考试详情', "按钮"];
  columnsToDisplayWithExpand = [...this.displayedColumns, 'expand'];
  expandedElement: classroom | null = null;

  ngOnInit(): void {
    this.fetchAllClassroom()

    this.adminService.classroomEntriesSubject.subscribe(() => {
      this.fetchAllClassroom()
    })
  }

  get dataSource() {
    return new MatTableDataSource<classdata>(this.classroomData);
  }

  fetchAllClassroom() {
    this.adminService.getAllClassroomEntries()
      .subscribe((data) => {
        console.log(data)
        this.classroomData = data.data
      })
  }

  onEditExam(id: string, exams: string[]) {
    let dialogRef = this.dialog.open(ClassroomExamEditDialogComponent, {
    })

    let instance = dialogRef.componentInstance;
    instance.id = id
    instance.currentExamId = exams

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        let SumbitDialogRef = this.dialog.open(ExamSubmitDialogComponent)
        SumbitDialogRef.afterClosed().subscribe(result => {
          if (result) {
            this.adminService.setSubmitExamStatus(false)
          }
        })
      }
    })
  }

  onCreateClassroom() {
    let dialogRef = this.dialog.open(ClassroomEditDialogComponent, {
    })

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const data: classroom = {
          classroom: result.classroom,
          students: [],
          exams: [],
          college : result.id,
          semester: result.semester,
          teacher:''
        }
        this.adminService.addClassroom(data).pipe(first()).subscribe((data) => {
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

  onExportData(classroom_id : string){
    this.adminService.downloadClassroomData(classroom_id).subscribe(data => {
      let downloadURL = window.URL.createObjectURL(data);
      saveAs(downloadURL)
    })
  }

  onDeleteClassroom(id: string) {
    let dialogRef = this.dialog.open(DeleteDialogComponent, {})
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.adminService.deleteClassroom(id).pipe(first()).subscribe((data) => { })
      }
    })
  }

}

export interface classdata{
  classroom : classroom
  college : string
}

