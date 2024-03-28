import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/service/admin/admin.service';
import { questions } from 'src/modules/paper/paper';
import { QuestionEditDialogComponent } from 'src/app/admin/dialog/question-edit-dialog/question-edit-dialog.component';
import { first } from 'rxjs';
import { ExamSubmitDialogComponent } from 'src/app/admin/dialog/exam-submit-dialog/exam-submit-dialog.component';
import { DeleteDialogComponent } from 'src/app/admin/dialog/delete-dialog/delete-dialog.component';
import { MatTableDataSource } from '@angular/material/table';
import { exericseDetailModel } from 'src/modules/exercise/exercise-detail';

@Component({
  selector: 'app-exercise-question-list',
  templateUrl: './exercise-question-list.component.html',
  styleUrls: ['./exercise-question-list.component.scss']
})


export class ExerciseQuestionListComponent implements OnInit{

  @Input() id : string = ""


  public questionsData : questions[] = []
  displayedExpamdColumns : string[] = ['序号', '题目', '解析','答案','分值', '操作']

  constructor(private adminService: AdminService, private dialog: MatDialog, private router: Router) {

  }

  ngOnInit(): void {
    this.fetchAllQuestions()

    this.adminService.exerciseQEntriesSubject.subscribe(response => {
      this.fetchAllQuestions()
    })
  }
  get dataSource() {
    return new MatTableDataSource<questions>(this.questionsData);
  }

  fetchAllQuestions() {
    if(this.id){
      this.adminService.getAllExerciseQuestionsEntries(this.id)
      .subscribe((data) => {
        this.questionsData = data.questions;
      })
    }
  }

  onEditQuestion(id : string, index : string, question : string, mark : number, comment : string, selections: string[], type : string, answer : string){
    let dialogRef = this.dialog.open(QuestionEditDialogComponent, {
    })

    let instance = dialogRef.componentInstance;

    instance.aM.editorData = answer
    instance.cM.editorData = comment
    instance.model.editorData = question
    instance.question = question
    instance.selections = selections
    instance.selection_length = selections.length
    instance.type = type
    instance.mark = mark
    instance.comment = comment
    instance.answer = answer

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const data:  questions= ({ question : result.details.question, type: result.details.type, mark: result.details.mark,
          selection: result.selections, comment : result.details.comment, answer : result.details.answer})
        this.adminService.updateExerciseQuestion(id, index, data).pipe(first()).subscribe((data) => {
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

  onDeleteQuestion(id : string, index : number){
    let dialogRef = this.dialog.open(DeleteDialogComponent, {})
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.adminService.deleteExerciseQuestion(id ,index).pipe(first()).subscribe((data) => { })
      }
    })
  }
}
