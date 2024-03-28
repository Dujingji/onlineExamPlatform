import { ExamPaperService } from "src/app/service/exam/exam-paper.service";
import { Component } from '@angular/core';

@Component({
  selector: 'app-sumbit-dialog',
  templateUrl: './sumbit-dialog.component.html',
  styleUrls: ['./sumbit-dialog.component.scss']
})
export class SumbitDialogComponent {

  constructor(public examPaperService : ExamPaperService){

  }

  get status(){
    return this.examPaperService.examStatus
  }
}
