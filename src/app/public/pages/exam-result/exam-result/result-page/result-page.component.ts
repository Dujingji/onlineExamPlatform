import { ExamPaperService } from 'src/app/service/exam/exam-paper.service';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Paper, questions, section } from 'src/modules/paper/paper';
import { ActivatedRoute } from '@angular/router';
import { Subject, first, interval, takeUntil } from 'rxjs';
import { answerModel } from '../../../exam-page/exam-paper/exam-paper.component';
import * as ClassicEditor from '../../../../../shared/ckeditor'

@Component({
  selector: 'app-result-page',
  templateUrl: './result-page.component.html',
  styleUrls: ['./result-page.component.scss']
})
export class ResultPageComponent implements OnInit {
  public exam_id?: string
  public paper_id?: string
  public selectedPaper = null;
  public questionPerPage: number = 3;
  public selectPage = 1;
  public paperData?: Paper;
  public selectedOption: answerModel[] = []

  private notifier = new Subject<void>()

  public Editor = ClassicEditor

  @Output() eventTrigger = new EventEmitter<answerModel[]>()

  constructor(private Activatedroute: ActivatedRoute, private examPaperService: ExamPaperService) {
  }

  onReady(editor: any) {
    if (editor.ui.view.editable.element.parentElement) {
      editor.ui.view.editable.element.parentElement.insertBefore(
        editor.ui.view.toolbar.element,
        editor.ui.view.editable.element
      );
    }
  }

  ngOnInit(): void {
    this.exam_id = this.Activatedroute.snapshot.paramMap.get('id')!;
    this.retrieveData(this.exam_id)

    const time = interval(500).pipe(takeUntil(this.notifier)).subscribe(() => {
      if (this.paper_id && this.exam_id) {
        this.retrieveResult(localStorage.getItem('information')!, this.paper_id, this.exam_id)
        this.notifier.next()
        this.notifier.complete()
      }
    })
  }

  get section(): section[] {
    if (this.paperData) {
      return this.paperData.section
    }
    return []
  }

  get mark(): number[] {
    if (!this.paperData) {
      return [0]
    }
    let result: number[] = []
    for (let i = 0; i < this.selectedOption.length; i++) {
      // if (this.selectedOption[i].value == this.paperData.questions[i].answer) {
      //   result.push(this.paperData.questions[i].mark)
      // } else {
      //   result.push(0)
      // }
      result.push(this.selectedOption[i].mark)
    }
    return result
  }

  get selected() {
    if (this.paperData && this.selectedOption.length != 0) {
      return this.selectedOption
    }
    return undefined
  }

  getAnswer(i: number): number {
    if (this.paperData) {
      return this.convertN(this.paperData.questions[i].answer)
    }
    return 0
  }

  calMultQ(i: number, a: number): boolean {
    if (Math.floor(a % Math.pow(10, i + 1) / Math.pow(10, i)) == 0) {
      return false
    }
    return true
  }

  getMultAnswer(i: number, q: number): boolean {
    if (this.selectedOption) {

    }
    return false
  }

  getQuestions(n: number): questions[] {
    if (this.paperData) {
      let start = 0
      let end = this.paperData.n[0]
      for (let i = 0; i < n; i++) {
        start += this.paperData.n[i]
        end += this.paperData.n[i + 1]
      }
      return this.paperData.questions.slice(start, end)
    }
    return []
  }

  currentIndex(n: number): number {
    let total = 0
    if (this.paperData) {
      for (let i = 0; i < n; i++) {
        total += this.paperData.n[i]
      }
    }
    return total
  }

  retrieveResult(user: string, paper_id: string, exam_id : string) {
    this.examPaperService.getUserAnswer(user, paper_id, exam_id).pipe(first())
      .subscribe((data) => {

        // for (let i = 0; i < data.userInfo.exam_answer.length; i++) {
        //   if (this.exam_id == data.userInfo.exam_answer[i].examId) {
        //     let answer_list: answerModel[] = []
        //     data.userInfo.exam_answer[i].answers.forEach((element) => {
        //       answer_list.push(element)
        //     })
        //     this.selectedOption = answer_list
        //     this.eventTrigger.emit(this.selectedOption)
        //   }
        // }
        this.selectedOption = data.answer.answer
        this.eventTrigger.emit(this.selectedOption)
      })
  }

  retrieveData(id: string) {
    this.examPaperService.getPaperEntry(id, '')
      .subscribe((data) => {
        this.paperData = data.paper;
        this.paper_id = data.paper_id;
      })
  }

  convertN(input: string): number {
    let r = 0;
    switch (input) {
      case "A": {
        r = 0;
        break;
      }
      case "B": {
        r = 1;
        break;
      }
      case "C": {
        r = 2;
        break;
      }
      case "D": {
        r = 3;
        break;
      }
      case "E": {
        r = 4;
        break;
      }
    }
    return r;
  }

  convert(input: number): string {
    let r = "";
    switch (input) {
      case 0: {
        r = "A";
        break;
      }
      case 1: {
        r = "B";
        break;
      }
      case 2: {
        r = "C";
        break;
      }
      case 3: {
        r = "D";
        break;
      }
      case 4: {
        r = "E";
        break;
      }
    }
    return r;
  }
}
