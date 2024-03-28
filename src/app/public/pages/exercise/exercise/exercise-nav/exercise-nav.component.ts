import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, HostListener, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSidenav } from '@angular/material/sidenav';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Subject, delay, filter, interval, takeUntil } from 'rxjs';
import { DialogComponent } from 'src/app/dialog/dialog/dialog.component';
import { SumbitDialogComponent } from 'src/app/dialog/dialog/sumbit-dialog/sumbit-dialog.component';
import { ExerciseService, exerciseAnswerModel } from 'src/app/service/exercise/exercise.service';
import { exerciseModel } from 'src/modules/exercise/exercise';
import { exericseDetailModel } from 'src/modules/exercise/exercise-detail';
import { Location } from '@angular/common';

@UntilDestroy()
@Component({
  selector: 'app-exercise-nav',
  templateUrl: './exercise-nav.component.html',
  styleUrls: ['./exercise-nav.component.scss']
})

export class ExerciseNavComponent implements OnInit, OnDestroy {

  @ViewChild('sidenav')
  sidenav!: MatSidenav;

  @ViewChild('sidenav1')
  sidenav1!: MatSidenav;

  private exc_id?: string
  private exc_detail_id?: string
  private exerciseInfo?: exerciseModel
  private exerciseData?: exericseDetailModel
  private questionStautList?: number[]
  public selectedList?: exerciseAnswerModel[]
  public completed: number = 0
  public question_i: number = 0
  public section_i: number = 0
  private question_now: number = 0

  private notifier = new Subject<void>()


  constructor(private observer: BreakpointObserver, private dialog: MatDialog, private route: ActivatedRoute,
    private router: Router, private exerciseService: ExerciseService, private location : Location) { }


  ngOnInit(): void {
    this.exc_id = this.route.snapshot.paramMap.get('exc_id')!;
    this.exc_detail_id = this.route.snapshot.paramMap.get('exc_detail_id')!;
    this.retrieveData(this.exc_id, this.exc_detail_id)
  }

  ngOnDestroy(): void {
    this.SumbitExecriseData()
  }

  retrieveData(exc_id: string, exc_detail_id: string) {
    this.exerciseService.getExerciseData(exc_id, exc_detail_id).subscribe(data => {
      this.exerciseInfo = data.exc_info
      this.exerciseData = data.exc_d_info
      this.section_i = this.exerciseInfo.model_Id.indexOf(data.exc_d_id)
    })
  }

  OnReceive(selectedOption: any) {
    this.selectedList = selectedOption.answer
    this.completed = selectedOption.compeletd
    if (this.selectedList) {
      if (selectedOption.type === 1) {
        this.question_now = selectedOption.index

        let i = selectedOption.index
        let l = selectedOption.answer.length
        let answer: exerciseAnswerModel = this.selectedList[i]
        if (this.exc_id && this.exc_detail_id) {
          this.exerciseService.autoSubmit(localStorage.getItem("information")!, this.exc_id, this.exc_detail_id, answer, l, i, this.completed)
        }
      } else {
        this.question_i = selectedOption.lastQuestion
        this.question_now = selectedOption.lastQuestion
        let length = this.selectedList.length
        this.questionStautList = new Array<number>(length).fill(0)
        const time = interval(750).pipe(takeUntil(this.notifier)).subscribe(() => {
          this.WaringChanged(this.question_i)
          this.notifier.next()
          this.notifier.complete()
        })

      }
    }
  }

  SumbitExecriseData() {
    if (this.selectedList) {
      if (this.exc_id && this.exc_detail_id) {
        this.exerciseService.submitData(localStorage.getItem("information")!, this.exc_id, this.exc_detail_id,
        this.selectedList, this.question_now, this.completed)
      }
    }
  }

  remark(){
    if(this.exc_detail_id && this.exc_id){
      this.exerciseService.remark(localStorage.getItem("information")!, this.exc_detail_id, this.exc_id)
      .subscribe(data =>{
        if(data.status){
          window.location.reload();
        }
      })
    }
  }

  get sectionLength() {
    if (this.exerciseInfo)
      return this.exerciseInfo.model_Id.length
    else
      return 0
  }

  get mark() {
    let total = 0
    if (this.selectedList) {
      this.selectedList.forEach(element => {
        if (element.mark !== -1) {
          total += element.mark
        }
      })
      return total
    } else {
      return total
    }
  }

