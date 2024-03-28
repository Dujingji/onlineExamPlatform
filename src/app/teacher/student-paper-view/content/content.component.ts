import { Component, EventEmitter, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { untilDestroyed } from '@ngneat/until-destroy';
import { Subject, first, interval, takeUntil } from 'rxjs';
import { answerModel } from 'src/app/public/pages/exam-page/exam-paper/exam-paper.component';
import { TeacherService } from 'src/app/service/teacher/teacher.service';
import { ClassicEditor } from 'src/app/shared/ckeditor';
import { Paper, questions, section } from 'src/modules/paper/paper';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss'],
})
export class ContentComponent {
  private exam_id?: string
  private std_id?: string
  private paper_id?: string
  public markBox: number[] = []
  public selectedPaper = null;
  public questionPerPage: number = 3;
  public selectPage = 1;
  public paperData?: Paper;
  public selectedOption: answerModel[] = []
  public exam_status: number = 1

  private notifier = new Subject<void>()
  private statusNotifier = new Subject<void>()

  public Editor = ClassicEditor

  @Output() eventTrigger = new EventEmitter<answerModel[]>()

  constructor(private Activatedroute: ActivatedRoute, private teacherService: TeacherService) { }

  onReady(editor: any) {
    if (editor.ui.view.editable.element.parentElement) {
      editor.ui.view.editable.element.parentElement.insertBefore(
        editor.ui.view.toolbar.element,
        editor.ui.view.editable.element
      );
    }
  }

  ngOnInit(): void {
    this.exam_id = this.Activatedroute.snapshot.paramMap.get('exam_id')!;
    this.std_id = this.Activatedroute.snapshot.paramMap.get('std_id')!;
    this.retrieveData(this.exam_id)

    const time = interval(500).pipe(takeUntil(this.notifier)).subscribe(() => {
      if (this.paper_id && this.std_id && this.exam_id) {
        this.retrieveResult(this.std_id, this.paper_id, this.exam_id)
        this.notifier.next()
        this.notifier.complete()
      }
    })

    this.teacherService.teacherSubject.pipe(takeUntil(this.statusNotifier)).subscribe(response => {
      if (this.exam_id && this.std_id && this.paper_id && this.exam_id) {
        this.retrieveData(this.exam_id)
        this.retrieveResult(this.std_id, this.paper_id, this.exam_id)
      }
    })
  }

  OnDestroy() {
    this.statusNotifier.next()
    this.statusNotifier.complete()
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
    // for (let i = 0; i < this.selectedOption.length; i++) {
    //   if (this.selectedOption[i].value == this.paperData.questions[i].answer) {
    //     result.push(this.paperData.questions[i].mark)
    //   } else {
    //     result.push(0)
    //   }
    // }
    for (let i = 0; i < this.selectedOption.length; i++) {
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

  vaildMark(data: any, index: number, max: number) {
    if (data.target.value > max) {
      this.markBox[index] = max
    }
    else if (data.target.value < 0) this.markBox[index] = 0
    else this.markBox[index] = data.target.value
  }

  calMultQ(i: number, a: number): boolean {
    if (Math.floor(a % Math.pow(10, i + 1) / Math.pow(10, i)) == 0) {
      return false
    }
    return true
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
    this.teacherService.getUserAnswer(user, paper_id, exam_id).pipe(first())
      .subscribe((data) => {
        this.selectedOption = data.answer.answer
        this.markBox = new Array<number>(this.selectedOption.length).fill(0)
        this.exam_status = data.exam_status
        this.eventTrigger.emit(this.selectedOption)
      })
  }

  retrieveData(id: string) {
    this.teacherService.getPaperEntry(id)
      .subscribe((data) => {
        this.paperData = data.paper;
        this.paper_id = data.paper_id;
      })
  }

  submitMark(index: number, type: number) {
    if (this.exam_id && this.std_id) {
      this.teacherService.postChangeMarkForStudent(this.std_id, this.exam_id, index, type == 0 ? this.markBox[index] : this.selectedOption[index].mark, type)
        .pipe(first())
        .subscribe(data => {
          if (data.status && type === 0) {
            console.log(index)
            let el = document.getElementById((index+1).toString() );
            if (el)
              el.scrollIntoView({
                block: 'start',
                behavior: 'smooth',
                inline: 'start'
              });
          }
        })
    }
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
