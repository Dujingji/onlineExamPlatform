import { Subject, first } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { AdminService } from 'src/app/service/admin/admin.service';
import { PaperEditDialogComponent } from '../paper-edit-dialog/paper-edit-dialog.component';
import { MatTableDataSource } from '@angular/material/table';
import { exam } from 'src/modules/exams/exam';

@Component({
  selector: 'app-classroom-exam-edit-dialog',
  templateUrl: './classroom-exam-edit-dialog.component.html',
  styleUrls: ['./classroom-exam-edit-dialog.component.scss']
})

export class ClassroomExamEditDialogComponent implements OnInit{

  id? : string
  currentExamId : string[] =[]
  private reminderExamData : exam[] = []

  displayedColumns: string[] = ['考试名称', '考试科目', "按钮"];
  private examData : exam[] = []

  private tableListSubject = new Subject<void>();

  constructor(private adminService : AdminService, private dialogRef: MatDialogRef<PaperEditDialogComponent>){}


  ngOnInit(): void {
    this.fetchAllExams()

    this.adminService.classroomEntriesSubject.subscribe((response) =>{
      this.examData = []
      this.reminderExamData = []
      this.fetchAllExams()
    })
  }

  get dataSource() {
    return new MatTableDataSource<exam>(this.examData);
  }
  get dataSourceR() {
    return new MatTableDataSource<exam>(this.reminderExamData);
  }

  fetchAllExams(){
    this.adminService.getAllExamEntries('','')
    .subscribe(async (data) => {
      await Promise.all(data.exams.map(async (element) => {
        let find = this.currentExamId.indexOf(element._id)
        if(find > -1){
          this.examData.push(element)
        }else{
          this.reminderExamData.push(element)
        }
      }))
    })
  }

  onDelete(examId : string){
    if(this.id){
      this.adminService.deleteClassroomExam(this.id, examId).pipe(first()).subscribe(() =>{
        let find = this.currentExamId.indexOf(examId)
        this.currentExamId.splice(find, 1)
      })
    }
  }

  onAdded(examId : string){
    if(this.id){
      this.adminService.updateClassroom(this.id, {
        classroom: '',
        students: [],
        exams: [examId],
        college : '',
        semester :'',
        teacher:''
      }).pipe(first()).subscribe(() =>{
        this.currentExamId.push(examId)
      })
    }
  }
}
