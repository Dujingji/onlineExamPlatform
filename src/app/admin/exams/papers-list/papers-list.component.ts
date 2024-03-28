import { Component, OnInit, AfterViewInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Subscription, first } from 'rxjs';
import { AdminService } from 'src/app/service/admin/admin.service';
import { Paper, questions } from 'src/modules/paper/paper';
import { style, trigger, state, transition, animate } from '@angular/animations';
import { PaperEditerDialogComponent } from '../../dialog/paper-editer-dialog/paper-editer-dialog.component';
import { ExamSubmitDialogComponent } from '../../dialog/exam-submit-dialog/exam-submit-dialog.component';
import { DeleteDialogComponent } from '../../dialog/delete-dialog/delete-dialog.component';
import { QuestionEditDialogComponent } from '../../dialog/question-edit-dialog/question-edit-dialog.component';
import { HttpEventType } from '@angular/common/http';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-papers-list',
  templateUrl: './papers-list.component.html',
  styleUrls: ['./papers-list.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class PapersListComponent implements OnInit, AfterViewInit {
  constructor(private adminService: AdminService, private dialog: MatDialog, private router: Router) { }

  private papersData: Paper[] = []
  private fetch = false
  fileName: string = ''
  uploadProgress: number | null = null;
  uploadSub: Subscription | null = null;


  displayedColumns: string[] = ['试卷名称', '所属专业', '试卷ID', "题目预览", "题目数量", '做题时长', "按钮"];
  columnsToDisplayWithExpand = [...this.displayedColumns, 'expand'];
  expandedElement: Paper | null = null;


  ngOnInit(): void {
    this.fetchAllPapers()

    this.adminService.paperEntriesSubject.subscribe(response => {

      this.fetchAllPapers()
    })
  }

  get dataSource() {
    return new MatTableDataSource<Paper>(this.papersData);
  }

  fetchAllPapers() {
    this.adminService.getAllPaperEntries()
      .subscribe((data) => {
        console.log(data)
        this.papersData = data.papers;
      })
  }

  onEditQuestion(id: string, index: string, question: string, mark: number, comment: string, selections: string[], type: string, answer: string) {
    let dialogRef = this.dialog.open(QuestionEditDialogComponent, {
    })

    let instance = dialogRef.componentInstance;

    instance.question = question
    instance.selections = selections
    instance.selection_length = selections.length
    instance.type = type
    instance.mark = mark
    instance.comment = comment
    instance.answer = answer

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const data: questions = ({
          question: result.details.question, type: result.details.type, mark: result.details.mark,
          selection: result.selections, comment: result.details.comment, answer: result.details.answer
        })
        this.adminService.updateQuestion(id, index, data).pipe(first()).subscribe((data) => {
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

  getHr(n: number): number {
    return Math.floor(n / 3600)
  }

  getMin(n: number): number {
    return Math.floor(n % 3600 / 60)
  }

  onEditPaper(id: string, name: string, major: string, section: string[], timer: number) {
    let dialogRef = this.dialog.open(PaperEditerDialogComponent, {
    })
    let instance = dialogRef.componentInstance;

    instance.name = name
    instance.major = major
    instance.section = section
    instance.timer = timer

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const data: paperUpdateMode = ({ name: result.name, major: result.major, timer: result.timer, section: result.section })
        this.adminService.updatePaper(id, data).pipe(first()).subscribe((data) => {
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

  onCreateQuestion(id: string) {
    let dialogRef = this.dialog.open(QuestionEditDialogComponent, {
    })

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const data: questions = ({
          question: result.details.question, type: result.details.type, mark: result.details.mark,
          selection: result.selections, comment: result.details.comment, answer: result.details.answer
        })
        this.adminService.addQuestion(id, data).pipe(first()).subscribe((data) => {
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

  onDownloadTemp() {
    this.adminService.downloadPaperTemp().subscribe(data => {
      let downloadURL = window.URL.createObjectURL(data);
      saveAs(downloadURL)
    })
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];

    if (file) {
      this.fileName = file.name;

      const formData = new FormData();
      formData.append("file", file, this.fileName);
      const upload = this.adminService.uploadPaper(formData)
      this.uploadSub = upload.subscribe((event) => {
        if (event.type == HttpEventType.UploadProgress && event.total) {
          this.uploadProgress = Math.round(100 * (event.loaded / event.total));
          this.reset()
        }
      })
    }
  }

  cancelUpload() {
    if (this.uploadSub) this.uploadSub.unsubscribe();
    this.reset();
  }

  reset() {
    this.uploadProgress = null;
    this.uploadSub = null;
  }

  onCreatePaper() {
    let dialogRef = this.dialog.open(PaperEditerDialogComponent, {
    })

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const data: paperUpdateMode = ({ name: result.name, major: result.major, timer: result.timer, section: result.section })
        this.adminService.addPaper(data).pipe(first()).subscribe((data) => {
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

  onDeletePaper(id: string) {
    let dialogRef = this.dialog.open(DeleteDialogComponent, {})
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.adminService.deletePaper(id).pipe(first()).subscribe((data) => { })
      }
    })
  }

  onDeleteQuestion(id: string, index: number) {
    let dialogRef = this.dialog.open(DeleteDialogComponent, {})
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.adminService.deleteQuestion(id, index).pipe(first()).subscribe((data) => { })
      }
    })
  }

  paperView(id : string){

  }

  ngAfterViewInit() {

  }
}

export interface paperUpdateMode {
  name: string,
  major: string,
  section: string[],
  timer: number
}

export interface questionUpdateMode {
  question: string,
  type: string,
  selection: number,
  mark: number,
  comment: string
}
