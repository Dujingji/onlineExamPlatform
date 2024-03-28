import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { questions, section } from 'src/modules/paper/paper';
import { ActivatedRoute } from '@angular/router';
import { Subject, first, interval, takeUntil } from 'rxjs';
import * as ClassicEditor from '../../../../../shared/ckeditor'
import { ExerciseService, exerciseAnswerModel } from 'src/app/service/exercise/exercise.service';
import { exericseDetailModel } from 'src/modules/exercise/exercise-detail';
import { editorModel } from '../../../exam-page/exam-paper/exam-paper.component';
import { FormControl, FormGroup } from '@angular/forms';
import { ChangeEvent } from '@ckeditor/ckeditor5-angular';
import { FeedbackDialogComponent } from 'src/app/dialog/dialog/feedback-dialog/feedback-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-exercise-content',
  templateUrl: './exercise-content.component.html',
  styleUrls: ['./exercise-content.component.scss']
})
export class ExerciseContentComponent implements OnInit {
  submitForm: FormGroup
  public exc_id?: string
  public exc_d_id?: string
  public selectedPaper = null;
  public exerciseData?: exericseDetailModel
  public selectedOption?: exerciseAnswerModel[]
  public question_i: number = 0
  public completed: number = 0

  private notifier = new Subject<void>()
  private loaded = false

  public Editor = ClassicEditor
  public model: editorModel[] = []

  @Output() selectedTrigger = new EventEmitter<{
    answer: exerciseAnswerModel[],
    index: number
    lastQuestion: number,
    compeletd: number,
    type: number
  }>()

  constructor(private Activatedroute: ActivatedRoute, private exerciseService: ExerciseService, private dialog: MatDialog) {
    this.submitForm = new FormGroup({})
  }

  ngOnInit(): void {
    this.submitForm = new FormGroup({
      'answer': new FormControl(""),
    })
    this.exc_id = this.Activatedroute.snapshot.paramMap.get('exc_id')!;
    this.exc_d_id = this.Activatedroute.snapshot.paramMap.get('exc_detail_id')!;
    this.retrieveData(this.exc_d_id)

    const time = interval(500).pipe(takeUntil(this.notifier)).subscribe(() => {
      if (this.exerciseData && this.exc_id && this.exc_d_id) {
        this.retrieveResult(localStorage.getItem('information')!, this.exc_id, this.exc_d_id)
        this.notifier.next()
        this.notifier.complete()
      }
    })
  }

  onChange({ editor }: ChangeEvent, q: number) {
    if (this.selectedOption) {
      this.selectedOption[q].value = this.model[q].editorData
      if (this.selectedOption[q].value.length === 0) {
        this.selectedOption[q].status = 0
        this.completed -= 1
      }
      else {
        if (this.selectedOption[q].status === 0) {
          this.completed += 1
        }
        this.selectedOption[q].status = 2
      }
      this.selectedTrigger.emit({
        answer: this.selectedOption, index: q, type: 1,
        lastQuestion: this.question_i, compeletd: this.completed
      })
    } else if (this.exerciseData) {
      this.selectedOption = new Array<exerciseAnswerModel>(this.exerciseData.length)
      for (let i = 0; i < this.selectedOption.length; i++) {
        this.selectedOption[i] = { value: '', multValue: 0, mark: -1, status: 0 }
      }
      this.selectedOption[q].value = this.model[q].editorData
      this.selectedOption[q].status = 2
      this.completed += 1
      this.selectedTrigger.emit({
        answer: this.selectedOption, index: q, type: 1,
        lastQuestion: this.question_i, compeletd: this.completed
      })
    }
  }

  changedStatus(q: number, type: number) {
    if (this.selectedOption && type == 0) {
      this.selectedOption[q].status = 4
    }
    else if (this.selectedOption && type == 1) {
      if (this.selectedOption[q].value.length === 0)
        this.selectedOption[q].status = 0
      else if (this.exerciseData && this.selectedOption[q].multValue !== 0 && this.selectedOption[q].value === this.exerciseData.questions[q].answer)
        this.selectedOption[q].status = 2
      else
        this.selectedOption[q].status = 1
    }

    if (this.selectedOption) {
      this.selectedTrigger.emit({
        answer: this.selectedOption, index: q, type: 1,
        lastQuestion: this.question_i, compeletd: this.completed
      })
    }
  }

