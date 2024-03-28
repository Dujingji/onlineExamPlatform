import { Component, ViewChild, OnInit, HostListener, OnDestroy } from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';
import { MatSidenav } from '@angular/material/sidenav';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Subject, delay, filter, first, interval, takeUntil, tap } from 'rxjs';
import { time } from 'src/modules/time';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from 'src/app/dialog/dialog/dialog.component';
import { SumbitDialogComponent } from 'src/app/dialog/dialog/sumbit-dialog/sumbit-dialog.component';
import { answerModel, editorModel } from '../../../exam-page/exam-paper/exam-paper.component';
import { ViewportScroller } from '@angular/common';
import { DailyService } from 'src/app/service/daily/daily-service.service';
import { dailyModel } from 'src/modules/daily/daily';
import { Location } from '@angular/common';

@UntilDestroy()
@Component({
  selector: 'app-daily-paper-nav',
  templateUrl: './daily-paper-nav.component.html',
  styleUrls: ['./daily-paper-nav.component.scss']
})


export class DailyPaperNavComponent implements OnInit, OnDestroy {
  @ViewChild('sidenav')
  sidenav!: MatSidenav;

  @ViewChild('sidenav1')
  sidenav1!: MatSidenav;

  public timeReminder?: number
  public timeP: time = { hour: 0, min: 0, sec: 0 }

  public dailyData?: dailyModel
  public selectedList?: answerModel[]
  public questionStautList : number[] =[]
  public model: editorModel[] = []

  public sumbitStauts: boolean = false

  private submited: boolean = false
  private reminder: number = 0
  private done: number = 0
  private qt: number = 0

  public today: boolean = false
  public year: number = 0
  public month: number = 0
  public day: number = 0
  private std_id?: string
  public major?: string

  private notifier = new Subject<void>()

  constructor(private observer: BreakpointObserver, private route: ActivatedRoute, private router: Router,
    private dailyService: DailyService, public dialog: MatDialog, private scroller: ViewportScroller, private location: Location) {
  }

  ngOnInit(): void {
    this.std_id = localStorage.getItem("information")!
    this.year = parseInt(this.route.snapshot.paramMap.get('year')!)
    this.day = parseInt(this.route.snapshot.paramMap.get('day')!)
    this.month = parseInt(this.route.snapshot.paramMap.get('month')!)
    this.major = this.route.snapshot.paramMap.get('major')!

    this.retrieveData(localStorage.getItem("information")!)

    this.dailyService.dailySubject.subscribe(req => {
      window.location.reload()
    })
  }

  ngOnDestroy() {
    if (this.selectedList && !this.submited) {
      this.SaveDailyPaper()
    }
    this.notifier.next()
    this.notifier.complete()
  }

  checkToday(year: number, month: number, day : number) {
    let today = new Date()
    if (year === today.getFullYear() && month === today.getMonth() + 1 && day === today.getDate()) {
      return true
    }
    else {
      return false
    }
  }

  retrieveData(std_id: string): void {
    if (this.std_id && this.major) {
      this.dailyService.getPaperEntry(this.std_id, this.year, this.month, this.day, this.major)
        .pipe(first())
        .subscribe(data => {
          this.dailyData = data.daily
          this.dailyData.questions.forEach(element => {
            if (element.type.includes('题目'))
              this.qt += 1
          })
          this.submited = data.daily.status === 2 ? true : false
          if (data.daily.answers !== undefined && data.daily.answers.length !== 0) {
            this.selectedList = data.daily.answers
          } else {
            this.selectedList = new Array<answerModel>(this.dailyData.questions.length)
            for (let i = 0; i < this.selectedList.length; i++) {
              this.selectedList[i] = { value: '', multValue: 0, mark: -1 }
            }
          }
          this.reminder = 0
          this.done = 0
          this.selectedList.forEach(element => {
            if (element.value.length === 0 && element.multValue === 0) {
              this.reminder += 1
            } else {
              this.done += 1
            }
          })
          this.reminder -= this.qt
          for(let i = 0; i < this.dailyData.length; i++){
            let temp : editorModel = {
              editorData: ''
            }
            this.model.push(temp)
          }
          if(this.dailyData.answers && this.dailyData.answers.length !== 0){
            for(let i = 0; i < this.selectedList.length;i ++){
              this.model[i].editorData = this.selectedList[i].value
            }
          }
        })
    }
  }

  get table(): number[] {
    if(this.selectedList){
      let length = this.selectedList.length
      if (this.dailyData) {
        for (let i = 0; i < length; i++) {
          if (this.selectedList[i].mark != -1 && this.selectedList[i].mark === 1) {
            this.questionStautList[i] = 3
          }
          else if (this.selectedList[i].mark == 0) {
            this.questionStautList[i] = 1
          }
          else {
            this.questionStautList[i] = 0
          }
        }
      }
      return this.questionStautList
    }
    return []
  }

  get rT() {
    return this.timeP
  }

  get _qt() {
    return this.qt
  }

  get userName() {
    return localStorage.getItem("username")
  }

  get d() {
    if (this.done) {
      return this.done
    } else {
      return 0
    }
  }

  get r() {
    if (this.reminder) {
      return this.reminder
    } else {
      return 0
    }
  }

  get onCal(): number {
    let total: number = 0
    if (this.dailyData && this.selectedList) {
      // for (let i = 0; i < this.paperData!.questions.length; i++) {
      //   if (this.selectedList[i].value == this.paperData.questions[i].answer) {
      //     total += this.paperData.questions![i].mark
      //   }
      // }
      for (let i = 0; i < this.selectedList.length; i++) {
        if (this.selectedList[i].mark == -1) {
          total += 0
        } else {
          total += Number(this.selectedList[i].mark)
        }
      }
      return total
    } else {
      return total
    }
  }


  correctIndex(i: number): number {
    let count = 0;
    if (this.dailyData) {
      this.dailyData.n.forEach((element, index) => {
        if (index < i) {
          count += element
        }
      })
    }
    return count
  }

  OnReceive(selectedOption: any) {
    this.selectedList = selectedOption.data
    let i = selectedOption.index
    let l = selectedOption.data.length
    if (this.selectedList) {
      if (selectedOption.index > -1) {
        let answer: answerModel = this.selectedList[i]

      }
      this.reminder = 0
      this.done = 0
      this.selectedList.forEach(element => {
        if (element.value.length === 0 && element.multValue === 0) {
          this.reminder += 1
        } else {
          this.done += 1
        }
      })
      this.reminder -= this.qt
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

  remake() {
    if (this.selectedList && this.major) {
      this.dailyService.submitDailyPaper(localStorage.getItem('information')!, this.year, this.month, this.day, this.major, 0, [])
        .pipe(first())
        .pipe(
          tap(() => {
            this.dailyService.dailySubject.next()
          })
        )
        .subscribe(data => {

        })
    }
  }

  submitDailyPaper() {
    if (this.selectedList && this.major) {
      this.dailyService.submitDailyPaper(localStorage.getItem('information')!, this.year, this.month, this.day, this.major, 2, this.selectedList)
        .pipe(first())
        .pipe(
          tap(() => {
            this.dailyService.dailySubject.next()
          })
        )
        .subscribe(data => {
          this.submited = data.status
        })
    }
  }

  SaveDailyPaper() {
    if (this.selectedList && this.major) {
      this.dailyService.submitDailyPaper(localStorage.getItem('information')!, this.year, this.month, this.day, this.major, 1, this.selectedList)
        .pipe(first())
        .subscribe(data => {

        })
    }
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

  goBack() {
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
