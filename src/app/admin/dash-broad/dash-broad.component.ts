import { examUpdateModel } from './../../../modules/exams/exam';
import { first, interval, takeWhile } from 'rxjs';
import { AdminService } from './../../service/admin/admin.service';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { exam } from 'src/modules/exams/exam';
import { MatDialog } from '@angular/material/dialog';
import { ExamEditDialogComponent } from '../dialog/exam-edit-dialog/exam-edit-dialog/exam-edit-dialog.component';
import { Route, Router } from '@angular/router';
import { ExamSubmitDialogComponent } from '../dialog/exam-submit-dialog/exam-submit-dialog.component';
import { DeleteDialogComponent } from '../dialog/delete-dialog/delete-dialog.component';
import { PaperEditDialogComponent } from '../dialog/paper-edit-dialog/paper-edit-dialog.component';
import { Time } from '@angular/common';
import { NgxSpinnerService } from 'ngx-spinner';


@Component({
  selector: 'app-dash-broad',
  templateUrl: './dash-broad.component.html',
  styleUrls: ['./dash-broad.component.scss'],
})
export class DashBroadComponent implements OnInit, AfterViewInit {

  constructor(private adminService: AdminService, private dialog: MatDialog, private spinner : NgxSpinnerService) { }

  private examsData?: exam[]
  private paperName: string[] = []
  public fileName: string = ''

  displayedColumns: string[] = ['考试名称', '所属专业', '试卷名', '学期', '考试时间', '截止时间', '报考人数', "自动评卷", "考试状态", "按钮"];

  ngOnInit(): void {
    this.fetchAllExams()
    this.updateExamsStatus()

    this.adminService.examEntriesSubject.subscribe(response => {
      this.fetchAllExams()
    })
  }

  date(data: any) {
    let temp = new Date(data).toLocaleString()
    return temp
  }

  get dataSource() {
    return new MatTableDataSource<exam>(this.examsData);
  }

  get name() : string[] {
    return this.paperName
  }

  fetchAllExams() {
    this.adminService.getAllExamEntries('','')
      .subscribe((data) => {
        this.examsData = data.exams;
        console.log(this.examsData)
        this.paperName = data.paperName
      })
  }

  updateExamsStatus() {
    this.adminService.updateExamStatus().pipe(first())
      .subscribe((data) => {

      })
  }

  onSave(description: string, major: string, date: Date, time: Time, paperId: string, isAuto : boolean) {
    this.adminService.postSubmitExam(description, major, date, time, paperId, isAuto).pipe(first())
      .subscribe((data) => {
        this.adminService.setSubmitExamStatus(data.status)
      })
  }

  updatePaperId(id: string, paperId: string) {
    this.adminService.updatePaperId(id, paperId).pipe(first())
      .subscribe((data) => {
        this.adminService.setSubmitExamStatus(data.status)
      })
  }

  deletePaperId(id: string, i : number) {
    this.paperName[i] = ''
    this.updatePaperId(id, "")
    let SumbitDialogRef = this.dialog.open(ExamSubmitDialogComponent)
    SumbitDialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.adminService.setSubmitExamStatus(false)
      }
    })
  }

  editPaperId(id: string, i : number) {
    let dialogRef = this.dialog.open(PaperEditDialogComponent, {})
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.updatePaperId(id, result.id)
        this.paperName[i] = result.name
        let SumbitDialogRef = this.dialog.open(ExamSubmitDialogComponent)
        SumbitDialogRef.afterClosed().subscribe(result => {
          if (result) {
            this.adminService.setSubmitExamStatus(false)
          }
        })
      }
    })
  }

  addExam() {
    let dialogRef = this.dialog.open(ExamEditDialogComponent, {})
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.onSave(result.description, result.major, result.date, result.time, result.paperId, result.isAuto)
        let SumbitDialogRef = this.dialog.open(ExamSubmitDialogComponent)
        SumbitDialogRef.afterClosed().subscribe(result => {
          if (result) {
            this.adminService.setSubmitExamStatus(false)
          }
        })
      }
    })
  }

  onDelete(id: string) {
    let dialogRef = this.dialog.open(DeleteDialogComponent, {})
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.adminService.deleteExam(id).pipe(first()).subscribe((data) => { })
      }
    })
  }


  EditExam(id: string, description: string, major: string, PaperId: string, date: Date, time: Time, end: Date, isAuto : boolean, vd_url : string[]) {
    let dialogRef = this.dialog.open(ExamEditDialogComponent, {
    })
    let instance = dialogRef.componentInstance;

    instance.description = description
    instance.major = major
    instance.paperId = PaperId
    instance.date = new Date(date)
    instance.time = time
    instance.isAuto = isAuto
    instance.end = new Date(end)
    instance.vd_url = vd_url
    instance.vd_url_length = vd_url.length

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const data: examUpdateModel = ({ description: result.description, major: result.major, date: result.date,
          PaperId: result.paperId, time: result.time, end: result.end, isAuto: result.isAuto, vd_url : result.vd_url})
        this.adminService.updateExam(id, data).pipe(first()).subscribe((data) => {
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

  test(){
    this.adminService.examDetailExport().subscribe(data =>{
      console.log(data)
    })
  }


  uploadVocabulary(event: any){
    const file: File = event.target.files[0];
    if (file) {
      this.fileName = file.name;
      const formData = new FormData();
      formData.append("file", file, this.fileName);
      const upload = this.adminService.uploadVocabulary(formData).subscribe(() => {

      })
    }
  }

  ngAfterViewInit() {

  }
}
