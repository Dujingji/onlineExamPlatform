import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/service/auth/auth.service';
import { userInfo } from 'src/modules/user/user';
import { exam } from 'src/modules/exams/exam';
import { ExamPaperService } from 'src/app/service/exam/exam-paper.service';
import { Subscription, interval, first, take, Subject, takeUntil } from 'rxjs';
import { PublicService, menuModel } from 'src/app/service/public/public.service';

@Component({
  selector: 'app-show-exam-paper',
  templateUrl: './show-exam-paper.component.html',
  styleUrls: ['./show-exam-paper.component.scss']
})

export class ShowExamPaperComponent implements OnInit {

  public examInformation?: exam[]
  public userInfor?: userInfo
  public active?: boolean[]
  public reminder?: number[]
  private timeSpanList?: string[]
  private notifier = new Subject<void>()
  public endIs?: boolean[]

  examEntriesSub = new Subscription();


  constructor(private exampaperService: ExamPaperService, private publicService : PublicService) { }

  examStatus(paperId: string): boolean {
    let status = false
    if (this.userInfor) {
      let data = this.userInfor.exam_answer
      for (let i = 0; i < data.length; i++) {
        if (data[i].paperId === String(paperId)) {
          status = true
        }
      }
    }
    return status
  }


  ngOnInit(): void {
    this.retrieveUserinfo()
    this.retrieveExam()
  }

  get examInfo(): exam[] | undefined {
    return this.examInformation
  }

  get userInformation() {
    return localStorage.getItem("classroom")
  }

  examDate(date: Date) {
    return new Date(date).toLocaleString()
  }

  // convertDay(c : number){
  //     this.timeSpan = Math.floor(c / 1000 / 86400) + "天 "
  //     + Math.floor(c / 1000 % 86400 / 3600) + "时 "
  //     + Math.floor(c / 1000 % 86400 % 3600 / 60) + "分 "
  //     + Math.floor(c / 1000 % 86400 % 3600 % 60) + "秒"
  //     // return day + "天 " + hours + "时 " + min + "分 " + sec + "秒"
  // }

  onClock(index: number) {
    let notifier = new Subject<void>()
    const numbers = interval(1000);
    numbers.pipe(takeUntil(this.notifier)).subscribe(x => {
      if (this.active && this.reminder && this.examInformation) {
        let now = new Date()
        this.reminder[index] = Date.parse(new Date(this.examInformation[index].date).toLocaleString()) - Date.parse(now.toLocaleString())
        if (this.reminder[index] < 0 && this.active) {
          this.active[index] = true
        }
        if (Date.parse(this.examInformation[index].end.toLocaleString()) < Date.parse(now.toLocaleString()) && this.endIs) {
          this.endIs[index] = true
          notifier.next()
          notifier.complete()
        }
      }
    })
  }

  Timer() {
    if (this.examInformation && this.reminder === undefined) {
      this.reminder = Array<number>(this.examInformation.length).fill(0)
      for (let i = 0; i < this.examInformation.length; i++) {
        this.onClock(i)
      }
    }

  }

  getTimeSpan(i: number) {
    if (this.reminder) {
      let timeSpan = Math.floor(this.reminder[i] / 1000 / 86400) + "天 "
        + Math.floor(this.reminder[i] / 1000 % 86400 / 3600) + "时 "
        + Math.floor(this.reminder[i] / 1000 % 86400 % 3600 / 60) + "分 "
        + Math.floor(this.reminder[i] / 1000 % 86400 % 3600 % 60) + "秒"
      return timeSpan
    } else {
      return ''
    }
  }

  getButtonStatus(i: number): number {
    if (this.active !== undefined && this.endIs !== undefined && this.reminder !== undefined) {
      if (!this.active[i] && !this.endIs[i]) {
        return 0
      }
      else if (this.active[i] && !this.endIs[i]) {
        return 1
      }
      else if (this.endIs[i]) {
        return 2
      } else {
        return -1
      }
    }
    else {
      return -1
    }

  }

  retrieveExam(): void {
    let id = localStorage.getItem("information")
    if (id) {
      this.exampaperService.getExamEntries(id)
        .pipe(first())
        .subscribe((data) => {
          this.examInformation = data.exams;
          this.active = Array<boolean>(data.exams.length).fill(false)
          this.endIs = Array<boolean>(data.exams.length).fill(false)
          this.Timer()
        })
    }
  }

  retrieveUserinfo(): void {
    this.exampaperService.getUserInformation(localStorage.getItem("information")!)
      .subscribe((data) => {
        this.userInfor = data.userInfo
        localStorage.setItem('classroom', this.userInfor.classroom)
      })
  }

  ngOnDestroy() {
    this.notifier.next()
    this.notifier.complete()
  }
}


export interface reminderTimeModule {
  day: number;
  hours: number;
  min: number;
  sec: number;
}
