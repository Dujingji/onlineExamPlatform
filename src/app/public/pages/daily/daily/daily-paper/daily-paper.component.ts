import { questions, Paper, section } from './../../../../../../modules/paper/paper'
import { Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subject, first, interval, takeUntil } from 'rxjs';
import * as ClassicEditor from 'src/app/shared/ckeditor';
import { ChangeEvent } from '@ckeditor/ckeditor5-angular/ckeditor.component';
import { DailyService } from 'src/app/service/daily/daily-service.service';
import { dailyModel } from 'src/modules/daily/daily';

@Component({
  selector: 'app-daily-paper',
  templateUrl: './daily-paper.component.html',
  styleUrls: ['./daily-paper.component.scss']
})

export class DailyPaperComponent implements OnInit {

  submitForm: FormGroup

  private notifier = new Subject<void>()

  @Output()
  selectedTrigger = new EventEmitter<{ data: answerModel[], index: number }>()

  @Input()
  dailyPaper?: dailyModel
  @Input()
  selectedOption?: answerModel[]
  @Input()
  model: editorModel[] = []

  constructor(private Activatedroute: ActivatedRoute, private dailyService: DailyService) {
    this.submitForm = new FormGroup({})
  }

  public Editor = ClassicEditor;


  ngOnInit(): void {
    this.submitForm = new FormGroup({
      'answer': new FormControl(""),
    })
  }

  onChange({ editor }: ChangeEvent, q: number) {
    if (this.selectedOption) {
      this.selectedOption[q].value = this.model[q].editorData
      this.selectedTrigger.emit({ data: this.selectedOption, index: q })
    } else if (this.dailyPaper) {
      this.selectedOption = new Array<answerModel>(this.dailyPaper.length)
      for (let i = 0; i < this.selectedOption.length; i++) {
        this.selectedOption[i] = { value: '', multValue: 0, mark: -1 }
      }
      this.selectedOption[q].value = this.model[q].editorData
      this.selectedTrigger.emit({ data: this.selectedOption, index: q })
    }
  }

  onReadyResult(editor: any) {
    if (editor.ui.view.editable.element.parentElement) {
      editor.ui.view.editable.element.parentElement.insertBefore(
        editor.ui.view.toolbar.element,
        editor.ui.view.editable.element
      );
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
    if (this.dailyPaper) {
      return this.dailyPaper.section
    }
    return []
  }

  currentIndex(n: number): number {
    let total = 0
    if (this.dailyPaper) {
      for (let i = 0; i < n; i++) {
        total += this.dailyPaper.n[i]
      }
    }
    return total
  }


  getQuestions(n: number): questions[] {
    if (this.dailyPaper) {
      let start = 0
      let end = this.dailyPaper.n[0]
      for (let i = 0; i < n; i++) {
        start += this.dailyPaper.n[i]
        end += this.dailyPaper.n[i + 1]
      }
      return this.dailyPaper.questions.slice(start, end)
    }
    return []
  }

  onChanged(q: number, i: number, type: number, event: any, mark: number, answer: string) {
    if (this.selectedOption == undefined && this.dailyPaper) {
      this.selectedOption = new Array<answerModel>(this.dailyPaper.length)
      for (let i = 0; i < this.selectedOption.length; i++) {
        this.selectedOption[i] = { value: '', multValue: 0, mark: -1 }
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

        if (this.selectedOption && answer == this.selectedOption[q].value) {
          this.selectedOption[q].mark = mark
        } else {
          if (this.selectedOption) {
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

        if (this.selectedOption && answer == this.selectedOption[q].value) {
          this.selectedOption[q].mark = mark
        } else {
          if (this.selectedOption) {
            this.selectedOption[q].mark = 0
          }
        }
        break;
    }
    if (this.selectedOption) this.selectedTrigger.emit({ data: this.selectedOption, index: q });
  }

  get mark(): number[] {
    if (!this.dailyPaper) {
      return [0]
    }
    let result: number[] = []
    if (this.selectedOption) {
      for (let i = 0; i < this.selectedOption.length; i++) {
        result.push(this.selectedOption[i].mark)
      }
    }

    return result
  }

  getAnswer(i: number): number {
    if (this.dailyPaper) {
      return this.convertN(this.dailyPaper.questions[i].answer)
    }
    return 0
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

export interface editorModel {
  editorData: string
}

