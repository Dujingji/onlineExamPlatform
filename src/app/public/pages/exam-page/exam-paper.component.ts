import { Component, ViewChild, OnInit, HostListener, OnDestroy } from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';
import { MatSidenav } from '@angular/material/sidenav';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Subject, delay, filter, first, interval, takeUntil } from 'rxjs';
import { ExamPaperService } from 'src/app/service/exam/exam-paper.service';
import { Paper } from 'src/modules/paper/paper';
import { time } from 'src/modules/time';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from 'src/app/dialog/dialog/dialog.component';
import { SumbitDialogComponent } from 'src/app/dialog/dialog/sumbit-dialog/sumbit-dialog.component';
import { answerModel } from './exam-paper/exam-paper.component';
import { ViewportScroller } from '@angular/common';
import { Location } from '@angular/common';

@UntilDestroy()
@Component({
  selector: 'app-exam-page',
  templateUrl: './exam-page.component.html',
  styleUrls: ['./exam-page.component.scss']
})


export class ExamPageComponent implements OnInit, OnDestroy {
  @ViewChild('sidenav')
  sidenav!: MatSidenav;

  @ViewChild('sidenav1')
  sidenav1!: MatSidenav;


  @HostListener('window:beforeunload')

  public timeReminder?: number
  public timeP: time = { hour: 0, min: 0, sec: 0 }

  public paperData?: Paper
  public selectedList?: answerModel[]
  public questionStautList?: boolean[]

  private exam_id?: string
  private paper_id?: string
  private isAuto: boolean = false
  private end_time?: Date
  private std_college?: string
  private std_major?: string
  public sumbitStauts: boolean = false

  private submited: boolean = false
  private reminder: number = 0
  private done: number = 0
  private total: number = 0
  private qt: number = 0
  private eid?: string

  private notifier = new Subject<void>()

  constructor(private observer: BreakpointObserver, private route: ActivatedRoute, private router: Router,
    private examPaperService: ExamPaperService, public dialog: MatDialog, private scroller: ViewportScroller, private location: Location) {
  }

  get rT() {
    return this.timeP
  }

  get ID() {
    return this.exam_id
  }

  get _qt() {
    return this.qt
  }

  get userName() {
    return localStorage.getItem("username")
  }

  get EID() {
    if (this.eid) {
      return this.eid
    } else {
      return '待定'
    }
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

  timer() {
    const timer = interval(1000)
    let current = 0
    timer.pipe(takeUntil(this.notifier)).subscribe(res => {
      current += 1
      if (this.timeReminder !== undefined && this.timeReminder > 0) {
        this.timeReminder = this.timeReminder - 1
        this.timeP.hour = Math.floor(this.timeReminder / 3600)
        this.timeP.min = Math.floor(this.timeReminder % 3600 / 60)
        this.timeP.sec = Math.floor(this.timeReminder % 60)
        if (current >= 120 && this.exam_id && this.paper_id && this.selectedList) {
          this.examPaperService.submitPaper(localStorage.getItem("information")!, this.exam_id, this.paper_id, this.selectedList, this.onCal, '', 1)
          current = 0
        }
      }
      else if (this.timeReminder !== undefined && this.timeReminder <= 0) {
        if (this.selectedList) {
          if (this.exam_id && this.paper_id) {
            let marker = ''
            let status = 1
            if (this.isAuto) {
              marker = 'Auto'
              status = 2
            }
            this.examPaperService.submitPaper(localStorage.getItem("information")!, this.exam_id, this.paper_id, this.selectedList, this.onCal, marker, status)
            let SumbitDialogRef = this.dialog.open(SumbitDialogComponent)
            SumbitDialogRef.afterClosed().subscribe(result => {
              this.submited = true
              this.router.navigate(['/public/homePage/exam'])
            })

          }
          this.notifier.next()
          this.notifier.complete()
        }
      }
    })
  }

  SumbitExamPaper(mark: number) {
    let dialogRef = this.dialog.open(DialogComponent)
    dialogRef.afterClosed().subscribe(result => {
      if (result && this.selectedList) {
        if (this.exam_id && this.paper_id) {
          let marker = ''
          let status = 1
          if (this.isAuto) {
            marker = 'Auto'
            status = 2
          }
          this.examPaperService.submitPaper(localStorage.getItem("information")!, this.exam_id, this.paper_id, this.selectedList, mark, marker, status)
          let SumbitDialogRef = this.dialog.open(SumbitDialogComponent)
          SumbitDialogRef.afterClosed().subscribe(result => {
            this.submited = true
            this.router.navigate(['/public/homePage/exam'])
          })
        }
      }
    })
  }

  SaveExamPaper(mark: number) {
    if (this.exam_id && this.paper_id && this.selectedList) {
      this.examPaperService.submitPaper(localStorage.getItem("information")!, this.exam_id, this.paper_id, this.selectedList, mark, '', 1)
    }
  }



  get paper() {
    if (this.paperData) {
      return this.paperData.paper
    }
    return ""
  }

  get section() {
    if (this.paperData) {
      return this.paperData.section
    }
    return []
  }

  get major() {
    return this.std_major
  }

  get college() {
    return this.std_college
  }

  get endTime() {
    if (this.end_time) {
      return new Date(this.end_time).toLocaleString()
    }
    else {
      return "加载中..."
    }
  }

  get totalMark() {
    return this.total
  }

  get onCal(): number {
    let total: number = 0
    if (this.paperData && this.selectedList) {
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

  ngOnInit(): void {
    this.exam_id = this.route.snapshot.paramMap.get('id')!
    this.retrieveData(this.exam_id, localStorage.getItem("information")!)
    this.retrieveUserData(localStorage.getItem("information")!)
    this.timer()
  }

  ngOnDestroy() {
    if (this.selectedList && !this.submited) {
      if (this.exam_id && this.paper_id) {
        this.examPaperService.submitPaper(localStorage.getItem("information")!, this.exam_id, this.paper_id, this.selectedList, this.onCal, '', 1)
      }
    }
    this.notifier.next()
    this.notifier.complete()
  }

  correctIndex(i: number): number {
    let count = 0;
    if (this.paperData) {
      this.paperData.n.forEach((element, index) => {
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
        if (this.exam_id && this.paper_id) {
          this.examPaperService.autoSubmit(localStorage.getItem("information")!, this.exam_id, this.paper_id, answer, l, i)
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
    }
  }

  retrieveData(id: string, std_id: string): void {
    this.examPaperService.getPaperEntry(id, std_id)
      .pipe(first())
      .subscribe((data) => {
        this.paperData = data.paper;
        this.paper_id = data.paper_id;
        this.isAuto = data.isAuto
        this.end_time = data.end
        let now = new Date();
        if (new Date(data.std_start).getTime() + (data.time * 1000) > new Date(data.end).getTime()) {
          this.timeReminder = (new Date(data.end).getTime() - now.getTime()) / 1000
        } else {
          this.timeReminder = (new Date(data.std_start).getTime() + (data.time * 1000) - now.getTime()) / 1000
        }
        this.paperData.questions.forEach(element => {
          if (!element.type.includes('题目'))
            this.total += element.mark
          else
            this.qt += 1
        })
      })
  }

  retrieveUserData(std_id: string) {
    this.examPaperService.getStudentInformation(std_id).subscribe(data => {
      this.eid = data.EID
      this.std_college = data.college
      this.std_major = data.major
    })
  }

  WaringChanged(i: number, id: string) {
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
