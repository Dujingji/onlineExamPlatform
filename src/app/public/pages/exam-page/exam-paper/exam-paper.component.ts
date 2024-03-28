import { questions, Paper, section } from '../../../../../modules/paper/paper';
import { ExamPaperService } from 'src/app/service/exam/exam-paper.service';
import { Component, EventEmitter, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subject, first, interval, takeUntil } from 'rxjs';
import * as ClassicEditor from '../../../../shared/ckeditor'
import { ChangeEvent } from '@ckeditor/ckeditor5-angular/ckeditor.component';

@Component({
  selector: 'app-exam-paper',
  templateUrl: './exam-paper.component.html',
  styleUrls: ['./exam-paper.component.scss'],
})
export class ExamPaperComponent implements OnInit {

  submitForm: FormGroup
  public exam_id: string | null = null
  public paperId?: string
  public selectedPaper = null;
  public questionPerPage: number = 3;
  public selectPage = 1;
  public data?: Paper;
  public selectedOption?: answerModel[]

  private notifier = new Subject<void>()
  public model : editorModel[] = []

  @Output() selectedTrigger = new EventEmitter<{ data: answerModel[], index: number}>()

  constructor(private Activatedroute: ActivatedRoute, private examPaperService: ExamPaperService) {
    this.submitForm = new FormGroup({})
  }

  public Editor = ClassicEditor;

  ngOnInit(): void {
    this.submitForm = new FormGroup({
      'answer': new FormControl(""),
    })
    this.exam_id = this.Activatedroute.snapshot.paramMap.get('id');
    this.retrieveData(this.exam_id)
    const time = interval(500).pipe(takeUntil(this.notifier)).subscribe(() =>{
      if(this.paperId && this.model.length != 0 && this.exam_id){
        this.retrieveUserData(localStorage.getItem("information")!, this.paperId, this.exam_id)
        this.notifier.next()
        this.notifier.complete()
      }
    })
  }

  onChange({ editor }: ChangeEvent, q: number) {
    if (this.selectedOption) {
      this.selectedOption[q].value = this.model[q].editorData
      this.selectedTrigger.emit({ data: this.selectedOption, index: q })
    }else if(this.data){
      this.selectedOption = new Array<answerModel>(this.data.length)
      for (let i = 0; i < this.selectedOption.length; i++) {
        this.selectedOption[i] = { value: '', multValue: 0, mark: -1}
      }
      this.selectedOption[q].value = this.model[q].editorData
      this.selectedTrigger.emit({ data: this.selectedOption, index: q })
    }
  }

  onReady(editor: any, q: number) {
    if (this.selectedOption) {
      editor.data.set(this.selectedOption[q].value)
    }
    if (editor.ui.view.editable.element.parentElement) {
      editor.ui.view.editable.element.parentElement.insertBefore(
        editor.ui.view.toolbar.element,
        editor.ui.view.editable.element
      );
    }
  }

  get section(): section[] {
    if (this.data) {
      return this.data.section
    }
    return []
  }

  currentIndex(n: number): number {
    let total = 0
    if (this.data) {
      for (let i = 0; i < n; i++) {
        total += this.data.n[i]
      }
    }
    return total
  }


  getQuestions(n: number): questions[] {
    if (this.data) {
      let start = 0
      let end = this.data.n[0]
      for (let i = 0; i < n; i++) {
        start += this.data.n[i]
        end += this.data.n[i + 1]
      }
      return this.data.questions.slice(start, end)
    }
    return []
  }

  retrieveUserData(user_id: string, paper_id: string, exam_id : string) {
    this.examPaperService.getUserAnswer(user_id, paper_id, exam_id).pipe(first())
      .subscribe((data) => {
        // for (let i = 0; i < data.userInfo.exam_answer.length; i++) {
        //   if (this.exam_id == data.userInfo.exam_answer[i].examId) {
        //     let answer_list: answerModel[] = []
        //     data.userInfo.exam_answer[i].answers.forEach((element) => {
        //       answer_list.push(element)
        //     })
        //     this.selectedOption = data.answer.answers
        //     this.selectedTrigger.emit({ data: this.selectedOption, index: -1 })
        //   }
        // }
        if(data.answer){
          this.selectedOption = data.answer.answer
          for(let i = 0; i < this.selectedOption.length;i ++){
            this.model[i].editorData = this.selectedOption[i].value
          }
          this.selectedTrigger.emit({ data: this.selectedOption, index: -1 })
        }
      })
  }

  retrieveData(exam_id: string | null): void {
    if (exam_id === null) {

    } else {
      this.examPaperService.getPaperEntry(exam_id, '').pipe(first())
        .subscribe((data) => {
          this.data = data.paper;
          for(let i = 0; i < this.data.length; i++){
            let temp : editorModel = {
              editorData: ''
            }
            this.model.push(temp)
          }
          this.paperId = data.paper_id
        })
    }
  }

  onChanged(q: number, i: number, type: number, event: any, mark: number, answer: string) {
    if (this.selectedOption == undefined && this.data) {
      this.selectedOption = new Array<answerModel>(this.data.length)
      for (let i = 0; i < this.selectedOption.length; i++) {
        this.selectedOption[i] = { value: '', multValue: 0, mark: -1}
      }
    }
    switch (type) {
      case 0:
        if (this.selectedOption && this.selectedOption[q].value == this.convert(i)) {
          this.selectedOption[q].value = ""
        }
        else {
          if (this.selectedOption) {
            this.selectedOption[q].value = this.convert(i)
          }
        }

        if(this.selectedOption && answer == this.selectedOption[q].value){
          this.selectedOption[q].mark = mark
        }else{
          if(this.selectedOption){
            this.selectedOption[q].mark = 0
          }
        }
        break;
      case 1:
        if (this.selectedOption) {
          this.selectedOption[q].value = event.target.value
          this.selectedOption[q].mark = mark
        }
        break;
      case 2:
        if (this.selectedOption && !this.calMultQ(i, this.selectedOption[q].multValue)) {
          this.selectedOption[q].multValue += Math.pow(10, i)
          this.selectedOption[q].value = this.convertMultQ(this.selectedOption[q].multValue)
        }
        else {
          if (this.selectedOption) {
            this.selectedOption[q].multValue -= Math.pow(10, i)
            if (this.selectedOption[q].multValue == 0) {
              this.selectedOption[q].value = ''
            } else {
              this.selectedOption[q].value = this.convertMultQ(this.selectedOption[q].multValue)
            }
          }
        }

        if(this.selectedOption && answer == this.selectedOption[q].value){
          this.selectedOption[q].mark = mark
        }else{
          if(this.selectedOption){
            this.selectedOption[q].mark = 0
          }
        }
        break;
    }
    if (this.selectedOption) this.selectedTrigger.emit({ data: this.selectedOption, index: q });
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

  calMultQ(i: number, a: number): boolean {
    if (Math.floor(a % Math.pow(10, i + 1) / Math.pow(10, i)) == 0) {
      return false
    }
    return true
  }

  convertMultQ(a: number): string {
    let result = ""
    for (let i = 0; i < 5; i++) {
      if (Math.floor(a % Math.pow(10, i + 1) / Math.pow(10, i)) != 0) {
        switch (i) {
          case 0: {
            result += "A";
            break;
          }
          case 1: {
            result += "B";
            break;
          }
          case 2: {
            result += "C";
            break;
          }
          case 3: {
            result += "D";
            break;
          }
          case 4: {
            result += "E";
            break;
          }
        }
      }
    }
    return result
  }

}

export interface answerModel {
  value: string
  multValue: number,
  mark: number
}

export interface editorModel{
  editorData: string
}