  get totalMark() {
    let total = 0
    if (this.exerciseData) {
      this.exerciseData.questions.forEach(element => {
        if (!element.type.includes('题目') && (element.type == '单项选择题' || element.type == '多项选择题' || element.type == '判断题' || element.type == '完形填空' || element.type == '阅读理解')) {
          total += element.mark
        }
      })
      return total
    }
    else {
      return total
    }
  }

  Process() {
    if (this.selectedList) {
      return ((this.completed / this.selectedList.length) * 100).toFixed(2)
    } else {
      return 0
    }
  }

  get description() {
    if (this.exerciseInfo) {
      return this.exerciseInfo.description
    } else {
      return ''
    }
  }

  get detail_name() {
    if (this.exerciseData) {
      return this.exerciseData.description
    } else {
      return '加载中...'
    }
  }

  get detail_length() {
    if (this.exerciseData) {
      return this.exerciseData.length
    } else {
      return '加载中...'
    }
  }

  get section() {
    if (this.exerciseData) {
      return this.exerciseData.section
    }
    return []
  }

  get data() {
    if (this.exerciseData)
      return this.exerciseData
    else
      return undefined
  }

  get excTotalSection() {
    if (this.exerciseInfo) {
      return this.exerciseInfo.model_Id.length
    } else {
      return 0
    }
  }

  get table() {
    if (this.selectedList) {
      return this.selectedList
    }
    return undefined
  }

  correctIndex(i: number): number {
    let count = 0;
    if (this.exerciseData) {
      this.exerciseData.n.forEach((element, index) => {
        if (index < i) {
          count += element
        }
      })
    }
    return count
  }

  navToNewSection(index: number, type: number) {
    if (this.exc_id && this.exerciseInfo && type === 0) {
      let exc_d_id = this.exerciseInfo.model_Id[index]
      this.exerciseService.setLastSection(localStorage.getItem("information")!, this.exc_id, index)
      this.router.navigateByUrl('/public/exercise/' + this.exc_id + "/" + exc_d_id)
        .then(() => {
          window.location.reload();
        })
    }
    if (this.exc_id && this.exerciseInfo && type === 1) {
      let exc_d_id = this.exerciseInfo.model_Id[this.section_i + 1]
      this.exerciseService.setLastSection(localStorage.getItem("information")!, this.exc_id, this.section_i + 1)
      this.router.navigateByUrl('/public/exercise/' + this.exc_id + "/" + exc_d_id)
        .then(() => {
          window.location.reload();
        })
    }
    if (this.exc_id && this.exerciseInfo && type === 2) {
      this.exerciseService.setLastSection(localStorage.getItem("information")!, this.exc_id, this.section_i - 1)
      let exc_d_id = this.exerciseInfo.model_Id[this.section_i - 1]
      this.router.navigateByUrl('/public/exercise/' + this.exc_id + "/" + exc_d_id)
        .then(() => {
          window.location.reload();
        })
    }
  }

  WaringChanged(i: number) {
    // let path = "public/exam/" + id + '#' + i
    let el = document.getElementById(i.toString());
    if (el)
      el.scrollIntoView({
        block: 'start',
        behavior: 'smooth',
        inline: 'start'
      });
    // window.location.href = path
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

  goBack(){
    this.location.back();
  }

  ngAfterViewInit() {
    this.observer
      .observe(['(max-width: 800px)'])
      .pipe(delay(1), untilDestroyed(this))
      .subscribe((res) => {
        if (res.matches) {
          this.sidenav.mode = 'over';
          this.sidenav.close();
        } else {
          this.sidenav.mode = 'side';
          this.sidenav.open();
        }
      });

    this.observer
      .observe(['(max-width: 1200px)'])
      .pipe(delay(1), untilDestroyed(this))
      .subscribe((res) => {
        if (res.matches) {
          this.sidenav1.mode = 'over';
          this.sidenav1.close();
        } else {
          this.sidenav1.mode = 'side';
          this.sidenav1.open();
        }
      });

    this.router.events
      .pipe(
        untilDestroyed(this),
        filter((e) => e instanceof NavigationEnd)
      )
      .subscribe(() => {
        if (this.sidenav.mode === 'over') {
          this.sidenav.close();
        }

        if (this.sidenav1.mode === 'over') {
          this.sidenav1.close();
        }
      });
  }
}