  onChanged(q: number, i: number, type: number, event: any, mark: number, answer: string) {
    if (!this.selectedOption && this.exerciseData) {
      this.selectedOption = new Array<exerciseAnswerModel>(this.exerciseData.length)
      for (let i = 0; i < this.selectedOption.length; i++) {
        this.selectedOption[i] = { value: '', multValue: 0, mark: -1, status: 0 }
      }
    }
    switch (type) {
      case 0:
        if (this.selectedOption && this.selectedOption[q].value == this.convert(i)) {
          this.selectedOption[q].value = ""
          this.selectedOption[q].status = 0
          this.completed -= 1
        }
        else {
          if (this.selectedOption) {
            this.selectedOption[q].value = this.convert(i)
            if (this.selectedOption[q].status === 0)
              this.completed += 1
          }
        }

        if (this.selectedOption && answer == this.selectedOption[q].value) {
          this.selectedOption[q].mark = mark
          this.selectedOption[q].status = 2
        } else {
          if (this.selectedOption) {
            this.selectedOption[q].mark = 0
            if (this.selectedOption[q].value.length > 0)
              this.selectedOption[q].status = 1
          }
        }
        break;
      case 1:
        if (this.selectedOption) {
          this.selectedOption[q].value = event.target.value
          this.selectedOption[q].mark = mark
          this.selectedOption[q].status = 2
        }
        break;
      case 2:
        if (this.selectedOption && !this.calMultQ(i, this.selectedOption[q].multValue)) {
          this.selectedOption[q].multValue += Math.pow(10, i)
          this.selectedOption[q].value = this.convertMultQ(this.selectedOption[q].multValue)
          if (this.selectedOption[q].status === 0)
            this.completed += 1
        }
        else {
          if (this.selectedOption) {
            this.selectedOption[q].multValue -= Math.pow(10, i)
            if (this.selectedOption[q].multValue == 0) {
              this.selectedOption[q].value = ''
              this.selectedOption[q].status = 0
              this.completed -= 1
            } else {
              this.selectedOption[q].value = this.convertMultQ(this.selectedOption[q].multValue)
              if (this.selectedOption[q].status === 0)
                this.completed += 1
            }
          }
        }

        if (this.selectedOption && answer == this.selectedOption[q].value) {
          this.selectedOption[q].mark = mark
          this.selectedOption[q].status = 2
        } else {
          if (this.selectedOption) {
            this.selectedOption[q].mark = 0
            if (this.selectedOption[q].value.length > 0)
              this.selectedOption[q].status = 1
          }
        }
        break;
    }
    if (this.selectedOption) {
      this.selectedTrigger.emit({
        answer: this.selectedOption, index: q, type: 1,
        lastQuestion: this.question_i, compeletd: this.completed
      });
    }
  }

  get mark(): number[] {
    if (!this.exerciseData) {
      return [0]
    }
    let result: number[] = []
    if (this.selectedOption) {
      for (let i = 0; i < this.selectedOption.length; i++) {
        // if (this.selectedOption[i].value == this.paperData.questions[i].answer) {
        //   result.push(this.paperData.questions[i].mark)
        // } else {
        //   result.push(0)
        // }
        result.push(this.selectedOption[i].mark)
      }
      return result
    } else {
      return [0]
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
    if (this.exerciseData) {
      return this.exerciseData.section
    }
    return []
  }

  currentIndex(n: number): number {
    let total = 0
    if (this.exerciseData) {
      for (let i = 0; i < n; i++) {
        total += this.exerciseData.n[i]
      }
    }
    return total
  }

  openDialogButton(index: number) {
    let dialogRef = this.dialog.open(FeedbackDialogComponent, {
    })

    dialogRef.afterClosed().subscribe(result => {
      if (this.exc_id && this.exc_d_id && result)
        this.exerciseService.postFeedBack(this.exc_id, this.exc_d_id, index, localStorage.getItem('information')!, result)
          .subscribe(data => {
            if (data.status){
              alert("提交成功！")
            }else{
              alert("提交失败！")
            }
        })

      // 可以根据需要处理结果
    });
  }

  getQuestions(n: number): questions[] {
    if (this.exerciseData) {
      let start = 0
      let end = this.exerciseData.n[0]
      for (let i = 0; i < n; i++) {
        start += this.exerciseData.n[i]
        end += this.exerciseData.n[i + 1]
      }
      return this.exerciseData.questions.slice(start, end)
    }
    return []
  }

  retrieveResult(user: string, exc_id: string, exc_d_id: string) {
    this.exerciseService.getUserExerciseAnsewer(user, exc_id, exc_d_id).pipe(first())
      .subscribe((data) => {
        this.question_i = data.last_question
        this.completed = data.compeleted
        this.selectedOption = data.answer
        if (data.answer) {
          for (let i = 0; i < this.selectedOption.length; i++) {
            this.model[i].editorData = this.selectedOption[i].value
          }
        }
        this.selectedTrigger.emit({
          answer: this.selectedOption,
          lastQuestion: this.question_i,
          compeletd: this.completed,
          index: -1,
          type: 0
        })
        this.loaded = true
      })
  }

  retrieveData(exc_d_id: string) {
    this.exerciseService.getExercisePaperData(exc_d_id)
      .subscribe((data) => {
        this.exerciseData = data.exc_d_info
        for (let i = 0; i < this.exerciseData.length; i++) {
          let temp: editorModel = {
            editorData: ''
          }
          this.model.push(temp)
        }
      })
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
